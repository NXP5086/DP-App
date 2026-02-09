import { View, Text, ScrollView } from "react-native";
import { useEffect, useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRole } from "../../hooks/useRole";
import { fetchTimeline } from "../../services/api";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description?: string;
  visibility: "ALL" | "GUEST" | "ORGANIZER";
}

export default function TripOverview({ trip }: any) {
  const { isOrganizer } = useRole();

  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ============================
     COUNTDOWN CALCULATION
  ============================ */
  const countdown = useMemo(() => {
    const now = new Date();
    const start = new Date(trip.startDate);
    const diff = start.getTime() - now.getTime();
    
    if (diff <= 0) return null; // Trip has started
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h`;
  }, [trip.startDate]);

  /* ============================
     FETCH TIMELINE
  ============================ */
  useEffect(() => {
    let mounted = true;

    const loadTimeline = async () => {
      try {
        setLoading(true);
        const data = await fetchTimeline(trip.id);
        if (mounted) {
          setTimeline(data);
        }
      } catch (err) {
        if (mounted) {
          setError("Could not load itinerary");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadTimeline();
    return () => {
      mounted = false;
    };
  }, [trip.id]);

  /* ============================
     GROUP BY DATE
  ============================ */
  const groupedTimeline = useMemo(() => {
    const groups: Record<string, TimelineItem[]> = {};

    timeline.forEach((item) => {
      const key = new Date(item.date).toDateString();
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    return Object.entries(groups).sort(
      (a, b) =>
        new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
  }, [timeline]);

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const sameYear = start.getFullYear() === end.getFullYear();

    const startStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      ...(sameYear ? {} : { year: "numeric" }),
    });

    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `${startStr} – ${endStr}`;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F9FAFB" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* ============================
         ROLE BADGE & COUNTDOWN
      ============================ */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            backgroundColor: "#000",
          }}
        >
          <Ionicons
            name={isOrganizer ? "star" : "person"}
            size={14}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>
            {isOrganizer ? "Organizer" : "Guest"}
          </Text>
        </View>

        {countdown && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: "#EFF6FF",
            }}
          >
            <Ionicons
              name="time-outline"
              size={14}
              color="#3B82F6"
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: "#3B82F6", fontSize: 13, fontWeight: "600" }}>
              {countdown}
            </Text>
          </View>
        )}
      </View>

      {/* ============================
         TRIP DETAILS
      ============================ */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>
          Destination
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16 }}>
          {trip.location}
        </Text>

        <Text style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>
          Dates
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {formatDateRange(trip.startDate, trip.endDate)}
        </Text>
      </View>

      {/* ============================
         TIMELINE
      ============================ */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Itinerary
      </Text>

      {loading && <Text>Loading itinerary…</Text>}

      {!loading && error && (
        <Text style={{ color: "#666" }}>{error}</Text>
      )}

      {!loading && !error && timeline.length === 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ color: "#666" }}>
            {isOrganizer
              ? "No itinerary items yet."
              : "Your itinerary hasn’t been shared yet."}
          </Text>

        </View>
      )}

      {!loading &&
        !error &&
        groupedTimeline.map(([date, items]) => (
          <View key={date} style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              {date}
            </Text>

            {items.map((item) => (
              <View
                key={item.id}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: "#f5f5f5",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontWeight: "600", marginBottom: 4 }}>
                  {item.title}
                </Text>
                {item.description && (
                  <Text style={{ color: "#555" }}>
                    {item.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
    </ScrollView>
  );
}