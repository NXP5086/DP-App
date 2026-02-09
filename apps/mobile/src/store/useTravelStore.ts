import { create } from "zustand";
import { fetchTravel } from "../services/api";

interface TravelState {
  items: any[];
  loading: boolean;
  load: (tripId: string) => Promise<void>;
}

export const useTravelStore = create<TravelState>((set) => ({
  items: [],
  loading: false,

  load: async (tripId) => {
    set({ loading: true });
    const items = await fetchTravel(tripId);
    set({ items, loading: false });
  },
}));