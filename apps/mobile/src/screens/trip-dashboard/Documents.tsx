import { View, Text } from "react-native";
import { useDocumentsStore } from "../../store/useDocumentsStore";
import { TripDocument } from "@dp-app/types";

export default function Documents() {
  const { documents, addDocument } = useDocumentsStore();

  const handleUpload = () => {
    // TEMP: file picker + backend later
    addDocument({
      id: Date.now().toString(),
      fileName: "My Document.pdf",
      uploadedBy: "guest",
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Upload */}
      <View
        onTouchEnd={handleUpload}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#000",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Upload Document
        </Text>
      </View>

      {/* List */}
      {documents.length === 0 ? (
        <Text>No documents shared yet.</Text>
      ) : (
        documents.map((doc) => <DocumentRow key={doc.id} doc={doc} />)
      )}
    </View>
  );
}

/* ---------- helpers ---------- */

function DocumentRow({ doc }: { doc: TripDocument }) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#f2f2f2",
        marginBottom: 12,
      }}
    >
      <Text style={{ fontWeight: "600" }}>{doc.fileName}</Text>
      <Text style={{ color: "#555", marginTop: 4 }}>
        Uploaded by {doc.uploadedBy}
      </Text>
    </View>
  );
}