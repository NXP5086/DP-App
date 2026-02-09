import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTripStore } from "../../store/useTripStore";

export default function JoinTrip() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const joinTrip = useTripStore((s) => s.joinTrip);
  const clearError = useTripStore((s) => s.clearError);
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handleJoin = async () => {
    const trimmed = code.trim();

    if (!trimmed || loading) return;

    setLoading(true);

    try {
      await joinTrip(trimmed.toLowerCase());

      // ✅ Success → return to My Trips root
      navigation.goBack();
    } catch (err: any) {
      Alert.alert(
        "Could not join trip",
        err?.message ||
          "Please check the code and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        paddingTop: insets.top + 24,
        justifyContent: "flex-start",
      }}
    >
      <Pressable
        onPress={() => {
          clearError();
          navigation.goBack();
        }}
        style={{
          marginBottom: 12,
          width: 44,
          height: 44,
          justifyContent: "center",
          alignSelf: "flex-start",
          marginLeft: -8,
        }}
        accessibilityLabel="Go back"
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </Pressable>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        Join a Trip
      </Text>

      <Text
        style={{
          marginBottom: 24,
          color: "#555",
        }}
      >
        Enter the trip code you received from us.
      </Text>

      <TextInput
        placeholder="Trip code"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
        autoCorrect={false}
        editable={!loading}
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
        disabled={loading || !code.trim()}
        style={({ pressed }) => ({
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#000",
          alignItems: "center",
          opacity:
            loading || pressed || !code.trim() ? 0.5 : 1,
        })}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
          }}
        >
          {loading ? "Joining…" : "Join Trip"}
        </Text>
      </Pressable>
    </View>
  );
}