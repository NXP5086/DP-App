import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import {
  loginUser,
  signupUser,
  TOKEN_STORAGE_KEY,
  fetchCurrentUser,
} from "../services/api";
import { useSavedStore } from "./useSavedStore";

const AUTH_STORAGE_KEY = "auth_session";

export type UserRole = "GUEST" | "ORGANIZER";

interface AuthState {
  userId: string | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  loading: boolean;

  hydrate: () => Promise<void>;
  login: (email: string) => Promise<void>;
  signup: (email: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  role: null,
  isLoggedIn: false,
  loading: true,

  /* ============================
     HYDRATE SESSION ON APP LOAD
  ============================ */
  hydrate: async () => {
    try {
      const sessionRaw = await SecureStore.getItemAsync(AUTH_STORAGE_KEY);
      const token = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);

      // debug logs removed to reduce startup overhead

      if (sessionRaw && token) {
        const session = JSON.parse(sessionRaw);

        set({
          userId: session.userId,
          role: session.role,
          isLoggedIn: true,
          loading: false,
        });
        return;
      }

      // If we have a token but no local session, try to recover session from API
      if (token && !sessionRaw) {
        try {
          const user = await fetchCurrentUser();
          if (user && user.id) {
            await SecureStore.setItemAsync(
              AUTH_STORAGE_KEY,
              JSON.stringify({ userId: user.id, role: user.role })
            );

            set({
              userId: user.id,
              role: user.role,
              isLoggedIn: true,
              loading: false,
            });
            return;
          }
        } catch (err) {
          console.warn("Auth hydrate -> failed to recover session from token", err);
        }
      }
    } catch (err) {
      console.error("Auth hydrate failed", err);
    }

    set({
      userId: null,
      role: null,
      isLoggedIn: false,
      loading: false,
    });
  },

  /* ============================
     LOGIN
  ============================ */
  login: async (email: string) => {
    set({ loading: true });

    const res = await loginUser(email);

    await SecureStore.setItemAsync(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        userId: res.user.id,
        role: res.user.role,
      })
    );

    await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, res.token);

    // Merge anonymous saved items → user
    const mergeSaved = useSavedStore.getState().mergeToUser;
    await mergeSaved(res.user.id);

    set({
      userId: res.user.id,
      role: res.user.role,
      isLoggedIn: true,
      loading: false,
    });
    // AUTH STORE → isLoggedIn set to true
  },

  /* ============================
     SIGNUP
  ============================ */
  signup: async (email: string, name: string) => {
    set({ loading: true });

    const res = await signupUser({ email, name });

    await SecureStore.setItemAsync(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        userId: res.user.id,
        role: res.user.role,
      })
    );

    await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, res.token);

    const mergeSaved = useSavedStore.getState().mergeToUser;
    await mergeSaved(res.user.id);

    set({
      userId: res.user.id,
      role: res.user.role,
      isLoggedIn: true,
      loading: false,
    });
  },

  /* ============================
     LOGOUT
  ============================ */
  logout: async () => {
    await SecureStore.deleteItemAsync(AUTH_STORAGE_KEY);
    await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);

    set({
      userId: null,
      role: null,
      isLoggedIn: false,
      loading: false,
    });
  },
}));