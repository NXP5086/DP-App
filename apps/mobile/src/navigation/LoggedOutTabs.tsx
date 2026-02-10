import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import ExploreHome from "../screens/explore/ExploreHome";
import DestinationDetail from "../screens/explore/DestinationDetail";
import AllDestinations from "../screens/explore/AllDestinations";
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

function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreHome" component={ExploreHome} />
      <Stack.Screen name="DestinationDetail" component={DestinationDetail} />
      <Stack.Screen name="AllDestinations" component={AllDestinations} />
    </Stack.Navigator>
  );
}

function WeddingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WeddingsHome" component={WeddingsHome} />
      <Stack.Screen name="WeddingDetail" component={WeddingDetail} />
    </Stack.Navigator>
  );
}

function TripsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTripsHome" component={MyTripsHome} />
      <Stack.Screen name="JoinTrip" component={JoinTrip} />
    </Stack.Navigator>
  );
}

export default function LoggedOutTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F5721A",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Weddings"
        component={WeddingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="diamond-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTrips"
        component={TripsStack}
        options={{
          title: "My bookings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
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