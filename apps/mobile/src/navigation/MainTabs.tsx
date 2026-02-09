import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyTripsHome from "../screens/trips/MyTripsHome";
import JoinTrip from "../screens/trips/JoinTrip";
import ProfileHome from "../screens/profile/ProfileHome";

const Tab = createBottomTabNavigator();
const TripsStack = createNativeStackNavigator();

/* -----------------------------
   TRIPS STACK
------------------------------ */
function TripsNavigator() {
  return (
    <TripsStack.Navigator screenOptions={{ headerShown: false }}>
      <TripsStack.Screen name="MyTripsHome" component={MyTripsHome} />
      <TripsStack.Screen name="JoinTrip" component={JoinTrip} />
    </TripsStack.Navigator>
  );
}

/* -----------------------------
   MAIN TABS (LOGGED IN)
------------------------------ */
export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="MyTrips"
        component={TripsNavigator}
        options={{ title: "Trips" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileHome}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}