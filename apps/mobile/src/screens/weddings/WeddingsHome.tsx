import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WEDDINGS = [
  { id: "lake-como", title: "Lake Como Wedding" },
  { id: "jaipur", title: "Jaipur Palace Wedding" },
];

export default function WeddingsHome() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, padding: 16, paddingTop: insets.top + 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 16 }}>
        Real Weddings
      </Text>

      {WEDDINGS.map((w) => (
        <View
          key={w.id}
          onTouchEnd={() =>
            navigation.navigate("WeddingDetail", {
              id: w.id,
              title: w.title,
            })
          }
          style={{
            height: 220,
            backgroundColor: "#ddd",
            borderRadius: 16,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{w.title}</Text>
        </View>
      ))}

      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Wedding Destinations
      </Text>

      <View
        style={{
          padding: 16,
          borderRadius: 14,
          backgroundColor: "#f0f0f0",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontWeight: "600" }}>Italy</Text>
        <Text>Timeless settings, intimate guest counts</Text>
      </View>
    </ScrollView>
  );
}