export type SavedItemType =
  | "destination"
  | "wedding"
  | "weddingDestination";

export interface SavedItem {
  id: string;
  type: SavedItemType;
  title: string;
  imageUrl?: string; // placeholder for later
  savedAt: string;
}