import { View, Text, ScrollView } from "react-native";
import { TimelineItem } from "@dp-app/types";
import { fetchTimeline } from "../../services/api";
import { useTripStore } from "../../store/useTripStore";
import { useEffect, useState } from "react";
import { useRole } from "../../hooks/useRole";

/**
 * Guest view only for now
 * Organizer logic will be layered later
 */

export default function Overview() {
  const tripId = useTripStore((s) => s.activeTripId);
  const [items, setItems] = useState<TimelineItem[]>([]);
  const { isOrganizer } = useRole();

  useEffect(() => {
    if (!tripId) return;

    fetch(`${API_BASE_URL}/trips/${tripId}/timeline`)
      .then((res) => res.json())
      .then(setItems)
      .catch((err) => console.error("Timeline fetch failed", err));
  }, [tripId]);

  const grouped = groupByDate(items);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* Organizer Notes */}
      {isOrganizer && (
        <View
          style={{
            padding: 16,
            backgroundColor: "#f7f7f7",
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 4 }}>
            Organizer Notes
          </Text>
          <Text>
            Internal planning notes and reminders.
          </Text>
        </View>
      )}

      {/* Timeline */}
      {Object.keys(grouped).map((date) => (
        <View key={date} style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 12,
            }}
          >
            {formatDate(date)}
          </Text>

          {grouped[date].map((item) => (
            <TimelineRow key={item.id} item={item} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

/* ---------- helpers ---------- */

function TimelineRow({ item }: { item: TimelineItem }) {
  return (
    <View
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

      {item.description && (
        <Text style={{ color: "#555" }}>{item.description}</Text>
      )}
    </View>
  );
}

function groupByDate(items: TimelineItem[]) {
  return items.reduce<Record<string, TimelineItem[]>>((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});
}

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}