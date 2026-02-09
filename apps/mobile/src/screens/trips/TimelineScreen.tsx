import { View, Text, SectionList } from "react-native";
import { useMemo } from "react";
import { useRole } from "../../hooks/useRole";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description?: string;
  visibility: "ALL" | "GUEST" | "ORGANIZER";
}

interface Props {
  items: TimelineItem[];
}

export default function TimelineScreen({ items }: Props) {
  const { isOrganizer } = useRole();

  const sections = useMemo(() => {
    const grouped: Record<string, TimelineItem[]> = {};

    items.forEach((item) => {
      const dateKey = new Date(item.date).toDateString();
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(item);
    });

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    }));
  }, [items]);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderSectionHeader={({ section }) => (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginTop: 24,
            marginBottom: 12,
          }}
        >
          {section.title}
        </Text>
      )}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 14,
            borderRadius: 12,
            backgroundColor: "#f5f5f5",
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {item.title}
          </Text>

          {item.description && (
            <Text style={{ marginTop: 6, color: "#555" }}>
              {item.description}
            </Text>
          )}

          {/* Visibility label — ORGANIZER ONLY */}
          {isOrganizer && item.visibility !== "ALL" && (
            <Text
              style={{
                marginTop: 8,
                fontSize: 12,
                color:
                  item.visibility === "ORGANIZER"
                    ? "#b00020"
                    : "#555",
                fontWeight: "500",
              }}
            >
              {item.visibility === "ORGANIZER"
                ? "Organizer only"
                : "Guests can see this"}
            </Text>
          )}
        </View>
      )}
    />
  );
}