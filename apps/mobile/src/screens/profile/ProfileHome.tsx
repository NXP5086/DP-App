import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileHome() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* Saved */}
      <Section
        title="Saved"
        onPress={() => navigation.navigate("Saved")}
      />

      {/* Account Info */}
      <Section
        title="Account Info"
        subtitle="View and manage your details"
        onPress={() => navigation.navigate("AccountInfo")}
      />

      {/* Travel Preferences */}
      <Section
        title="Travel Preferences"
        subtitle="Optional — helps us plan better"
        onPress={() => navigation.navigate("TravelPreferences")}
      />

      {/* Contact Information Box */}
      <View
        style={{
          marginTop: 32,
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#f7f7f7",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
          Need to talk to us?
        </Text>
        <Text style={{ marginBottom: 12 }}>
          We’re happy to help.
        </Text>

        <ContactRow label="WhatsApp" value="+1 234 567 890" />
        <ContactRow label="Call" value="+1 234 567 890" />
        <ContactRow label="Email" value="hello@yourcompany.com" />
      </View>

      {/* Support */}
      <View style={{ marginTop: 32 }}>
        <Section title="FAQs" />
        <Section title="Terms" />
        <Section title="Privacy" />
      </View>

      {/* Log Out */}
      <View style={{ marginTop: 32 }}>
        <Text style={{ color: "#555" }}>Log Out</Text>
      </View>

      {/* Delete Account */}
      <View style={{ marginTop: 16 }}>
        <Text style={{ color: "red" }}>Delete Account</Text>
      </View>
    </ScrollView>
  );
}

function Section({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}) {
  return (
    <View
      onTouchEnd={onPress}
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
      {subtitle && (
        <Text style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontWeight: "500" }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}