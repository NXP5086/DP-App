import { View, Text, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { useConciergeStore } from "../../store/useConciergeStore";

export default function Concierge() {
  const { messages, sendMessage } = useConciergeStore();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText("");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Messages */}
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        contentContainerStyle={{ paddingBottom: 12 }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            body={msg.body}
            isGuest={msg.sender === "guest"}
          />
        ))}
      </ScrollView>

      {/* Input */}
      <View
        style={{
          padding: 12,
          borderTopWidth: 1,
          borderTopColor: "#eee",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
            borderRadius: 20,
            paddingHorizontal: 12,
          }}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Message concierge…"
            style={{ flex: 1, paddingVertical: 8 }}
          />

          <Text
            onPress={handleSend}
            style={{
              paddingHorizontal: 12,
              fontWeight: "600",
            }}
          >
            Send
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ---------- helpers ---------- */

function MessageBubble({
  body,
  isGuest,
}: {
  body: string;
  isGuest: boolean;
}) {
  return (
    <View
      style={{
        alignSelf: isGuest ? "flex-end" : "flex-start",
        backgroundColor: isGuest ? "#000" : "#eaeaea",
        borderRadius: 16,
        padding: 12,
        marginBottom: 8,
        maxWidth: "80%",
      }}
    >
      <Text style={{ color: isGuest ? "#fff" : "#000" }}>
        {body}
      </Text>
    </View>
  );
}