import { create } from "zustand";
import { Document, Message } from "./types";

interface AppState {
  document: Document | null;
  messages: Message[];
  setDocument: (doc: Document | null) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  document: null,
  messages: [],
  setDocument: (doc) => set({ document: doc }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
