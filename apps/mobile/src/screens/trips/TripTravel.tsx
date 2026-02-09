import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRole } from "../../hooks/useRole";
import { useAuthStore } from "../../store/useAuthStore";
import { useTravelStore } from "../../store/useTravelStore";
import { TravelCard, FlightsCard, AddTravelCTA } from "./TravelCard";
import AddTravelSheet from "../../components/sheets/AddTravelSheet";

function SectionHeader({ title, icon }: { title: string; icon?: any }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, marginTop: 8 }}>
      {icon && <Ionicons name={icon} size={18} color="#374151" style={{ marginRight: 8 }} />}
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#374151" }}>{title}</Text>
    </View>
  );
}

function GuestTravelCard({ guestName, travel, renderTravelItems }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={{
        marginTop: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setExpanded(!expanded)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#F3F4F6",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Ionicons name="person" size={18} color="#6B7280" />
          </View>
          <Text style={{ fontWeight: "600", fontSize: 15, color: "#111" }}>
            {guestName}
          </Text>
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={{ paddingHorizontal: 16, paddingBottom: 16, backgroundColor: "#FAFAFA" }}>
          {renderTravelItems(travel, false)}
        </View>
      )}
    </View>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <View style={{ alignItems: "center", paddingVertical: 32 }}>
      <Text style={{ color: "#9CA3AF", marginTop: 12, fontSize: 15 }}>{message}</Text>
    </View>
  );
}

export default function TripTravel({ trip }: any) {
  const { isOrganizer } = useRole();
  const userId = useAuthStore((s) => s.userId);
  const { items, load } = useTravelStore();
  const [editItem, setEditItem] = useState<any>(null);

  useEffect(() => {
    load(trip.id);
  }, [trip.id]);

  // Get current user's items
  const myItems = items.filter((i: any) => i.userId === userId);

  // Group by user (for organizers viewing all)
  const grouped = items.reduce((acc: any, item: any) => {
    acc[item.userId] = acc[item.userId] || [];
    acc[item.userId].push(item);
    return acc;
  }, {});

  // Helper to render travel items grouped (flights combined, others separate)
  // editable: false hides edit/delete buttons (used for viewing other users' items)
  const renderTravelItems = (travelItems: any[], editable = true) => {
    const flights = travelItems.filter((i: any) => i.type === "FLIGHT");
    const others = travelItems.filter((i: any) => i.type !== "FLIGHT");
    
    return (
      <>
        {flights.length > 0 && (
          <FlightsCard 
            flights={flights} 
            tripId={editable ? trip.id : undefined} 
            onEdit={editable ? (item) => setEditItem(item) : undefined} 
          />
        )}
        {others.map((item: any) => (
          <TravelCard 
            key={item.id} 
            item={item} 
            tripId={editable ? trip.id : undefined}
            onEdit={editable ? (item) => setEditItem(item) : undefined}
          />
        ))}
      </>
    );
  };

  if (!isOrganizer) {
    // Guest view: show own items + add buttons
    return (
      <>
        <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#F9FAFB" }} style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
          <SectionHeader title="Your Travel" icon="briefcase-outline" />
          {myItems.length === 0 && (
            <EmptyState message="Add your travel details below" />
          )}
          {renderTravelItems(myItems)}
          <View style={{ marginTop: myItems.length > 0 ? 8 : 0 }}>
            <AddTravelCTA tripId={trip.id} existing={myItems} />
          </View>
        </ScrollView>
        
        {/* Edit modal */}
        <Modal visible={!!editItem} animationType="slide" presentationStyle="pageSheet">
          <AddTravelSheet
            tripId={trip.id}
            onClose={() => setEditItem(null)}
            editItem={editItem}
            existingDirections={myItems
              .filter((i: any) => i.type === "FLIGHT" && i.flightDirection)
              .map((i: any) => i.flightDirection)}
          />
        </Modal>
      </>
    );
  }

  // Organizer view: show all grouped by user + own add buttons
  const organizerItems = items.filter((i: any) => i.userId === userId);
  const guestEntries = Object.entries(grouped).filter(([uid]) => uid !== userId);

  return (
    <>
      <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#F9FAFB" }} style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
        {/* Organizer's own travel */}
        <SectionHeader title="Your Travel" icon="briefcase-outline" />
        {organizerItems.length === 0 && (
          <EmptyState message="Add your travel details below" />
        )}
        {renderTravelItems(organizerItems)}
        <View style={{ marginTop: organizerItems.length > 0 ? 8 : 0 }}>
          <AddTravelCTA tripId={trip.id} existing={organizerItems} />
        </View>

        {/* Guest travel */}
        {guestEntries.length > 0 && (
          <>
            <View style={{ marginTop: 24 }}>
              <SectionHeader title="Guest Travel" icon="people-outline" />
            </View>
            {guestEntries.map(([uid, travel]: any) => {
              const guestName = travel[0]?.user?.name || travel[0]?.user?.email || "Guest";
              return (
                <GuestTravelCard
                  key={uid}
                  guestName={guestName}
                  travel={travel}
                  renderTravelItems={renderTravelItems}
                />
              );
            })}
          </>
        )}
      </ScrollView>
      
      {/* Edit modal */}
      <Modal visible={!!editItem} animationType="slide" presentationStyle="pageSheet">
        <AddTravelSheet
          tripId={trip.id}
          onClose={() => setEditItem(null)}
          editItem={editItem}
          existingDirections={organizerItems
            .filter((i: any) => i.type === "FLIGHT" && i.flightDirection)
            .map((i: any) => i.flightDirection)}
        />
      </Modal>
    </>
  );
}