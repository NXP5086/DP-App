import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTripStore } from "../../store/useTripStore";

export default function JoinTrip() {
  const [code, setCode] = useState("");
  const joinTrip = useTripStore((s) => s.joinTrip);
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!code || loading) return;

    setLoading(true);
    try {
      await joinTrip(code.toLowerCase());
      // Navigate to trips list after successful join
      navigation.navigate("MyTripsHome");
    } catch (err: any) {
      console.error("Join trip failed", err);
      Alert.alert("Could not join trip", err?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 12 }}>
        Join a Trip
      </Text>

      <Text style={{ marginBottom: 24 }}>
        Enter the trip code you received from us.
      </Text>

      <TextInput
        placeholder="Trip Code"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
        style={{
          height: 44,
          backgroundColor: "#f2f2f2",
          borderRadius: 8,
          paddingHorizontal: 12,
          marginBottom: 16,
        }}
      />

      <Pressable
        onPress={handleJoin}
        disabled={loading}
        style={({ pressed }) => ({
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#000",
          alignItems: "center",
          opacity: loading || pressed ? 0.6 : 1,
        })}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          {loading ? "Joining…" : "Join Trip"}
        </Text>
      </Pressable>
    </View>
  );
}