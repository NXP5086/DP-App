import { View, Text } from "react-native";

export default function TripPlaceholder({ title }: { title: string }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#666" }}>
        {title} coming soon
      </Text>
    </View>
  );
}