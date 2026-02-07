import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreHome from "../screens/explore/ExploreHome";
import WeddingsHome from "../screens/weddings/WeddingsHome";
import MyTripsHome from "../screens/trips/MyTripsHome";
import ProfileHome from "../screens/profile/ProfileHome";

const Tab = createBottomTabNavigator();

export default function PublicTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreHome} />
      <Tab.Screen name="Weddings" component={WeddingsHome} />
      <Tab.Screen name="MyTrips" component={MyTripsHome} />
      <Tab.Screen name="Profile" component={ProfileHome} />
    </Tab.Navigator>
  );
}