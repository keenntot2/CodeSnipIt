import { create } from "zustand";
import fetchAllResponse from "../entities/FetchAllResponse";
import { Snippet } from "./useAddSnippet";

interface SnippetListStore {
  snippets: fetchAllResponse<Snippet>;
  addSnippets: (data: fetchAllResponse<Snippet>) => void;
  updateSnippet: (data: Snippet) => void;
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
}));

export default useSnippetListStore;
