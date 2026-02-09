import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExploreHome from "../screens/explore/ExploreHome";
import DestinationDetail from "../screens/explore/DestinationDetail";
import WeddingsHome from "../screens/weddings/WeddingsHome";
import WeddingDetail from "../screens/weddings/WeddingDetail";
import MyTripsHome from "../screens/trips/MyTripsHome";
import JoinTrip from "../screens/trips/JoinTrip";
import ProfileHome from "../screens/profile/ProfileHome";
import Saved from "../screens/profile/Saved";
import AccountInfo from "../screens/profile/AccountInfo";
import TravelPreferences from "../screens/profile/TravelPreferences";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* -------- Explore -------- */
function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreHome" component={ExploreHome} />
      <Stack.Screen name="DestinationDetail" component={DestinationDetail} />
    </Stack.Navigator>
  );
}

/* -------- Weddings -------- */
function WeddingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WeddingsHome" component={WeddingsHome} />
      <Stack.Screen name="WeddingDetail" component={WeddingDetail} />
    </Stack.Navigator>
  );
}

/* -------- Trips -------- */
function TripsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTripsHome" component={MyTripsHome} />
      <Stack.Screen name="JoinTrip" component={JoinTrip} />
    </Stack.Navigator>
  );
}

export default function LoggedInTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Weddings" component={WeddingsStack} />
      <Tab.Screen
        name="MyTrips"
        component={TripsStack}
        options={{ title: "My Trips" }}
      />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileHome} />
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="TravelPreferences" component={TravelPreferences} />
    </Stack.Navigator>
  );
}