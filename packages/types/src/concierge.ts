export type ConciergeSender = "guest" | "concierge";

export interface ConciergeMessage {
  id: string;
  sender: ConciergeSender;
  body: string;
  createdAt: string;
}