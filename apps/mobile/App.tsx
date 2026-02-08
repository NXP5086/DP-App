import { useEffect } from "react";
import { View } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useAnonymousSession } from "./src/hooks/useAnonymousSession";
import { useSavedStore } from "./src/store/useSavedStore";
import { useAuthStore } from "./src/store/useAuthStore";

export default function App() {
  const { loading: anonLoading } = useAnonymousSession();
  const hydrateSaved = useSavedStore((s) => s.hydrate);

  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const authLoading = useAuthStore((s) => s.loading);

  useEffect(() => {
    hydrateSaved();
    hydrateAuth();
  }, []);

  // ⛔ Block rendering until BOTH are ready
  if (anonLoading || authLoading) {
    return <View />;
  }

  return <RootNavigator />;
}