import RootNavigator from "./src/navigation/RootNavigator";
import { useAnonymousSession } from "./src/hooks/useAnonymousSession";
import { useSavedStore } from "./src/store/useSavedStore";
import { useEffect } from "react";
import { View } from "react-native";

export default function App() {
  const { loading } = useAnonymousSession();
  const hydrateSaved = useSavedStore((s) => s.hydrate);

  useEffect(() => {
    hydrateSaved();
  }, []);

  if (loading) {
    return <View />;
  }

  return <RootNavigator />;
}