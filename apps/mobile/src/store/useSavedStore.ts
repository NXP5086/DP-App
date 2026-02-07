import { create } from "zustand";
import { SavedItem } from "@dp-app/types";
import * as SecureStore from "expo-secure-store";

const STORAGE_KEY = "saved_items";

type LocalSavedItem = SavedItem & {
  userId?: string;
};

interface SavedState {
  items: LocalSavedItem[];
  hydrate: () => Promise<void>;
  saveItem: (item: SavedItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  isSaved: (id: string) => boolean;
  mergeToUser: (userId: string) => Promise<void>;
}

export const useSavedStore = create<SavedState>((set, get) => ({
  items: [],

  hydrate: async () => {
    const raw = await SecureStore.getItemAsync(STORAGE_KEY);
    if (raw) {
      set({ items: JSON.parse(raw) });
    }
  },

  saveItem: async (item) => {
    const updated = [...get().items, item];
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated });
  },

  removeItem: async (id) => {
    const updated = get().items.filter((i) => i.id !== id);
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated });
  },

  isSaved: (id) => {
    return get().items.some((i) => i.id === id);
  },

  mergeToUser: async (userId) => {
  const updated = get().items.map((item) => ({
    ...item,
    userId,
  }));

  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
  set({ items: updated });
  },

}));