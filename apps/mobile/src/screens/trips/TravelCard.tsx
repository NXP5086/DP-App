import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddTravelSheet from "../../components/sheets/AddTravelSheet";
import { deleteTravel } from "../../services/api";
import { useTravelStore } from "../../store/useTravelStore";

const TYPE_CONFIG: Record<string, { icon: any; color: string; label: string }> = {
  FLIGHT: { icon: "airplane", color: "#3B82F6", label: "Flight" },
  STAY: { icon: "bed", color: "#8B5CF6", label: "Stay" },
  TRANSFER: { icon: "car", color: "#10B981", label: "Transfer" },
};

function formatDateTime(dateString?: string) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateString?: string) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(dateString?: string) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <View style={{ flexDirection: "row", marginTop: 8 }}>
      <Text style={{ width: 100, fontSize: 13, color: "#6B7280" }}>{label}</Text>
      <Text style={{ flex: 1, fontSize: 13, color: "#374151" }}>{value}</Text>
    </View>
  );
}

function FlightLegDetails({ 
  flight, 
  label, 
  tripId, 
  onEdit, 
  onDelete 
}: { 
  flight: any; 
  label: string; 
  tripId?: string;
  onEdit?: (flight: any) => void;
  onDelete?: (flight: any) => void;
}) {
  if (!flight) return null;
  
  const flightInfo = flight.airline && flight.flightNumber 
    ? `${flight.airline} ${flight.flightNumber}` 
    : flight.airline || flight.flightNumber || null;
  
  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6, justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ 
            width: 6, 
            height: 6, 
            borderRadius: 3, 
            backgroundColor: "#3B82F6", 
            marginRight: 8 
          }} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#374151" }}>{label}</Text>
        </View>
        {tripId && (
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity onPress={() => onEdit?.(flight)}>
              <Ionicons name="pencil" size={16} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete?.(flight)}>
              <Ionicons name="trash-outline" size={16} color="#DC2626" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ marginLeft: 14 }}>
        {flightInfo && (
          <Text style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>{flightInfo}</Text>
        )}
        {flight.departureDateTime && (
          <Text style={{ fontSize: 13, color: "#6B7280" }}>
            Departs: {formatDateTime(flight.departureDateTime)}
          </Text>
        )}
        {flight.arrivalDateTime && (
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            Arrives: {formatDateTime(flight.arrivalDateTime)}
          </Text>
        )}
        {!flightInfo && !flight.departureDateTime && !flight.arrivalDateTime && (
          <Text style={{ fontSize: 13, color: "#9CA3AF", fontStyle: "italic" }}>Details not added</Text>
        )}
      </View>
    </View>
  );
}

