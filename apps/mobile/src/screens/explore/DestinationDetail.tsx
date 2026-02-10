import {
  View,
  Text,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  // ...existing code...
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useMemo, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSavedStore } from "../../store/useSavedStore";
import { useAnonymousSession } from "../../hooks/useAnonymousSession";
import ContactSheet from "../../components/sheets/ContactSheet";
//import { SavedItem } from "@dp-app/types";

const { width } = Dimensions.get("window");

const DESTINATION_DATA: Record<
  string,
  { images: string[]; location: string; rating: number; duration: string; description: string }
> = {
  kenya: {
    images: [
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
    ],
    location: "Kenya, Africa",
    rating: 4.9,
    duration: "7-10 days",
    description:
      "Experience the magic of Kenya with unforgettable safari adventures and pristine beaches. Witness the Great Migration, explore Maasai Mara, and unwind on the stunning coastline of Diani Beach.",
  },
  rajasthan: {
    images: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
      "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800",
    ],
    location: "India",
    rating: 4.8,
    duration: "10-14 days",
    description:
      "Discover the royal heritage of Rajasthan with its magnificent palaces, vibrant culture, and warm hospitality. Then escape to the turquoise waters of the Andaman Islands for a romantic beach retreat.",
  },
  bali: {
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800",
    ],
    location: "Indonesia",
    rating: 4.9,
    duration: "7-10 days",
    description:
      "Bali offers a perfect blend of spiritual tranquility, lush rice terraces, ancient temples, and world-class beaches. Ideal for couples seeking romance and adventure.",
  },
  maldives: {
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800",
      "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=800",
    ],
    location: "Maldives",
    rating: 5.0,
    duration: "5-7 days",
    description:
      "The ultimate luxury escape with overwater villas, crystal-clear lagoons, and pristine coral reefs. Perfect for honeymooners and those seeking pure relaxation.",
  },
  santorini: {
    images: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69acdd5?w=800",
      "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
    ],
    location: "Greece",
    rating: 4.9,
    duration: "4-6 days",
    description:
      "The iconic whitewashed buildings and blue domes of Santorini create the perfect romantic backdrop. Enjoy stunning sunsets, local wines, and Mediterranean cuisine.",
  },
  paris: {
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800",
      "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800",
    ],
    location: "France",
    rating: 4.8,
    duration: "4-6 days",
    description:
      "The City of Light awaits with its iconic landmarks, world-class museums, charming cafés, and romantic ambiance. A timeless destination for lovers.",
  },
  dubai: {
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800",
      "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=800",
    ],
    location: "UAE",
    rating: 4.7,
    duration: "4-6 days",
    description:
      "Experience the height of luxury in Dubai with stunning architecture, world-class shopping, desert adventures, and pristine beaches.",
  },
  thailand: {
    images: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800",
    ],
    location: "Thailand",
    rating: 4.8,
    duration: "10-14 days",
    description:
      "From the bustling streets of Bangkok to the serene beaches of Phuket and Krabi, Thailand offers incredible diversity, rich culture, and unforgettable experiences.",
  },
  japan: {
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    ],
    location: "Japan",
    rating: 4.9,
    duration: "10-14 days",
    description:
      "Discover ancient temples, cutting-edge technology, serene gardens, and exquisite cuisine. Japan is a feast for the senses in every season.",
  },
  newzealand: {
    images: [
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800",
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800",
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=800",
      "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=800",
    ],
    location: "New Zealand",
    rating: 4.9,
    duration: "10-14 days",
    description:
      "Adventure awaits in the land of the long white cloud. From dramatic fjords to rolling hills, New Zealand offers breathtaking landscapes at every turn.",
  },
};

const DEFAULT_DATA = {
  images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"],
  location: "Destination",
  rating: 4.5,
  duration: "5-7 days",
  description:
    "A thoughtfully curated destination offering culture, comfort, and memorable experiences — ideal for travelers who value ease and quality.",
};

