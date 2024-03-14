import { create } from "zustand";
import { User } from "./useUser";

interface UserStore {
  user: User;
  setUser: (data: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {} as User,
  setUser: (data) => set(() => ({ user: data })),
}));

export default useUserStore;
