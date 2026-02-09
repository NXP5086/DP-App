import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createTravel, updateTravel } from "../../services/api";
import { useTravelStore } from "../../store/useTravelStore";

type TravelType = "FLIGHT" | "STAY" | "TRANSFER";

interface Props {
  tripId: string;
  type?: TravelType;
  onClose: () => void;
  editItem?: any;
  existingDirections?: ("ARRIVAL" | "DEPARTURE")[];
}

export default function AddTravelSheet({ tripId, type: initialType, onClose, editItem, existingDirections = [] }: Props) {
  const { load } = useTravelStore();
  const isEditing = !!editItem;
  const type = editItem?.type || initialType || "FLIGHT";
  
  // Directions that are already used (excluding current item if editing)
  const takenDirections = isEditing 
    ? existingDirections.filter(d => d !== editItem?.flightDirection)
    : existingDirections;

  // Auto-select the available direction (ARRIVAL preferred, fallback to DEPARTURE)
  const getDefaultDirection = (): "ARRIVAL" | "DEPARTURE" => {
    if (editItem?.flightDirection) return editItem.flightDirection;
    if (takenDirections.includes("ARRIVAL")) return "DEPARTURE";
    return "ARRIVAL";
  };

  // Flight fields
  const [flightDirection, setFlightDirection] = useState<"ARRIVAL" | "DEPARTURE">(
    getDefaultDirection()
  );
  const [airline, setAirline] = useState(editItem?.airline || "");
  const [flightNumber, setFlightNumber] = useState(editItem?.flightNumber || "");
  const [departureDateTime, setDepartureDateTime] = useState<Date | null>(
    editItem?.departureDateTime ? new Date(editItem.departureDateTime) : null
  );
  const [arrivalDateTime, setArrivalDateTime] = useState<Date | null>(
    editItem?.arrivalDateTime ? new Date(editItem.arrivalDateTime) : null
  );

  // Stay fields
  const [hotelName, setHotelName] = useState(editItem?.hotelName || "");
  const [roomNumber, setRoomNumber] = useState(editItem?.roomNumber || "");
  const [checkIn, setCheckIn] = useState<Date | null>(
    editItem?.checkIn ? new Date(editItem.checkIn) : null
  );
  const [checkOut, setCheckOut] = useState<Date | null>(
    editItem?.checkOut ? new Date(editItem.checkOut) : null
  );

  // Transfer fields
  const [transferType, setTransferType] = useState<"SHARED" | "PRIVATE" | "OTHER">(
    editItem?.transferType || "SHARED"
  );
  const [airportDepartureDateTime, setAirportDepartureDateTime] = useState<Date | null>(
    editItem?.airportDepartureDateTime ? new Date(editItem.airportDepartureDateTime) : null
  );
  const [hotelDepartureDateTime, setHotelDepartureDateTime] = useState<Date | null>(
    editItem?.hotelDepartureDateTime ? new Date(editItem.hotelDepartureDateTime) : null
  );

  // Date picker state
  const [activePicker, setActivePicker] = useState<string | null>(null);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const payload: any = { type };

      if (type === "FLIGHT") {
        payload.flightDirection = flightDirection;
        payload.airline = airline;
        payload.flightNumber = flightNumber;
        if (departureDateTime) payload.departureDateTime = departureDateTime.toISOString();
        if (arrivalDateTime) payload.arrivalDateTime = arrivalDateTime.toISOString();
      } else if (type === "STAY") {
        payload.hotelName = hotelName;
        payload.roomNumber = roomNumber;
        if (checkIn) payload.checkIn = checkIn.toISOString();
        if (checkOut) payload.checkOut = checkOut.toISOString();
      } else if (type === "TRANSFER") {
        payload.transferType = transferType;
        if (airportDepartureDateTime) payload.airportDepartureDateTime = airportDepartureDateTime.toISOString();
        if (hotelDepartureDateTime) payload.hotelDepartureDateTime = hotelDepartureDateTime.toISOString();
      }

      if (isEditing) {
        await updateTravel(tripId, editItem.id, payload);
      } else {
        await createTravel(tripId, payload);
      }
      await load(tripId);
      onClose();
    } catch (err) {
      console.error("Failed to save travel item", err);
    } finally {
      setSaving(false);
    }
  };

  const title =
    type === "FLIGHT" ? (isEditing ? "Edit Flight" : "Add Flight") :
    type === "STAY" ? (isEditing ? "Edit Stay" : "Add Stay") :
    (isEditing ? "Edit Transfer" : "Add Transfer");

  const openPicker = (field: string, currentValue: Date | null) => {
    setTempDate(currentValue || new Date());
    setPickerMode("date");
    setActivePicker(field);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android" && event.type === "dismissed") {
      setActivePicker(null);
      return;
    }

    if (selectedDate) {
      setTempDate(selectedDate);

      if (Platform.OS === "android") {
        if (pickerMode === "date") {
          setPickerMode("time");
        } else {
          applyDate(activePicker!, selectedDate);
          setActivePicker(null);
        }
      }
    }
  };

  const applyDate = (field: string, date: Date) => {
    switch (field) {
      case "departureDateTime": setDepartureDateTime(date); break;
      case "arrivalDateTime": setArrivalDateTime(date); break;
      case "checkIn": setCheckIn(date); break;
      case "checkOut": setCheckOut(date); break;
      case "airportDepartureDateTime": setAirportDepartureDateTime(date); break;
      case "hotelDepartureDateTime": setHotelDepartureDateTime(date); break;
    }
  };

  const confirmIOSPicker = () => {
    if (activePicker) {
      applyDate(activePicker, tempDate);
      setActivePicker(null);
    }
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return "Tap to select";
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const DateTimeButton = ({ label, value, field }: { label: string; value: Date | null; field: string }) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontWeight: "500", marginBottom: 6 }}>{label}</Text>
      <TouchableOpacity
        onPress={() => openPicker(field, value)}
        style={{
          height: 44,
          backgroundColor: "#f2f2f2",
          borderRadius: 8,
          paddingHorizontal: 12,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: value ? "#000" : "#888" }}>
          {formatDateTime(value)}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: "#fff",
        maxHeight: "80%",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        {title}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {type === "FLIGHT" && (
          <>
            <Text style={{ fontWeight: "500", marginBottom: 8 }}>Direction</Text>
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              {(["ARRIVAL", "DEPARTURE"] as const).map((d) => {
                const isTaken = takenDirections.includes(d);
                const isSelected = flightDirection === d;
                return (
                  <TouchableOpacity
                    key={d}
                    onPress={() => !isTaken && setFlightDirection(d)}
                    disabled={isTaken}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 20,
                      backgroundColor: isSelected ? "#000" : isTaken ? "#E5E7EB" : "#f2f2f2",
                      marginRight: 8,
                      opacity: isTaken ? 0.5 : 1,
                    }}
                  >
                    <Text style={{ color: isSelected ? "#fff" : isTaken ? "#9CA3AF" : "#000" }}>
                      {d === "ARRIVAL" ? "Arriving" : "Departing"}{isTaken ? " (added)" : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TextInput
              placeholder="Airline (e.g. United)"
              value={airline}
              onChangeText={setAirline}
              style={inputStyle}
            />
            <TextInput
              placeholder="Flight number (e.g. UA123)"
              value={flightNumber}
              onChangeText={setFlightNumber}
              style={inputStyle}
            />
            <DateTimeButton label="Departure" value={departureDateTime} field="departureDateTime" />
            <DateTimeButton label="Arrival" value={arrivalDateTime} field="arrivalDateTime" />
          </>
        )}

        {type === "STAY" && (
          <>
            <TextInput
              placeholder="Hotel name"
              value={hotelName}
              onChangeText={setHotelName}
              style={inputStyle}
            />
            <TextInput
              placeholder="Room number (optional)"
              value={roomNumber}
              onChangeText={setRoomNumber}
              style={inputStyle}
            />
            <DateTimeButton label="Check-in" value={checkIn} field="checkIn" />
            <DateTimeButton label="Check-out" value={checkOut} field="checkOut" />
          </>
        )}

        {type === "TRANSFER" && (
          <>
            <Text style={{ fontWeight: "500", marginBottom: 8 }}>Transfer Type</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
              {(["SHARED", "PRIVATE", "OTHER"] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTransferType(t)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    backgroundColor: transferType === t ? "#000" : "#f2f2f2",
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: transferType === t ? "#fff" : "#000" }}>
                    {t.charAt(0) + t.slice(1).toLowerCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <DateTimeButton label="Airport pickup time" value={airportDepartureDateTime} field="airportDepartureDateTime" />
            <DateTimeButton label="Hotel pickup time" value={hotelDepartureDateTime} field="hotelDepartureDateTime" />
          </>
        )}

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={saving}
          style={{
            backgroundColor: "#000",
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 8,
            marginBottom: 20,
            opacity: saving ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            {saving ? "Saving..." : isEditing ? "Update" : "Save"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date/Time Picker */}
      {activePicker && (
        <View>
          {Platform.OS === "ios" && (
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
              <TouchableOpacity onPress={() => setActivePicker(null)}>
                <Text style={{ color: "#666" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmIOSPicker}>
                <Text style={{ color: "#007AFF", fontWeight: "600" }}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
          <DateTimePicker
            value={tempDate}
            mode={Platform.OS === "ios" ? "datetime" : pickerMode}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        </View>
      )}
    </View>
  );
}

const inputStyle = {
  height: 44,
  backgroundColor: "#f2f2f2",
  borderRadius: 8,
  paddingHorizontal: 12,
  marginBottom: 12,
};
