import { useAuthStore } from "../store/useAuthStore";

export function useRole() {
  const role = useAuthStore((s) => s.role);

  return {
    role,
    isGuest: role === "GUEST",
    isOrganizer: role === "ORGANIZER",
  };
}