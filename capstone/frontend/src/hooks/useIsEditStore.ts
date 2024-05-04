import { create } from "zustand";

export interface LanguageSlugParams {
  languageSlug?: string;
  snippetSlug?: string;
}

interface IsEditStore {
  isEdit: boolean;
  slug: LanguageSlugParams;
  prompt: boolean;
  setIsEdit: (bool: boolean) => void;
  setSlug: (slug: LanguageSlugParams) => void;
  setPrompt: (bool: boolean) => void;
}

const useIsEditStore = create<IsEditStore>((set) => ({
  isEdit: false,
  slug: { languageSlug: "", snippetSlug: "" },
  prompt: false,
  setIsEdit: (bool) => set({ isEdit: bool }),
  setSlug: (slug) => set({ slug: slug }),
  setPrompt: (bool) => set({ prompt: bool }),
}));

export default useIsEditStore;
