import { getAnonymousSessionId, setAnonymousSessionId } from "./storage";
import { randomUUID } from "expo-crypto";

export async function ensureAnonymousSession(): Promise<string> {
  const existing = await getAnonymousSessionId();

  if (existing) {
    return existing;
  }

  const newSessionId = randomUUID();
  await setAnonymousSessionId(newSessionId);
  return newSessionId;
}