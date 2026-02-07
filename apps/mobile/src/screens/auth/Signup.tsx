import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";

export default function Signup() {
  const navigation = useNavigation<any>();
  const login = useAuthStore((s) => s.login);

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 12 }}>
        Create an account
      </Text>

      <Text style={{ marginBottom: 24 }}>
        This helps us manage your trips.
      </Text>

      <TextInput placeholder="Name" style={inputStyle} />
      <TextInput placeholder="Email" style={inputStyle} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={inputStyle}
      />

      <PrimaryCTA
        label="Create Account"
        onPress={() => {
          login("user-demo-id");
          navigation.goBack();
        }}
      />

      <Text
        onPress={() => navigation.goBack()}
        style={{ marginTop: 24, textAlign: "center" }}
      >
        Already have an account? Log in
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