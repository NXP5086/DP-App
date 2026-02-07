export type ContactMethod = "whatsapp" | "call" | "email";

export interface ContactRequestPayload {
  name: string;
  contactMethod: ContactMethod;
  note?: string;
  interestType: "destination" | "wedding" | "saved";
  interestTitle: string;
  anonymousSessionId: string;
}