import { create } from "zustand";
import { ConciergeMessage } from "@dp-app/types";
import {
  fetchConciergeMessages,
  sendConciergeMessage as apiSendMessage,
} from "../services/api";

interface ConciergeState {
  messages: ConciergeMessage[];
  loading: boolean;
  loadMessages: (tripId: string) => Promise<void>;
  sendMessage: (tripId: string, body: string) => Promise<void>;
}

export const useConciergeStore = create<ConciergeState>((set, get) => ({
  messages: [],
  loading: false,

  loadMessages: async (tripId: string) => {
    set({ loading: true });
    try {
      const data = await fetchConciergeMessages(tripId);
      set({ messages: data, loading: false });
    } catch (err) {
      console.error("[Concierge] Failed to load messages:", err);
      set({ loading: false });
    }
  },

  sendMessage: async (tripId: string, body: string) => {
    set({ loading: true });
    try {
      const newMessage = await apiSendMessage(tripId, body);
      set({
        messages: [...get().messages, newMessage],
        loading: false,
      });
    } catch (err) {
      console.error("[Concierge] Failed to send message:", err);
      set({ loading: false });
    }
  },
}));
