import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";

export default function Login() {
  const navigation = useNavigation<any>();
  const login = useAuthStore((s) => s.login);

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 12 }}>
        Welcome back
      </Text>

      <Text style={{ marginBottom: 24 }}>
        Log in to access your trips.
      </Text>

      <TextInput
        placeholder="Email"
        style={inputStyle}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={inputStyle}
      />

      <PrimaryCTA
        label="Log In"
        onPress={() => {
          login("user-demo-id");
          navigation.goBack();
        }}
      />

      <Text
        onPress={() => navigation.navigate("Signup")}
        style={{ marginTop: 24, textAlign: "center" }}
      >
        Don’t have an account? Create one
      </Text>
    </View>
  );
}

const inputStyle = {
  height: 44,
  backgroundColor: "#f2f2f2",
  borderRadius: 8,
  paddingHorizontal: 12,
  marginBottom: 16,
};

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