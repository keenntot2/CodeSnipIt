import { create } from "zustand";
import fetchAllResponse from "../entities/FetchAllResponse";
import { Snippet } from "./useAddSnippet";
import { VariablesProp } from "./useDeleteSnippet";

interface SnippetListStore {
  snippets: fetchAllResponse<Snippet>;
  addSnippets: (data: fetchAllResponse<Snippet>) => void;
  updateSnippet: (data: Snippet) => void;
  deleteSnippet: (snippet: VariablesProp) => void;
}

const useSnippetListStore = create<SnippetListStore>((set) => ({
  snippets: {} as fetchAllResponse<Snippet>,
  isSuccess: false,
  addSnippets: (data) => set({ snippets: data }),
  updateSnippet: (data) =>
    set((state) => ({
      snippets: {
        ...state.snippets,
        results: state.snippets.results.map((s) => {
          if (s.slug === data.slug) {
            return data;
          }
          return s;
        }),
      },
    })),
  deleteSnippet: (snippet) =>
    set((state) => ({
      snippets: {
        ...state.snippets,
        results: state.snippets.results.filter((s) => s.slug != snippet.slug),
        count: state.snippets.count - 1,
      },
    })),
}));

export default useSnippetListStore;
