import { View, Text, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TripOverview from "./TripOverview";
import TripDocuments from "./TripDocuments";
import TripTravel from "./TripTravel";
import TripConcierge from "./TripConcierge";

const Tab = createBottomTabNavigator();

export default function TripDashboard({ route }: any) {
  const { trip } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      {/* Shared Header */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 16,
          paddingBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            width: 44,
            height: 44,
            justifyContent: "center",
            marginLeft: -8,
          }}
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </Pressable>

        <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 4 }}>
          {trip.title}
        </Text>
      </View>

      {/* Tabs */}
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            if (route.name === "Overview") {
              iconName = focused ? "compass" : "compass-outline";
            } else if (route.name === "Travel") {
              iconName = focused ? "airplane" : "airplane-outline";
            } else if (route.name === "Concierge") {
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
            } else if (route.name === "Documents") {
              iconName = focused ? "folder" : "folder-outline";
            }
            return <Ionicons name={iconName} size={22} color={color} />;
          },
          tabBarActiveTintColor: "#3B82F6",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarLabelStyle: { fontSize: 11, fontWeight: "500" },
          tabBarStyle: { 
            paddingTop: 8,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            height: 60 + (insets.bottom > 0 ? insets.bottom : 8),
          },
        })}
      >
      <Tab.Screen
        name="Overview"
        children={() => <TripOverview trip={trip} />}
        />
      <Tab.Screen
        name="Travel"
        children={() => <TripTravel trip={trip} />}
        />
      <Tab.Screen
        name="Concierge"
        children={() => <TripConcierge trip={trip} />}
        />
      <Tab.Screen
        name="Documents"
        children={() => <TripDocuments trip={trip} />}
        />
      </Tab.Navigator>
    </View>
  );
}