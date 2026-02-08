import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExploreHome from "../screens/explore/ExploreHome";
import DestinationDetail from "../screens/explore/DestinationDetail";
import WeddingsHome from "../screens/weddings/WeddingsHome";
import WeddingDetail from "../screens/weddings/WeddingDetail";

const Tab = createBottomTabNavigator();
const ExploreStack = createNativeStackNavigator();
const WeddingsStack = createNativeStackNavigator();

/* -----------------------------
   EXPLORE STACK
------------------------------ */
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

/* -----------------------------
   WEDDINGS STACK
------------------------------ */
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

/* -----------------------------
   PUBLIC TABS (LOGGED OUT)
------------------------------ */
export default function PublicTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Weddings" component={WeddingsNavigator} />
    </Tab.Navigator>
  );
}