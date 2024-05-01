import { create } from "zustand";

export interface LanguageSlugParams {
  languageSlug?: string;
  snippetSlug?: string;
}

interface IsEditStore {
  isEdit: boolean;
  slug: LanguageSlugParams;
  setIsEdit: (bool: boolean) => void;
  setSlug: (slug: LanguageSlugParams) => void;
}

const useIsEditStore = create<IsEditStore>((set) => ({
  isEdit: false,
  slug: { languageSlug: "", snippetSlug: "" },
  setIsEdit: (bool) => set({ isEdit: bool }),
  setSlug: (slug) => set({ slug: slug }),
}));

export default useIsEditStore;
