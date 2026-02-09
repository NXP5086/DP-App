import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../store/useAuthStore";

import LoggedInTabs from "./LoggedInTabs";
import LoggedOutTabs from "./LoggedOutTabs";
import AuthStack from "./AuthStack";
import TripDashboard from "../screens/trips/TripDashboard";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* MAIN APP */}
        <Stack.Screen
          name="Main"
          component={isLoggedIn ? LoggedInTabs : LoggedOutTabs}
        />

        {/* TRIP DASHBOARD (full screen, no tabs) */}
        <Stack.Screen name="TripDashboard" component={TripDashboard} />

        {/* AUTH MODAL */}
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}