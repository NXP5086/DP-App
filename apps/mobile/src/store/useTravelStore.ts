import { create } from "zustand";
import { Flight, Transfer } from "@dp-app/types";

interface TravelState {
  flights: Flight[];
  transfer: Transfer | null;

  addFlight: (flight: Flight) => void;
  removeFlight: (id: string) => void;

  setTransfer: (transfer: Transfer) => void;
}

export const useTravelStore = create<TravelState>((set, get) => ({
  flights: [],
  transfer: null,

  addFlight: (flight) => {
    const existing = get().flights.filter(
      (f) => f.type === flight.type
    );

    // Enforce max 1 arrival + 1 departure
    if (existing.length >= 1) return;

    set({ flights: [...get().flights, flight] });
  },

  removeFlight: (id) =>
    set({
      flights: get().flights.filter((f) => f.id !== id),
    }),

  setTransfer: (transfer) =>
    set({
      transfer,
    }),
}));