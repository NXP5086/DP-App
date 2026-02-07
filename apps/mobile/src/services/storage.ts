import * as SecureStore from "expo-secure-store";

const ANON_SESSION_KEY = "anonymous_session_id";

export async function getAnonymousSessionId(): Promise<string | null> {
  return SecureStore.getItemAsync(ANON_SESSION_KEY);
}

export async function setAnonymousSessionId(id: string): Promise<void> {
  await SecureStore.setItemAsync(ANON_SESSION_KEY, id);
}

export async function clearAnonymousSessionId(): Promise<void> {
  await SecureStore.deleteItemAsync(ANON_SESSION_KEY);
}