export function FlightsCard({ flights, tripId, onEdit }: { flights: any[]; tripId?: string; onEdit?: (item: any) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const load = useTravelStore((s) => s.load);
  const config = TYPE_CONFIG.FLIGHT;
  
  const inboundFlight = flights.find((f: any) => f.flightDirection === "ARRIVAL");
  const outboundFlight = flights.find((f: any) => f.flightDirection === "DEPARTURE");
  
  // Determine which leg is "current" based on dates
  const now = Date.now();
  const inboundArrivalTime = inboundFlight?.arrivalDateTime 
    ? new Date(inboundFlight.arrivalDateTime).getTime() 
    : null;
  const inboundCompleted = inboundArrivalTime !== null && inboundArrivalTime < now;
  
  const getSubtitle = () => {
    // If inbound has passed and we have outbound, show outbound
    if (inboundCompleted && outboundFlight) {
      const info = outboundFlight.airline && outboundFlight.flightNumber
        ? `${outboundFlight.airline} ${outboundFlight.flightNumber}`
        : null;
      const date = formatDate(outboundFlight.departureDateTime);
      return info ? `Outbound · ${info}` : date ? `Outbound · ${date}` : "Outbound flight";
    }
    
    // If inbound completed but no outbound, show completed status
    if (inboundCompleted && inboundFlight && !outboundFlight) {
      const info = inboundFlight.airline && inboundFlight.flightNumber
        ? `${inboundFlight.airline} ${inboundFlight.flightNumber}`
        : null;
      return info ? `✓ Arrived · ${info}` : "✓ Arrived";
    }
    
    // Show inbound if exists and not completed
    if (inboundFlight) {
      const info = inboundFlight.airline && inboundFlight.flightNumber
        ? `${inboundFlight.airline} ${inboundFlight.flightNumber}`
        : null;
      const date = formatDate(inboundFlight.arrivalDateTime);
      return info ? `Inbound · ${info}` : date ? `Inbound · ${date}` : "Inbound flight";
    }
    
    // Only outbound exists
    if (outboundFlight) {
      const info = outboundFlight.airline && outboundFlight.flightNumber
        ? `${outboundFlight.airline} ${outboundFlight.flightNumber}`
        : null;
      return info ? `Outbound · ${info}` : "Outbound flight";
    }
    
    return "No flights added";
  };
  
  const flightCount = flights.length;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setExpanded(!expanded)}
      style={{
        borderRadius: 12,
        backgroundColor: "#fff",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <View style={{ flexDirection: "row", padding: 14, alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: `${config.color}15`,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name={config.icon} size={20} color={config.color} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 15, color: "#111" }}>
              Flights
            </Text>
            {flightCount > 0 && (
              <View style={{ 
                backgroundColor: "#EFF6FF", 
                paddingHorizontal: 8, 
                paddingVertical: 2, 
                borderRadius: 10,
                marginLeft: 8,
              }}>
                <Text style={{ fontSize: 12, color: "#3B82F6", fontWeight: "500" }}>
                  {flightCount}
                </Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {getSubtitle()}
          </Text>
        </View>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color="#9CA3AF"
        />
      </View>

      {/* Expanded details */}
      {expanded && (
        <View style={{ paddingHorizontal: 14, paddingBottom: 14, paddingTop: 4, borderTopWidth: 1, borderTopColor: "#F3F4F6" }}>
          <FlightLegDetails 
            flight={inboundFlight} 
            label={inboundCompleted ? "✓ Inbound" : "Inbound"}
            tripId={tripId}
            onEdit={onEdit}
            onDelete={(flight) => {
              Alert.alert(
                "Delete Flight",
                `Are you sure you want to delete this ${flight.flightDirection === "ARRIVAL" ? "inbound" : "outbound"} flight?`,
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      setDeleting(true);
                      try {
                        await deleteTravel(tripId, flight.id);
                        await load(tripId);
                      } catch (e) {
                        Alert.alert("Error", "Failed to delete flight");
                      } finally {
                        setDeleting(false);
                      }
                    },
                  },
                ]
              );
            }}
          />
          {inboundFlight && outboundFlight && <View style={{ height: 12 }} />}
          <FlightLegDetails 
            flight={outboundFlight} 
            label="Outbound"
            tripId={tripId}
            onEdit={onEdit}
            onDelete={(flight) => {
              Alert.alert(
                "Delete Flight",
                `Are you sure you want to delete this ${flight.flightDirection === "ARRIVAL" ? "inbound" : "outbound"} flight?`,
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      setDeleting(true);
                      try {
                        await deleteTravel(tripId, flight.id);
                        await load(tripId);
                      } catch (e) {
                        Alert.alert("Error", "Failed to delete flight");
                      } finally {
                        setDeleting(false);
                      }
                    },
                  },
                ]
              );
            }}
          />
          
          {!inboundFlight && !outboundFlight && (
            <Text style={{ fontSize: 13, color: "#9CA3AF", fontStyle: "italic", marginTop: 8 }}>
              No flight details added yet
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

export function TravelCard({ item, tripId, onEdit }: { item: any; tripId?: string; onEdit?: (item: any) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const load = useTravelStore((s) => s.load);
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.STAY;

  const getTitle = () => {
    if (item.type === "STAY") {
      return item.hotelName || "Stay";
    }
    if (item.type === "TRANSFER") {
      const type = item.transferType?.charAt(0) + item.transferType?.slice(1).toLowerCase();
      return type ? `${type} Transfer` : "Transfer";
    }
    return config.label;
  };

  const getSubtitle = () => {
    if (item.type === "STAY") {
      if (item.checkIn) {
        return formatDate(item.checkIn);
      }
      return "Dates not added";
    }
    if (item.type === "TRANSFER") {
      const airport = formatDate(item.airportDepartureDateTime);
      const hotel = formatDate(item.hotelDepartureDateTime);
      return airport || hotel || "Schedule not added";
    }
    return null;
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Travel Item",
      `Are you sure you want to delete this ${item.type.toLowerCase()}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteTravel(tripId, item.id);
              await load(tripId);
            } catch (e) {
              Alert.alert("Error", "Failed to delete item");
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setExpanded(!expanded)}
      style={{
        borderRadius: 12,
        backgroundColor: "#fff",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        overflow: "hidden",
        opacity: deleting ? 0.5 : 1,
      }}
    >
      {/* Header row */}
      <View style={{ flexDirection: "row", padding: 14, alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: `${config.color}15`,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name={config.icon} size={20} color={config.color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "600", fontSize: 15, color: "#111" }}>
            {getTitle()}
          </Text>
          <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {getSubtitle()}
          </Text>
        </View>

        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color="#9CA3AF"
        />
      </View>

      {/* Expanded details */}
      {expanded && (
        <View style={{ paddingHorizontal: 14, paddingBottom: 14, paddingTop: 4, borderTopWidth: 1, borderTopColor: "#F3F4F6" }}>
          {item.type === "STAY" && (
            <>
              <DetailRow label="Hotel" value={item.hotelName} />
              <DetailRow label="Room" value={item.roomNumber} />
              <DetailRow label="Check-in" value={formatDateTime(item.checkIn)} />
              <DetailRow label="Check-out" value={formatDateTime(item.checkOut)} />
            </>
          )}

          {item.type === "TRANSFER" && (
            <>
              <DetailRow label="Type" value={item.transferType?.charAt(0) + item.transferType?.slice(1).toLowerCase()} />
              <DetailRow label="Airport pickup" value={formatDateTime(item.airportDepartureDateTime)} />
              <DetailRow label="Hotel pickup" value={formatDateTime(item.hotelDepartureDateTime)} />
            </>
          )}

          {/* Action buttons - only show if editable (tripId provided) */}
          {tripId && (
            <View style={{ flexDirection: "row", marginTop: 12, gap: 10 }}>
              <TouchableOpacity
                onPress={() => onEdit?.(item)}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: "#F3F4F6",
                }}
              >
                <Ionicons name="pencil" size={16} color="#374151" style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151" }}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDelete}
                disabled={deleting}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: "#FEE2E2",
                }}
              >
                <Ionicons name="trash-outline" size={16} color="#DC2626" style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 14, fontWeight: "500", color: "#DC2626" }}>
                  {deleting ? "Deleting..." : "Delete"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

function AddButton({ icon, label, onPress }: { icon: any; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#fff",
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        borderStyle: "dashed",
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: "#F3F4F6",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <Ionicons name={icon} size={20} color="#9CA3AF" />
      </View>
      <Text style={{ fontSize: 15, color: "#6B7280" }}>{label}</Text>
    </TouchableOpacity>
  );
}

export function AddTravelCTA({ tripId, existing }: any) {
  const [sheetType, setSheetType] = useState<"FLIGHT" | "STAY" | "TRANSFER" | null>(null);

  const counts = existing.reduce(
    (acc: any, i: any) => {
      acc[i.type] = (acc[i.type] || 0) + 1;
      return acc;
    },
    { FLIGHT: 0, STAY: 0, TRANSFER: 0 }
  );

  // Get existing flight directions
  const existingDirections = existing
    .filter((i: any) => i.type === "FLIGHT" && i.flightDirection)
    .map((i: any) => i.flightDirection);

  return (
    <>
      {counts.FLIGHT < 2 && (
        <AddButton icon="airplane-outline" label="Add Flight" onPress={() => setSheetType("FLIGHT")} />
      )}
      {counts.STAY < 1 && (
        <AddButton icon="bed-outline" label="Add Stay" onPress={() => setSheetType("STAY")} />
      )}
      {counts.TRANSFER < 1 && (
        <AddButton icon="car-outline" label="Add Transfer" onPress={() => setSheetType("TRANSFER")} />
      )}

      <Modal
        visible={sheetType !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSheetType(null)}
      >
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setSheetType(null)}
          />
          {sheetType && (
            <AddTravelSheet
              tripId={tripId}
              type={sheetType}
              onClose={() => setSheetType(null)}
              existingDirections={sheetType === "FLIGHT" ? existingDirections : []}
            />
          )}
        </View>
      </Modal>
    </>
  );
}