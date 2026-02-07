import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { ContactMethod } from "@dp-app/types";

interface Props {
  interestTitle: string;
  interestType: "destination" | "wedding" | "saved";
  anonymousSessionId: string;
  onClose: () => void;
}

export default function ContactSheet({
  interestTitle,
  interestType,
  anonymousSessionId,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState<ContactMethod>("whatsapp");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const payload = {
      name,
      contactMethod: method,
      note,
      interestType,
      interestTitle,
      anonymousSessionId,
    };

    console.log("CONTACT REQUEST", payload);
    onClose();
  };

  return (
    <View
      style={{
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
        Plan this with us
      </Text>

      <Text style={{ marginBottom: 16, color: "#555" }}>
        Tell us how you’d like to connect.
      </Text>

      {/* Name */}
      <TextInput
        placeholder="Your name"
        value={name}
        onChangeText={setName}
        style={{
          height: 44,
          backgroundColor: "#f2f2f2",
          borderRadius: 8,
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
      />

      {/* Contact Method */}
      <Text style={{ fontWeight: "500", marginBottom: 8 }}>
        Preferred contact method
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        {(["whatsapp", "call", "email"] as ContactMethod[]).map((m) => (
          <View
            key={m}
            onTouchEnd={() => setMethod(m)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              backgroundColor: method === m ? "#000" : "#eee",
              borderRadius: 20,
              marginRight: 8,
            }}
          >
            <Text style={{ color: method === m ? "#fff" : "#000" }}>
              {m}
            </Text>
          </View>
        ))}
      </View>

      {/* Optional Note */}
      <TextInput
        placeholder="Anything you'd like us to know? (optional)"
        value={note}
        onChangeText={setNote}
        multiline
        style={{
          minHeight: 80,
          backgroundColor: "#f2f2f2",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      {/* CTA */}
      <View
        onTouchEnd={handleSubmit}
        style={{
          padding: 16,
          backgroundColor: "#000",
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Send Request
        </Text>
      </View>
    </View>
  );
}