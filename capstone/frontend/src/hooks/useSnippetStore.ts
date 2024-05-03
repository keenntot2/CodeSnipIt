import { create } from "zustand";
import { Snippet } from "./useAddSnippet";
import { PatchSnippetMutate } from "./usePatchSnippet";

interface SnippetStore {
  snippet: Snippet | undefined;
  setSnippet: (snippet: Snippet | undefined) => void;
  updateSnippet: (editedSnippet: PatchSnippetMutate) => void;
}

const useSnippetStore = create<SnippetStore>((set) => ({
  snippet: undefined,
  setSnippet: (snippet) => set({ snippet: snippet }),
  updateSnippet: (editedSnippet) =>
    set((state) => ({
      snippet: {
        ...(state.snippet || ({} as Snippet)),
        title: editedSnippet.title,
        code: editedSnippet.code,
      },
    })),
}));

export default useSnippetStore;
