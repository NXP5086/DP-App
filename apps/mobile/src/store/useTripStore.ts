import { create } from "zustand";

interface TripState {
  activeTripId: string | null;
  joinTrip: (tripId: string) => void;
  leaveTrip: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  activeTripId: null,

  joinTrip: (tripId) =>
    set({
      activeTripId: tripId,
    }),

  leaveTrip: () =>
    set({
      activeTripId: null,
    }),
}));