import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { ContactMethod } from "@dp-app/types";
import { sendContactRequest } from "../../services/api";

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

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      await sendContactRequest({
        name,
        contactMethod: method,
        note,
        interestType,
        interestTitle,
        anonymousSession: anonymousSessionId,
      });

      onClose();
    } catch (err) {
      console.error("Failed to send contact request", err);
    }
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