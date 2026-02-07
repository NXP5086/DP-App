import { View, Text, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CATEGORIES = [
  "Honeymoon",
  "Family",
  "Group Trip",
  "Solo",
  "Adventure",
];

const DESTINATIONS = [
  { id: "singapore", title: "Singapore" },
  { id: "bali", title: "Bali" },
  { id: "paris", title: "Paris" },
];

export default function ExploreHome() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* Search */}
      <TextInput
        placeholder="Find your next trip idea"
        style={{
          height: 44,
          borderRadius: 8,
          backgroundColor: "#f2f2f2",
          paddingHorizontal: 12,
          marginBottom: 24,
        }}
      />

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 32 }}
      >
        {CATEGORIES.map((cat) => (
          <View
            key={cat}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: "#eaeaea",
              borderRadius: 20,
              marginRight: 8,
            }}
          >
            <Text>{cat}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Hot Right Now */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Hot Right Now
      </Text>

      {DESTINATIONS.map((d) => (
        <View
          key={d.id}
          onTouchEnd={() =>
            navigation.navigate("DestinationDetail", {
              id: d.id,
              title: d.title,
            })
          }
          style={{
            height: 160,
            backgroundColor: "#ddd",
            borderRadius: 12,
            marginBottom: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{d.title}</Text>
        </View>
      ))}

      {/* Explore by Location */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 24,
          marginBottom: 12,
        }}
      >
        Explore Singapore
      </Text>

      <View
        style={{
          height: 120,
          backgroundColor: "#eee",
          borderRadius: 12,
          marginBottom: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Where to go</Text>
      </View>

      <View
        style={{
          height: 120,
          backgroundColor: "#eee",
          borderRadius: 12,
          marginBottom: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>What to do</Text>
      </View>

      {/* Wedding Bridge */}
      <View
        style={{
          padding: 20,
          borderRadius: 12,
          backgroundColor: "#f7f7f7",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
          Planning a destination wedding?
        </Text>
        <Text>Explore real weddings.</Text>
      </View>
    </ScrollView>
  );
}