export default function DestinationDetail() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { id, title } = route.params;

  const destinationInfo = DESTINATION_DATA[id] || DEFAULT_DATA;

  const { sessionId } = useAnonymousSession();
  const { saveItem, removeItem, isSaved } = useSavedStore();
  const [showContact, setShowContact] = useState(false);

  // ...existing code...

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

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveImageIndex(slideIndex);
  };

  // ...existing code...

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Image Carousel */}
        <View style={styles.heroContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {destinationInfo.images.map((imageUri, index) => (
              <View key={index} style={styles.carouselSlide}>
                <Image source={{ uri: imageUri }} style={styles.heroImage} />
              </View>
            ))}
          </ScrollView>

          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent", "rgba(0,0,0,0.6)"]}
            style={styles.heroGradient}
            pointerEvents="none"
          />

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {destinationInfo.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  activeImageIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          {/* Back Button (fixed) */}
          <View
            style={[styles.backButton, { top: insets.top + 10, position: "absolute" }]}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Save Button (fixed) */}
          <View
            style={[styles.saveButton, { top: insets.top + 10, position: "absolute" }]}
          >
            <TouchableOpacity
              onPress={toggleSave}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={saved ? "heart" : "heart-outline"}
                size={24}
                color={saved ? "#F5721A" : "#fff"}
              />
            </TouchableOpacity>
          </View>

          {/* Image Counter */}
          <View style={[styles.imageCounter, { top: insets.top + 16 }]}>
            <Text style={styles.imageCounterText}>
              {activeImageIndex + 1}/{destinationInfo.images.length}
            </Text>
          </View>

          {/* Hero Content */}
          <View style={styles.heroContent}>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#fff" />
              <Text style={styles.locationText}>{destinationInfo.location}</Text>
            </View>
            <Text style={styles.heroTitle}>{title}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={16} color="#F5721A" />
                <Text style={styles.statText}>{destinationInfo.rating}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="#fff" />
                <Text style={styles.statText}>{destinationInfo.duration}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{destinationInfo.description}</Text>
          </View>

          {/* Highlights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            <View style={styles.highlightsGrid}>
              <HighlightItem icon="camera-outline" text="Iconic Sights" />
              <HighlightItem icon="restaurant-outline" text="Great Food" />
              <HighlightItem icon="map-outline" text="Easy Logistics" />
              <HighlightItem icon="heart-outline" text="Romantic" />
            </View>
          </View>

          {/* Best For */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best For</Text>
            <View style={styles.tagsContainer}>
              <Tag text="Honeymoons" />
              <Tag text="Couples" />
              <Tag text="Short Breaks" />
              <Tag text="Relaxation" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed CTA */}
      <View style={[styles.ctaContainer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => setShowContact(true)}
          activeOpacity={0.9}
        >
          <Text style={styles.ctaText}>Plan this trip with us</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ContactModal visible={showContact} onClose={() => setShowContact(false)}>
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

/* Helper Components */

function HighlightItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.highlightItem}>
      <View style={styles.highlightIcon}>
        <Ionicons name={icon as any} size={22} color="#F5721A" />
      </View>
      <Text style={styles.highlightText}>{text}</Text>
    </View>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

function ContactModal({ visible, onClose, children }: any) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        onTouchEnd={onClose}
        style={styles.modalOverlay}
      >
        <View onTouchEnd={(e) => e.stopPropagation()}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroContainer: {
    height: 380,
    position: "relative",
  },
  carouselSlide: {
    width: width,
    height: 380,
  },
  heroImage: {
    width: width,
    height: 380,
    resizeMode: "cover",
  },
  heroGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  paginationContainer: {
     position: "absolute",
     left: undefined,
     right: 24,
     top: 320,
     flexDirection: "row",
     justifyContent: "flex-end",
     alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 24,
  },
  imageCounter: {
    position: "absolute",
    right: 70,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCounterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 4,
    opacity: 0.9,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 32,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 12,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
  },
  highlightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  highlightItem: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  highlightIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF5EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  highlightText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  ctaContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  ctaButton: {
    backgroundColor: "#F5721A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});