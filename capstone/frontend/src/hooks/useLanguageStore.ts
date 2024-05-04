import { create } from "zustand";

interface LanguageStore {
  language: string;
  setLanguage: (language: string) => void;
}

const useLanguageStore = create<LanguageStore>((set) => ({
  language: "",
  setLanguage: (language) => set({ language: language }),
}));

export default useLanguageStore;
