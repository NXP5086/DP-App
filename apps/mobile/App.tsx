import RootNavigator from "./src/navigation/RootNavigator";
import { useAnonymousSession } from "./src/hooks/useAnonymousSession";
import { View } from "react-native";

export default function App() {
  const { loading } = useAnonymousSession();

  if (loading) {
    return <View />; // splash later
  }

  return <RootNavigator />;
}