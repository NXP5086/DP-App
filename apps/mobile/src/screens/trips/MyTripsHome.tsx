import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";

export default function MyTripsHome() {
  const navigation = useNavigation<any>();

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <View
        style={{
          flex: 1,
          padding: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
          Your trips live here
        </Text>

        <Text style={{ textAlign: "center", marginBottom: 24 }}>
          Log in or create an account to view and manage your trips once they’re
          planned with us.
        </Text>

        <PrimaryCTA
          label="Log In"
          onPress={() => navigation.navigate("Login")}
        />

        <Text
          onPress={() => navigation.navigate("Signup")}
          style={{ marginTop: 16 }}
        >
          Create an account
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ marginBottom: 24 }}>
        You’ll see your trips here once you’ve joined.
      </Text>

      <View
        onTouchEnd={() => navigation.navigate("JoinTrip")}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#000",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Join a Trip
        </Text>
      </View>
    </View>
  );
}

function PrimaryCTA({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <View
      onTouchEnd={onPress}
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#000",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "600" }}>{label}</Text>
    </View>
  );
}