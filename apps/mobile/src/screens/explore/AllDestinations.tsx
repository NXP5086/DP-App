import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const ALL_DESTINATIONS = [
  {
    id: "kenya",
    title: "Kenya Safari And Beach Honeymoon",
    location: "Kenya",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600",
  },
  {
    id: "rajasthan",
    title: "Romance in Rajasthan & the Andaman Islands",
    location: "India",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600",
  },
  {
    id: "bali",
    title: "Tropical Escape to Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
  },
  {
    id: "maldives",
    title: "Luxury Maldives Retreat",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
  },
  {
    id: "santorini",
    title: "Santorini Romance Getaway",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600",
  },
  {
    id: "paris",
    title: "Parisian Dream Escape",
    location: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
  },
  {
    id: "dubai",
    title: "Dubai Luxury Experience",
    location: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
  },
  {
    id: "thailand",
    title: "Thailand Island Hopping",
    location: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600",
  },
  {
    id: "japan",
    title: "Japan Cherry Blossom Tour",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
  },
  {
    id: "newzealand",
    title: "New Zealand Adventure",
    location: "New Zealand",
    image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600",
  },
];

export default function AllDestinations() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hot Right Now</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>
          Discover our most popular destinations
        </Text>

        <View style={styles.grid}>
          {ALL_DESTINATIONS.map((dest) => (
            <TouchableOpacity
              key={dest.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("DestinationDetail", {
                  id: dest.id,
                  title: dest.title,
                })
              }
            >
              <Image source={{ uri: dest.image }} style={styles.cardImage} />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.cardGradient}
              />
              <View style={styles.cardContent}>
                <View style={styles.locationBadge}>
                  <Ionicons name="location-outline" size={12} color="#fff" />
                  <Text style={styles.locationText}>{dest.location}</Text>
                </View>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {dest.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "500",
    marginLeft: 4,
    opacity: 0.9,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
});
