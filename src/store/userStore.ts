import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PointStore {
  point: number;
  setPoint: (point: number) => void;
}
export const useStorePoint = create<PointStore>()(
  persist(
    (set) => ({
      point: 0,
      setPoint: (point) => set({ point }),
    }),
    {
      name: "point-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
