import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRole } from "../../hooks/useRole";

interface Props {
  tripId: string;
  onClose: () => void;
  onUploaded: (doc: {
    id: string;
    fileName: string;
    visibility: "SHARED" | "PRIVATE";
  }) => void;
}

export default function UploadDocumentSheet({
  onClose,
  onUploaded,
}: Props) {
  const { isOrganizer } = useRole();
  const [visibility, setVisibility] =
    useState<"SHARED" | "PRIVATE">("PRIVATE");

  const handleUpload = () => {
    // Placeholder upload
    onUploaded({
      id: Math.random().toString(),
      fileName: "placeholder.pdf",
      visibility: isOrganizer ? visibility : "PRIVATE",
    });

    onClose();
  };

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Upload a document
      </Text>

      {/* Visibility selector — organizer only */}
      {isOrganizer ? (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: "500", marginBottom: 8 }}>
            Visibility
          </Text>

          <Pressable
            onPress={() => setVisibility("SHARED")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Ionicons
              name={
                visibility === "SHARED"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={18}
              color="#000"
              style={{ marginRight: 8 }}
            />
            <Text>Shared with guests</Text>
          </Pressable>

          <Pressable
            onPress={() => setVisibility("PRIVATE")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons
              name={
                visibility === "PRIVATE"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={18}
              color="#000"
              style={{ marginRight: 8 }}
            />
            <Text>Private (only you)</Text>
          </Pressable>

          <Text style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
            Shared documents are visible to all guests on this trip.
          </Text>
        </View>
      ) : (
        <Text style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>
          Documents you upload are private and only visible to you.
        </Text>
      )}

      {/* File picker placeholder */}
      <View
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#f2f2f2",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Ionicons
          name="cloud-upload-outline"
          size={24}
          color="#666"
          style={{ marginBottom: 6 }}
        />
        <Text>Choose file</Text>
        <Text style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
          File uploads coming soon
        </Text>
      </View>

      {/* Actions */}
      <Pressable
        onPress={handleUpload}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#000",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Upload document
        </Text>
      </Pressable>

      <Pressable
        onPress={onClose}
        style={{ marginTop: 12, alignItems: "center" }}
      >
        <Text style={{ color: "#666" }}>Cancel</Text>
      </Pressable>
    </View>
  );
}