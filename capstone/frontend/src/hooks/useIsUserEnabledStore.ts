import { create } from "zustand";

interface UseIsUserEnabledStore {
  isEnabled: boolean;
  setIsEnabled: (bool: boolean) => void;
}

const useIsUserEnabledStore = create<UseIsUserEnabledStore>((set) => ({
  isEnabled: true,
  setIsEnabled: (bool) => set({ isEnabled: bool }),
}));

export default useIsUserEnabledStore;
