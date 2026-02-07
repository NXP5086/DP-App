import { create } from "zustand";
import { TripDocument } from "@dp-app/types";

interface DocumentsState {
  documents: TripDocument[];
  addDocument: (doc: TripDocument) => void;
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: [
    {
      id: "welcome-pdf",
      fileName: "Welcome Guide.pdf",
      uploadedBy: "organizer",
      createdAt: new Date().toISOString(),
    },
  ],

  addDocument: (doc) =>
    set({
      documents: [...get().documents, doc],
    }),
}));