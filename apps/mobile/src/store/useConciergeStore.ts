import { create } from "zustand";
import { ConciergeMessage } from "@dp-app/types";

interface ConciergeState {
  messages: ConciergeMessage[];
  sendMessage: (body: string) => void;
  receiveMessage: (body: string) => void;
}

export const useConciergeStore = create<ConciergeState>((set, get) => ({
  messages: [
    {
      id: "welcome",
      sender: "concierge",
      body:
        "Hi! We’re here to help with anything you need during the trip. Feel free to message us anytime.",
      createdAt: new Date().toISOString(),
    },
  ],

  sendMessage: (body) =>
    set({
      messages: [
        ...get().messages,
        {
          id: Date.now().toString(),
          sender: "guest",
          body,
          createdAt: new Date().toISOString(),
        },
      ],
    }),

  receiveMessage: (body) =>
    set({
      messages: [
        ...get().messages,
        {
          id: Date.now().toString(),
          sender: "concierge",
          body,
          createdAt: new Date().toISOString(),
        },
      ],
    }),
}));