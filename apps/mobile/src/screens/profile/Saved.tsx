import { View, Text, ScrollView, Modal } from "react-native";
import { useState } from "react";
import { useSavedStore } from "../../store/useSavedStore";
import { useAnonymousSession } from "../../hooks/useAnonymousSession";
import ContactSheet from "../../components/sheets/ContactSheet";

const FILTERS = ["All", "Trips", "Weddings", "Wedding Destinations"];

export default function Saved() {
  const { items } = useSavedStore();
  const { sessionId } = useAnonymousSession();

  const [filter, setFilter] = useState("All");
  const [activeItem, setActiveItem] = useState<null | {
    title: string;
    type: "destination" | "wedding" | "saved";
  }>(null);

  const filtered = items.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Trips") return item.type === "destination";
    if (filter === "Weddings") return item.type === "wedding";
    if (filter === "Wedding Destinations")
      return item.type === "weddingDestination";
    return true;
  });

  return (
    <>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Filters */}
        <ScrollView horizontal style={{ marginBottom: 24 }}>
          {FILTERS.map((f) => (
            <View
              key={f}
              onTouchEnd={() => setFilter(f)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: filter === f ? "#000" : "#eee",
                borderRadius: 20,
                marginRight: 8,
              }}
            >
              <Text style={{ color: filter === f ? "#fff" : "#000" }}>
                {f}
              </Text>
            </View>
          ))}
        </ScrollView>

        {filtered.length === 0 ? (
          <Text>No saved items yet.</Text>
        ) : (
          filtered.map((item) => (
            <View
              key={item.id}
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: "#f2f2f2",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontWeight: "600", marginBottom: 4 }}>
                {item.title}
              </Text>
              <Text style={{ marginBottom: 12 }}>{item.type}</Text>

              <Text
                onPress={() =>
                  setActiveItem({
                    title: item.title,
                    type: "saved",
                  })
                }
                style={{ fontWeight: "500" }}
              >
                Plan this with us
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Contact Sheet */}
      <Modal visible={!!activeItem} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          onTouchEnd={() => setActiveItem(null)}
        >
          <View onTouchEnd={(e) => e.stopPropagation()}>
            {activeItem && (
              <ContactSheet
                interestType="saved"
                interestTitle={activeItem.title}
                anonymousSessionId={sessionId!}
                onClose={() => setActiveItem(null)}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}