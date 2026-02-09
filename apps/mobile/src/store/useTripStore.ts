import { create } from "zustand";
import { fetchMyTrips, joinTripByCode } from "../services/api";

export interface TripSummary {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  role: "GUEST" | "ORGANIZER";
}

interface TripState {
  trips: TripSummary[];
  loading: boolean;
  error: string | null;

  loadTrips: () => Promise<void>;
  clearTrips: () => void;
  clearError: () => void;
  joinTrip: (code: string) => Promise<void>;
}

export const useTripStore = create<TripState>((set) => ({
  trips: [],
  loading: false,
  error: null,

  loadTrips: async () => {
    set({ loading: true, error: null });

    try {
      const trips = await fetchMyTrips();
      set({ trips, loading: false });
    } catch (err) {
      console.error("Failed to load trips", err);
      set({
        loading: false,
        error: "Could not load trips",
      });
    }
  },

  clearTrips: () => {
    set({ trips: [], loading: false, error: null });
  },

  clearError: () => {
    set({ error: null });
  },

  joinTrip: async (code: string) => {
    set({ loading: true, error: null });

    try {
      await joinTripByCode(code);
      // Refresh trips after joining
      const trips = await fetchMyTrips();
      set({ trips, loading: false });
    } catch (err: any) {
      console.error("Failed to join trip", err);
      set({ loading: false, error: err?.message || "Could not join trip" });
      throw err;
    }
  },
}));