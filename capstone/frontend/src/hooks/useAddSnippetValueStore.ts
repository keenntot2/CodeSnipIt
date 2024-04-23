import { create } from "zustand";

interface Errors {
  title: boolean;
  code: boolean;
}

interface AddSnippetValueStore {
  titleValue: string;
  codeValue: string;
  errors: Errors;
  setTitleError: (error: boolean) => void;
  setCodeError: (error: boolean) => void;
  setTitle: (title: string) => void;
  setCode: (code: string) => void;
  reset: () => void;
}

const useAddSnippetValueStore = create<AddSnippetValueStore>((set) => ({
  titleValue: "",
  codeValue: "",
  errors: { title: false, code: false },
  setTitleError: (error) =>
    set((state) => ({ errors: { ...state.errors, title: error } })),
  setCodeError: (error) =>
    set((state) => ({ errors: { ...state.errors, code: error } })),
  setTitle: (title) => set({ titleValue: title }),
  setCode: (code) => set({ codeValue: code }),
  reset: () =>
    set({
      titleValue: "",
      codeValue: "",
      errors: { title: false, code: false },
    }),
}));

export default useAddSnippetValueStore;
