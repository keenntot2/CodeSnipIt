import { create } from "zustand";
import { Snippet } from "./useAddSnippet";

interface SnippetStore {
  snippet: Snippet | undefined;
  setSnippet: (snippet: Snippet) => void;
}

const useSnippetStore = create<SnippetStore>((set) => ({
  snippet: undefined,
  setSnippet: (snippet) => set({ snippet: snippet }),
}));

export default useSnippetStore;
