export interface TimelineItem {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  title: string;
  description?: string;
  visibility: "guest" | "organizer";
}