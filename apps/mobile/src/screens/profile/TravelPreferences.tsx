import { View, Text } from "react-native";

export default function TravelPreferences() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ marginBottom: 12 }}>
        These preferences help us plan better for you.
      </Text>

      <Text>• Trip types</Text>
      <Text>• Preferred destinations</Text>
      <Text>• Budget comfort range (private)</Text>
    </View>
  );
}