import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Overview from "../screens/trip-dashboard/Overview";
import Travel from "../screens/trip-dashboard/Travel";
import Concierge from "../screens/trip-dashboard/Concierge";
import Documents from "../screens/trip-dashboard/Documents";
import TripHeader from "../components/common/TripHeader";

const Tab = createBottomTabNavigator();

export default function TripTabs() {
  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Trip Header */}
      <TripHeader
        title="Smith–Patel Wedding"
        location="Lake Como, Italy"
        dates="June 12–18, 2026"
      />

      {/* Trip Tabs */}
      <Tab.Navigator>
        <Tab.Screen name="Overview" component={Overview} />
        <Tab.Screen name="Travel" component={Travel} />
        <Tab.Screen name="Concierge" component={Concierge} />
        <Tab.Screen name="Documents" component={Documents} />
      </Tab.Navigator>
    </View>
  );
}