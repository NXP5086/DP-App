import { View, Text } from "react-native";
import { useTravelStore } from "../../store/useTravelStore";
import { Flight } from "@dp-app/types";
import { useRole } from "../../hooks/useRole";

export default function Travel() {
  const { flights, transfer, addFlight, removeFlight } =
    useTravelStore();

  const arrival = flights.find((f) => f.type === "arrival");
  const departure = flights.find((f) => f.type === "departure");
  const { isOrganizer } = useRole();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Flights */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Flights
      </Text>

      <FlightCard
        label="Arrival"
        flight={arrival}
        onAdd={() =>
          addFlight({
            id: "arrival",
            type: "arrival",
            airline: "Airline",
            flightNumber: "XX123",
            datetime: "2026-06-12T10:00",
          })
        }
        onRemove={() => removeFlight("arrival")}
      />

      <FlightCard
        label="Departure"
        flight={departure}
        onAdd={() =>
          addFlight({
            id: "departure",
            type: "departure",
            airline: "Airline",
            flightNumber: "XX456",
            datetime: "2026-06-18T15:00",
          })
        }
        onRemove={() => removeFlight("departure")}
      />

      {/* Transfer */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 32,
          marginBottom: 12,
        }}
      >
        Airport Transfer
      </Text>

      {transfer ? (
        <View
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: "#f2f2f2",
          }}
        >
          <Text style={{ fontWeight: "600" }}>{transfer.type}</Text>
          <Text>{transfer.company}</Text>
          <Text>{transfer.datetime}</Text>
        </View>
      ) : (
        <Text style={{ color: "#666" }}>
          Transfer details will be shared by your planning team.
        </Text>
      )}
    </View>
  );
}

/* ---------- helpers ---------- */

function FlightCard({
  label,
  flight,
  onAdd,
  onRemove,
}: {
  label: string;
  flight?: Flight;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#f7f7f7",
        marginBottom: 12,
      }}
    >
      <Text style={{ fontWeight: "600", marginBottom: 4 }}>{label}</Text>

      {flight ? (
        <>
          <Text>
            {flight.airline} {flight.flightNumber}
          </Text>
          <Text style={{ marginBottom: 8 }}>{flight.datetime}</Text>

          <Text onPress={onRemove} style={{ color: "red" }}>
            Remove
          </Text>
        </>
      ) : (
        <Text onPress={onAdd} style={{ color: "#000" }}>
          Add {label} Flight
        </Text>
      )}
    </View>
  );
}