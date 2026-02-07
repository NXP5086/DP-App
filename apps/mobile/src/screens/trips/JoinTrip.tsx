import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { useTripStore } from "../../store/useTripStore";

export default function JoinTrip() {
  const [code, setCode] = useState("");
  const joinTrip = useTripStore((s) => s.joinTrip);

  const handleJoin = () => {
    if (!code) return;

    // TEMP: backend validation later
    joinTrip(code.toLowerCase());
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

      <View
        onTouchEnd={handleJoin}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#000",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Join Trip
        </Text>
      </View>
    </View>
  );
}