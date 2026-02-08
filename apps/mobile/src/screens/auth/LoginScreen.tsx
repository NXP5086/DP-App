import { View, Text, TextInput, Pressable } from "react-native";
import { useRef, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const inFlightRef = useRef(false);

  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const handleLogin = async () => {
    if (!email.trim() || loading || inFlightRef.current) return;

    inFlightRef.current = true;

    try {
      await login(email.trim());
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      inFlightRef.current = false;
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
        Welcome back
      </Text>

      <TextInput
        placeholder="Email address"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
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
        onPress={handleLogin}
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
          {loading ? "Logging in…" : "Log In"}
        </Text>
      </Pressable>
    </View>
  );
}