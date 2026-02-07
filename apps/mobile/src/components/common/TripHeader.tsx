import { View, Text } from "react-native";

interface Props {
  title: string;
  dates: string;
  location: string;
}

export default function TripHeader({ title, dates, location }: Props) {
  return (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
      }}
    >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
        <Text style={{ color: "#555", marginTop: 4 }}>
          {location} • {dates}
        </Text>
    </View>
  );
}