import { create } from "zustand";
import { User } from "../types/index";

interface userStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const userAuthStore = create<userStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
