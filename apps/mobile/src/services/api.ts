import * as SecureStore from "expo-secure-store";

/**
 * 🔧 CONFIG
 * Use your machine LAN IP for iOS Simulator / physical device.
 * Must include protocol.
 */
const API_BASE_URL = "http://192.168.1.13:3000";
export const TOKEN_STORAGE_KEY = "auth_token";

/**
 * Core request helper
 * - Automatically attaches JWT if present
 * - Centralized error handling
 * - Hardened against payload corruption
 */
async function request(
  path: string,
  options: RequestInit = {}
) {
  const token = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);

  const isAuthRoute =
    path === "/auth/login" ||
    path === "/auth/signup";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (!isAuthRoute && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  /**
   * 🔒 HARD GUARD
   * Prevent corrupted auth state from being sent as login payload
   */
  if (isAuthRoute && options.body) {
    try {
      const parsed = JSON.parse(options.body as string);

      if (
        path === "/auth/login" &&
        typeof parsed?.email !== "string"
      ) {
        throw new Error(
          "Client bug: invalid login payload (email must be string)"
        );
      }

      if (
        path === "/auth/signup" &&
        (typeof parsed?.email !== "string" ||
          typeof parsed?.name !== "string")
      ) {
        throw new Error(
          "Client bug: invalid signup payload"
        );
      }
    } catch (err) {
      throw err;
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = "API request failed";
    try {
      const json = await res.json();
      message = json.message || message;
    } catch {
      // ignore non-JSON errors
    }
    throw new Error(message);
  }

  return res.json();
}

/* ============================
   CONTACT (MODE 1)
============================ */

export async function sendContactRequest(payload: {
  name: string;
  contactMethod: string;
  note?: string;
  interestType: string;
  interestTitle: string;
  anonymousSession: string;
}) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ============================
   AUTH
============================ */

export async function loginUser(email: string): Promise<{
  user: {
    id: string;
    role: "GUEST" | "ORGANIZER";
  };
  token: string;
}> {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function signupUser(payload: {
  email: string;
  name: string;
}): Promise<{
  user: {
    id: string;
    role: "GUEST" | "ORGANIZER";
  };
  token: string;
}> {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchCurrentUser() {
  return request("/auth/me");
}

export async function joinTripByCode(code: string) {
  return request("/trips/join", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

/* ============================
   TRIPS (MODE 2)
============================ */

export async function fetchMyTrips(): Promise<
  {
    id: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    role: "GUEST" | "ORGANIZER";
  }[]
> {
  return request("/trips/my");
}

/* ============================
   TIMELINE (FUTURE)
============================ */

export async function fetchTimeline(tripId: string) {
  return request(`/trips/${tripId}/timeline`);
}