import { create } from "zustand";
import { useSavedStore } from "./useSavedStore";

interface AuthState {
  userId: string | null;
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isLoggedIn: false,

  login: (userId) => {
  const merge = useSavedStore.getState().mergeToUser;
  merge(userId);

  set({
    userId,
    isLoggedIn: true,
  });
    },

  logout: () =>
    set({
      userId: null,
      isLoggedIn: false,
    }),
}));