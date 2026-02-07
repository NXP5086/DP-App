import { View, Text, ScrollView } from "react-native";

export default function AccountInfo() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Field label="Name" value="—" />
      <Field label="Email" value="—" />
      <Field label="Phone" value="—" />
      <Field label="City" value="—" />
      <Field label="Country" value="—" />
      <Field label="Preferred Contact Method" value="—" />
    </ScrollView>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 13, color: "#666" }}>{label}</Text>
      <Text style={{ fontSize: 16 }}>{value}</Text>
    </View>
  );
}