import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreHome from "../screens/explore/ExploreHome";
import DestinationDetail from "../screens/explore/DestinationDetail";
import WeddingsHome from "../screens/weddings/WeddingsHome";
import WeddingDetail from "../screens/weddings/WeddingDetail";
import MyTripsHome from "../screens/trips/MyTripsHome";
import ProfileHome from "../screens/profile/ProfileHome";
import JoinTrip from "../screens/trips/JoinTrip";

const Tab = createBottomTabNavigator();
const ExploreStack = createNativeStackNavigator();
const WeddingsStack = createNativeStackNavigator();
const TripsStack = createNativeStackNavigator();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="ExploreHome"
        component={ExploreHome}
        options={{ title: "Explore" }}
      />
      <ExploreStack.Screen
        name="DestinationDetail"
        component={DestinationDetail}
        options={{ title: "" }}
      />
    </ExploreStack.Navigator>
  );
}

function WeddingsNavigator() {
  return (
    <WeddingsStack.Navigator>
      <WeddingsStack.Screen
        name="WeddingsHome"
        component={WeddingsHome}
        options={{ title: "Weddings" }}
      />
      <WeddingsStack.Screen
        name="WeddingDetail"
        component={WeddingDetail}
        options={{ title: "" }}
      />
    </WeddingsStack.Navigator>
  );
}

function TripsNavigator() {
  return (
    <TripsStack.Navigator>
      <TripsStack.Screen
        name="MyTripsHome"
        component={MyTripsHome}
        options={{ title: "My Trips" }}
      />
      <TripsStack.Screen
        name="JoinTrip"
        component={JoinTrip}
        options={{ title: "Join Trip" }}
      />
    </TripsStack.Navigator>
  );
}


export default function PublicTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Weddings" component={WeddingsNavigator} />
      <Tab.Screen name="MyTrips" component={TripsNavigator} />
      <Tab.Screen name="Profile" component={ProfileHome} />
    </Tab.Navigator>
  );
}