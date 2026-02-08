import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../store/useAuthStore";

import LoggedInTabs from "./LoggedInTabs";
import LoggedOutTabs from "./LoggedOutTabs";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  // debug logging removed to avoid frequent console overhead

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* MAIN APP */}
        <Stack.Screen
          name="Main"
          component={isLoggedIn ? LoggedInTabs : LoggedOutTabs}
        />

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