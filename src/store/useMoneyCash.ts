// src/store/moneyRegisterStore.ts
import { create } from "zustand";
import { RegisterFormMoney } from "../types/schemas/movements";

interface MoneyRegisterStore {
  denominations: RegisterFormMoney["denomination"];
  addDenomination: (denomination: RegisterFormMoney["denomination"][0]) => void;
  removeDenomination: (index: number) => void;
  resetDenominations: () => void;
}

export const useMoneyRegisterStore = create<MoneyRegisterStore>((set) => ({
  denominations: [],
  addDenomination: (denomination) =>
    set((state) => ({ denominations: [...state.denominations, denomination] })),
  removeDenomination: (index) =>
    set((state) => ({
      denominations: state.denominations.filter((_, i) => i !== index),
    })),
  resetDenominations: () => set({ denominations: [] }),
}));
