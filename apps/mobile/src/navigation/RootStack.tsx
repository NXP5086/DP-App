import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../store/useAuthStore";
import { useTripStore } from "../store/useTripStore";
import PublicTabs from "./PublicTabs";
import TripTabs from "./TripTabs";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const activeTripId = useTripStore((s) => s.activeTripId);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Public app */}
      {!isLoggedIn && (
        <>
          <Stack.Screen name="Public" component={PublicTabs} />
          <Stack.Screen name="Auth" component={AuthStack} />
        </>
      )}

      {/* Logged in, no active trip */}
      {isLoggedIn && !activeTripId && (
        <Stack.Screen name="Public" component={PublicTabs} />
      )}

      {/* Inside a trip */}
      {isLoggedIn && activeTripId && (
        <Stack.Screen name="Trip" component={TripTabs} />
      )}
    </Stack.Navigator>
  );
}