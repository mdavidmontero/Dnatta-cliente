import { create } from "zustand";
import { OrderItem, ProductI } from "../types";
import { openDrawerCash } from "@/actions/ventas.actions";

interface Store {
  order: OrderItem[];
  addToOrder: (product: ProductI) => void;
  increaseQuantity: (id: ProductI["id"]) => void;
  decreaseQuantity: (id: ProductI["id"]) => void;
  removeItem: (id: ProductI["id"]) => void;
  filtro: (value: ProductI["name"]) => void;
  clearOrder: () => void;
  openCashDrawer: () => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  order: [],

  addToOrder: (product) => {
    const { ...data } = product;
    let order: OrderItem[] = [];
    if (get().order.find((item) => item.id === product.id)) {
      order = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      );
    } else {
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }
    set(() => ({
      order,
    }));
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
    const order = get().order.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1),
          }
        : item
    );

    set(() => ({
      order,
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },

  filtro: (value) => {
    set((state) => ({
      order: state.order.filter((item) => item.name.includes(value)),
    }));
  },
  clearOrder: () => {
    set(() => ({
      order: [],
    }));
  },
  openCashDrawer: async () => {
    await openDrawerCash();
  },
}));
