import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const CATEGORIES: { id: string; label: string; icon: ImageSourcePropType }[] = [
  { id: "honeymoon", label: "Honeymoon", icon: require("../../../assets/icons/honeymoon.png") },
  { id: "family", label: "Family Holiday", icon: require("../../../assets/icons/family-holiday.png") },
  { id: "group", label: "Group Trip", icon: require("../../../assets/icons/group-trip.png") },
  { id: "travel", label: "Solo Travel", icon: require("../../../assets/icons/travel.png") },
];

const HOT_DESTINATIONS = [
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
];

const EXPLORE_TABS = ["Where to shop", "What to do", "Where to stay"];

const SHOPPING_SPOTS = [
  {
    id: "orchard",
    name: "Orchard Road",
    category: "Luxury Shopping",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400",
  },
  {
    id: "mbs",
    name: "Marina Bay Sands",
    category: "Premium Mall",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=400",
  },
  {
    id: "bugis",
    name: "Bugis Street",
    category: "Street Market",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555529669-2269763671c0?w=400",
  },
  {
    id: "chinatown",
    name: "Chinatown Market",
    category: "Local Finds",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
  },
];

const ACTIVITIES = [
  {
    id: "gardens",
    name: "Gardens by the Bay",
    category: "Nature & Parks",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=400",
  },
  {
    id: "night-safari",
    name: "Night Safari",
    category: "Wildlife Experience",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400",
  },
  {
    id: "zoo",
    name: "Singapore Zoo",
    category: "Wildlife",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=400",
  },
  {
    id: "sentosa",
    name: "Sentosa Island",
    category: "Beach & Fun",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
];

const ACCOMMODATIONS = [
  {
    id: "mbs-hotel",
    name: "Marina Bay Sands",
    category: "Luxury Hotel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
  },
  {
    id: "raffles",
    name: "Raffles Hotel",
    category: "Heritage Luxury",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
  },
  {
    id: "capella",
    name: "Capella Singapore",
    category: "Resort",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
  },
  {
    id: "fullerton",
    name: "The Fullerton",
    category: "Boutique Hotel",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
  },
];

export default function ExploreHome() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);

  const getTabData = () => {
    switch (activeTab) {
      case 0:
        return SHOPPING_SPOTS;
      case 1:
        return ACTIVITIES;
      case 2:
        return ACCOMMODATIONS;
      default:
        return SHOPPING_SPOTS;
    }
  };

  const renderPlaceCard = (place: {
    id: string;
    name: string;
    category: string;
    rating: number;
    image: string;
  }) => (
    <TouchableOpacity
      key={place.id}
      style={styles.placeCard}
      activeOpacity={0.9}
    >
      <Image source={{ uri: place.image }} style={styles.placeCardImage} />
      <View style={styles.placeCardInfo}>
        <View style={styles.placeCardHeader}>
          <Text style={styles.placeCardName} numberOfLines={1}>
            {place.name}
          </Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#F5721A" />
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
        </View>
        <Text style={styles.placeCardCategory}>{place.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + 12 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Plan your <Text style={styles.headerAccent}>dream</Text> trip
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Find your next adventure"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryItem}>
            <View style={styles.categoryIconContainer}>
              <Image source={cat.icon} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hot Right Now */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Hot right now</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllDestinations")}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hotCardsContainer}
      >
        {HOT_DESTINATIONS.map((dest) => (
          <TouchableOpacity
            key={dest.id}
            style={styles.hotCard}
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("DestinationDetail", {
                id: dest.id,
                title: dest.title,
              })
            }
          >
            <Image source={{ uri: dest.image }} style={styles.hotCardImage} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={styles.hotCardGradient}
            />
            <View style={styles.hotCardContent}>
              <View style={styles.locationBadge}>
                <Ionicons name="location-outline" size={12} color="#fff" />
                <Text style={styles.locationText}>{dest.location}</Text>
              </View>
              <Text style={styles.hotCardTitle} numberOfLines={2}>
                {dest.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Explore Singapore */}
      <Text style={[styles.sectionTitle, { marginTop: 28, marginBottom: 12 }]}>
        Explore Singapore
      </Text>

      <View style={styles.tabsContainer}>
        {EXPLORE_TABS.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(index)}
            style={styles.tabItem}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
            {activeTab === index && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContentScroll}
        key={activeTab}
      >
        {getTabData().map(renderPlaceCard)}
      </ScrollView>

      {/* Wedding Bridge */}
      <View style={styles.weddingBridge}>
        <Text style={styles.weddingTitle}>
          Planning a destination wedding?
        </Text>
        <Text style={styles.weddingSubtitle}>Explore real weddings.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  headerAccent: {
    color: "#F5721A",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 28,
  },
  categoryItem: {
    alignItems: "center",
    width: 90,
  },
  categoryIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  categoryLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  viewAll: {
    fontSize: 14,
    color: "#F5721A",
    fontWeight: "500",
  },
  hotCardsContainer: {
    paddingRight: 16,
  },
  hotCard: {
    width: 170,
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 14,
    backgroundColor: "#f0f0f0",
  },
  hotCardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  hotCardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  hotCardContent: {
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
  hotCardTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabItem: {
    marginRight: 24,
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 14,
    color: "#999",
  },
  tabTextActive: {
    color: "#F5721A",
    fontWeight: "600",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#F5721A",
    borderRadius: 1,
  },
  tabContentScroll: {
    paddingVertical: 16,
    paddingRight: 16,
  },
  placeCard: {
    width: 200,
    marginRight: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  placeCardImage: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
  },
  placeCardInfo: {
    padding: 12,
  },
  placeCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  placeCardName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5EE",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F5721A",
    marginLeft: 3,
  },
  placeCardCategory: {
    fontSize: 12,
    color: "#666",
  },
  weddingBridge: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    marginBottom: 40,
  },
  weddingTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1a1a1a",
  },
  weddingSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});