import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfileHome() {
  const navigation = useNavigation<any>();
  const logout = useAuthStore((s) => s.logout);

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

      {/* Contact Information */}
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
      <Pressable
        onPress={() =>
          Alert.alert(
            "Log out",
            "Are you sure you want to log out?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Log out",
                style: "destructive",
                onPress: async () => {
                  try {
                    await logout();
                    Alert.alert("Logged out", "You have been logged out.", [
                      {
                        text: "OK",
                        onPress: () => navigation.navigate("Explore"),
                      },
                    ]);
                  } catch (err) {
                    console.error("Logout failed", err);
                    Alert.alert("Logout failed", "Please try again.");
                  }
                },
              },
            ]
          )
        }
        style={{ marginTop: 32 }}
      >
        <Text style={{ fontSize: 16, color: "#555" }}>
          Log Out
        </Text>
      </Pressable>

      {/* Delete Account */}
      <Pressable
        onPress={() =>
          Alert.alert(
            "Delete account",
            "This will permanently delete your account and all associated data. This action cannot be undone.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                  try {
                    // TODO: call backend delete account endpoint when available
                    await logout();
                    Alert.alert("Account deleted", "Your account has been deleted.", [
                      {
                        text: "OK",
                        onPress: () => navigation.navigate("Explore"),
                      },
                    ]);
                  } catch (err) {
                    console.error("Account deletion failed", err);
                    Alert.alert("Delete failed", "Please try again.");
                  }
                },
              },
            ]
          )
        }
        style={{ marginTop: 16 }}
      >
        <Text style={{ fontSize: 16, color: "red" }}>
          Delete Account
        </Text>
      </Pressable>
    </ScrollView>
  );
}

/* ============================
   UI COMPONENTS
============================ */

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
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        {title}
      </Text>
      {subtitle && (
        <Text style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

function ContactRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontWeight: "500" }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}