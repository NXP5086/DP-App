import { View, Text, FlatList, Pressable } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/useAuthStore";
import { useTripStore } from "../../store/useTripStore";
import { useRole } from "../../hooks/useRole";

export default function MyTripsHome() {
  const navigation = useNavigation<any>();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const { isOrganizer } = useRole();
  const insets = useSafeAreaInsets();

  const { trips, loading, error, loadTrips } = useTripStore();

  /* -----------------------------
     LOAD TRIPS
  ------------------------------ */
  useEffect(() => {
    if (isLoggedIn) {
      loadTrips();
    }
  }, [isLoggedIn]);

  /* -----------------------------
     LOGGED OUT STATE
  ------------------------------ */
  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: insets.top + 24, justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
          Your trips live here
        </Text>

        <Text style={{ textAlign: "center", marginBottom: 24 }}>
          Log in or create an account to view and manage your trips once they’re
          planned with us.
        </Text>

        <PrimaryCTA
          label="Log In"
          onPress={() => navigation.navigate("Auth", { screen: "Login" })}
        />

        <Pressable
          onPress={() => navigation.navigate("Auth", { screen: "Signup" })}
          style={{ marginTop: 16 }}
        >
          <Text>Create an account</Text>
        </Pressable>
      </View>
    );
  }

  /* -----------------------------
     LOADING
  ------------------------------ */
  if (loading) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: insets.top + 24 }}>
        <Text>Loading your trips…</Text>
      </View>
    );
  }

  /* -----------------------------
     ERROR
  ------------------------------ */
  if (error) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: insets.top + 24 }}>
        <Text>{error}</Text>
      </View>
    );
  }

  /* -----------------------------
     EMPTY STATE
  ------------------------------ */
  if (trips.length === 0) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: insets.top + 24 }}>
        <Text style={{ marginBottom: 16 }}>
          {isOrganizer
            ? "Trips you’re organizing will appear here once they’re created."
            : "Trips you’ve been invited to or joined will appear here."}
        </Text>

        {!isOrganizer && (
          <PrimaryCTA
            label="Join a Trip"
            onPress={() => navigation.navigate("JoinTrip")}
          />
        )}
      </View>
    );
  }

  /* -----------------------------
     TRIP LIST
  ------------------------------ */
  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 24, paddingTop: insets.top + 24 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate("TripDashboard", { trip: item })
          }
          style={({ pressed }) => ({
            padding: 16,
            borderRadius: 12,
            backgroundColor: "#f5f5f5",
            marginBottom: 12,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {item.title}
          </Text>

          <Text style={{ color: "#555", marginTop: 4 }}>
            {item.location}
          </Text>

          <Text style={{ marginTop: 4, fontSize: 12 }}>
            {new Date(item.startDate).toDateString()} →{" "}
            {new Date(item.endDate).toDateString()}
          </Text>
        </Pressable>
      )}
    />
  );
}

/* -----------------------------
   UI COMPONENTS
------------------------------ */

function PrimaryCTA({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#000",
        alignItems: "center",
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text style={{ color: "#fff", fontWeight: "600" }}>{label}</Text>
    </Pressable>
  );
}