import { View, Text, ScrollView, Modal } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useMemo } from "react";
import { useSavedStore } from "../../store/useSavedStore";
import { useAnonymousSession } from "../../hooks/useAnonymousSession";
import ContactSheet from "../../components/sheets/ContactSheet";
import { SavedItem } from "@dp-app/types";

export default function DestinationDetail() {
  const route = useRoute<any>();
  const { id, title } = route.params;

  const { sessionId } = useAnonymousSession();
  const { saveItem, removeItem, isSaved } = useSavedStore();
  const [showContact, setShowContact] = useState(false);

  const saved = isSaved(id);

  const savedItem: SavedItem = useMemo(
    () => ({
      id,
      type: "destination",
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
        {/* Hero */}
        <View
          style={{
            height: 280,
            backgroundColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Hero Image</Text>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 12 }}>
            {title}
          </Text>

          <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 24 }}>
            A thoughtfully curated destination offering culture, comfort, and
            memorable experiences — ideal for travelers who value ease and
            quality.
          </Text>

          <Section title="Highlights">
            • Iconic sights{"\n"}• Great food{"\n"}• Easy logistics
          </Section>

          <Section title="Ideal Duration">4–6 days</Section>

          <Section title="Best For">
            Honeymoons, short breaks, relaxed exploration
          </Section>

          <ActionCard onPress={toggleSave}>
            <Text>{saved ? "❤️ Saved" : "🤍 Save"}</Text>
          </ActionCard>

          <PrimaryCTA onPress={() => setShowContact(true)}>
            Plan this trip with us
          </PrimaryCTA>
        </View>
      </ScrollView>

      <ContactModal
        visible={showContact}
        onClose={() => setShowContact(false)}
      >
        <ContactSheet
          interestType="destination"
          interestTitle={title}
          anonymousSessionId={sessionId!}
          onClose={() => setShowContact(false)}
        />
      </ContactModal>
    </>
  );
}

/* helpers */

function Section({ title, children }: any) {
  return (
    <>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
        {title}
      </Text>
      <Text style={{ marginBottom: 24 }}>{children}</Text>
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