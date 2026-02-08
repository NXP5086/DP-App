import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = useAuthStore((s) => s.signup);

  const handleSignup = async () => {
    if (!email.trim() || !name.trim()) return;

    try {
      setLoading(true);
      await signup(email.trim(), name.trim());
    } catch (err) {
      console.error("Signup failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
        Create your account
      </Text>

      <TextInput
        placeholder="Your name"
        value={name}
        onChangeText={setName}
        style={{
          height: 44,
          backgroundColor: "#f2f2f2",
          borderRadius: 8,
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Email address"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 44,
          backgroundColor: "#f2f2f2",
          borderRadius: 8,
          paddingHorizontal: 12,
          marginBottom: 16,
        }}
      />

      <View
        onTouchEnd={handleSignup}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#000",
          alignItems: "center",
          opacity: loading ? 0.5 : 1,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          {loading ? "Creating account…" : "Create Account"}
        </Text>
      </View>
    </View>
  );
}