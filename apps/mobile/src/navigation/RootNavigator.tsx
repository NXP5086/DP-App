import { NavigationContainer } from "@react-navigation/native";
import PublicTabs from "./PublicTabs";
import AuthStack from "./AuthStack";
import TripTabs from "./TripTabs";

export default function RootNavigator() {
  const hasActiveTrip = useTripStore((s) => !!s.activeTripId);
  
  import { useTripStore } from "../store/useTripStore";
  return (
    <NavigationContainer>
      {hasActiveTrip ? <TripTabs /> : <PublicTabs />}
      <AuthStack />
    </NavigationContainer>
  );
}