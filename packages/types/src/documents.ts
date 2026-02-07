export type DocumentUploader = "guest" | "organizer";

export interface TripDocument {
  id: string;
  fileName: string;
  uploadedBy: DocumentUploader;
  createdAt: string;
}