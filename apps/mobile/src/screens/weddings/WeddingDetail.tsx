import { View, Text, ScrollView, Modal } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useMemo } from "react";
import { useSavedStore } from "../../store/useSavedStore";
import { useAnonymousSession } from "../../hooks/useAnonymousSession";
import ContactSheet from "../../components/sheets/ContactSheet";
import { SavedItem } from "@dp-app/types";

export default function WeddingDetail() {
  const route = useRoute<any>();
  const { id, title } = route.params;

  const { sessionId } = useAnonymousSession();
  const { saveItem, removeItem, isSaved } = useSavedStore();
  const [showContact, setShowContact] = useState(false);

  const saved = isSaved(id);

  const savedItem: SavedItem = useMemo(
    () => ({
      id,
      type: "wedding",
      title,
      savedAt: new Date().toISOString(),
    }),
    [id, title]
  );

  const toggleSave = async () => {
    saved ? await removeItem(id) : await saveItem(savedItem);
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            height: 300,
            backgroundColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Wedding Gallery</Text>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 12 }}>
            {title}
          </Text>

          <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 24 }}>
            A thoughtfully executed celebration focused on experience, flow,
            and guest comfort — handled end to end by our team.
          </Text>

          <Detail label="Destination">Italy</Detail>
          <Detail label="Guest Count">48 guests</Detail>
          <Detail label="Events Covered">
            Welcome dinner, ceremony, reception, farewell brunch
          </Detail>

          <ActionCard onPress={toggleSave}>
            <Text>{saved ? "❤️ Saved" : "🤍 Save"}</Text>
          </ActionCard>

          <PrimaryCTA onPress={() => setShowContact(true)}>
            Plan something like this
          </PrimaryCTA>
        </View>
      </ScrollView>

      <ContactModal
        visible={showContact}
        onClose={() => setShowContact(false)}
      >
        <ContactSheet
          interestType="wedding"
          interestTitle={title}
          anonymousSessionId={sessionId!}
          onClose={() => setShowContact(false)}
        />
      </ContactModal>
    </>
  );
}

/* helpers */

function Detail({ label, children }: any) {
  return (
    <>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
        {label}
      </Text>
      <Text style={{ marginBottom: 20 }}>{children}</Text>
    </>
  );
}

function ActionCard({ children, onPress }: any) {
  return (
    <View
      onTouchEnd={onPress}
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      {children}
    </View>
  );
}

function PrimaryCTA({ children, onPress }: any) {
  return (
    <View
      onTouchEnd={onPress}
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#000",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "600" }}>{children}</Text>
    </View>
  );
}

function ContactModal({ visible, onClose, children }: any) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        onTouchEnd={onClose}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <View onTouchEnd={(e) => e.stopPropagation()}>{children}</View>
      </View>
    </Modal>
  );
}