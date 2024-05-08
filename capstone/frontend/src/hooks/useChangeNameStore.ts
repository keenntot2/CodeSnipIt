import { create } from "zustand";

interface ChangeNameStore {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const useChangeNameStore = create<ChangeNameStore>((set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value) => set({ firstName: value }),
  setLastName: (value) => set({ lastName: value }),
}));

export default useChangeNameStore;
