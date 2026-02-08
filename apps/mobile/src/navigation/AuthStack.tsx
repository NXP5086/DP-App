import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Log In" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Create Account" }}
      />
    </Stack.Navigator>
  );
}