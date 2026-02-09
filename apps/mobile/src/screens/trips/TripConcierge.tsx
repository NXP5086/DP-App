import { View, Text, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useConciergeStore } from "../../store/useConciergeStore";

export default function TripConcierge({ trip }: any) {
  const { messages, loadMessages, sendMessage, loading } =
    useConciergeStore();
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMessages(trip.id);
  }, [trip.id]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(trip.id, text);
    setText("");
  };

  const renderMessage = ({ item, index }: any) => {
    // User messages (GUEST or ORGANIZER) go on the right, concierge replies on the left
    const isUser = item.sender === "GUEST" || item.sender === "ORGANIZER";
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showTimestamp = !prevMessage || 
      item.sender !== prevMessage.sender ||
      new Date(item.createdAt).getTime() - new Date(prevMessage.createdAt).getTime() > 60000;

    return (
      <View style={{ marginBottom: 4 }}>
        {showTimestamp && (
          <Text
            style={{
              fontSize: 11,
              color: "#9CA3AF",
              textAlign: "center",
              marginTop: index > 0 ? 12 : 0,
              marginBottom: 8,
            }}
          >
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: isUser ? "flex-end" : "flex-start",
            paddingHorizontal: 4,
          }}
        >
          {!isUser && (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#3B82F6",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
                alignSelf: "flex-end",
              }}
            >
              <Ionicons name="headset" size={16} color="#fff" />
            </View>
          )}
          <View
            style={{
              backgroundColor: isUser ? "#111" : "#F3F4F6",
              padding: 12,
              borderRadius: 18,
              borderBottomRightRadius: isUser ? 4 : 18,
              borderBottomLeftRadius: isUser ? 18 : 4,
              maxWidth: "75%",
            }}
          >
            <Text style={{ fontSize: 15, color: isUser ? "#fff" : "#111", lineHeight: 20 }}>
              {item.body}
            </Text>
          </View>
          {isUser && (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#111",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 8,
                alignSelf: "flex-end",
              }}
            >
              <Ionicons name="person" size={16} color="#fff" />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* Empty State */}
        {messages.length === 0 && !loading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 32,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#EFF6FF",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Ionicons name="chatbubbles-outline" size={36} color="#3B82F6" />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
                textAlign: "center",
                color: "#111",
              }}
            >
              Your Personal Concierge
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Have questions about your trip? Need restaurant recommendations
              or help with activities? We're here to help.
            </Text>
          </View>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
            renderItem={renderMessage}
          />
        )}

        {/* Typing indicator */}
        {loading && messages.length > 0 && (
          <View style={{ paddingHorizontal: 20, paddingBottom: 8, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#3B82F6",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
              }}
            >
              <Ionicons name="headset" size={16} color="#fff" />
            </View>
            <View style={{ backgroundColor: "#F3F4F6", padding: 12, borderRadius: 18, borderBottomLeftRadius: 4 }}>
              <Text style={{ color: "#9CA3AF", fontSize: 13 }}>Typing...</Text>
            </View>
          </View>
        )}

        {/* Composer */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderTopWidth: 1,
            borderColor: "#E5E7EB",
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F3F4F6",
              borderRadius: 24,
              paddingHorizontal: 16,
              marginRight: 10,
            }}
          >
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Message concierge..."
              placeholderTextColor="#9CA3AF"
              style={{
                flex: 1,
                paddingVertical: 12,
                fontSize: 15,
                color: "#111",
              }}
              multiline
              maxLength={500}
            />
          </View>

          <Pressable
            onPress={handleSend}
            disabled={loading || !text.trim()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: loading || !text.trim() ? "#E5E7EB" : "#3B82F6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={loading || !text.trim() ? "#9CA3AF" : "#fff"} 
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}