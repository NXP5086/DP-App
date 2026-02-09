import { View, Text, FlatList, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRole } from "../../hooks/useRole";
import UploadDocumentSheet from "./UploadDocumentSheet";

/**
 * Temporary document type (until real files are wired)
 */
interface DocumentItem {
  id: string;
  fileName: string;
  visibility: "SHARED" | "PRIVATE";
}

export default function TripDocuments({ trip }: any) {
  const { isOrganizer } = useRole();

  const [showUpload, setShowUpload] = useState(false);

  /**
   * TEMP — replace with API later
   */
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <View style={{ padding: 20, flex: 1 }}>
        {/* Upload CTA */}
        <Pressable
          onPress={() => setShowUpload(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 14,
            borderRadius: 12,
            backgroundColor: "#3B82F6",
            marginBottom: 20,
            shadowColor: "#3B82F6",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Ionicons name="cloud-upload-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
            Upload Document
          </Text>
        </Pressable>

        {/* Empty state */}
        {documents.length === 0 ? (
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
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Ionicons name="folder-open-outline" size={44} color="#D1D5DB" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#111", marginBottom: 8, textAlign: "center" }}>
              No Documents Yet
            </Text>
            <Text style={{ fontSize: 14, color: "#6B7280", textAlign: "center", lineHeight: 22 }}>
              Upload itineraries, tickets, reservations, and other important travel documents to keep everything in one place.
            </Text>
          </View>
        ) : (
          <FlatList
            data={documents}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: "#fff",
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: "#EFF6FF",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                  }}
                >
                  <Ionicons
                    name="document-text"
                    size={22}
                    color="#3B82F6"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "600", fontSize: 15, color: "#111" }}>
                    {item.fileName}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 4,
                    }}
                  >
                    <Ionicons
                      name={
                        item.visibility === "SHARED"
                          ? "people-outline"
                          : "lock-closed-outline"
                      }
                      size={14}
                      color="#9CA3AF"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={{ fontSize: 13, color: "#9CA3AF" }}>
                      {item.visibility === "SHARED"
                        ? "Shared with guests"
                        : "Private"}
                    </Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              </View>
            )}
          />
        )}
      </View>

      {/* Upload sheet */}
      {showUpload && (
        <UploadDocumentSheet
          tripId={trip.id}
          onClose={() => setShowUpload(false)}
          onUploaded={(doc) =>
            setDocuments((prev) => [...prev, doc])
          }
        />
      )}
    </View>
  );
}