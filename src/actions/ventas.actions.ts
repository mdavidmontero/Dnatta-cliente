import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CategoriasProductosSchema, SaleOrder } from "../types";

export const getProductByCategory = async (slug: string) => {
  try {
    const { data } = await api.get(`/ventas/${slug}`);
    const response = CategoriasProductosSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};

export const createOrder = async (formData: SaleOrder) => {
  try {
    const { data } = await api.post("/ventas/create-order", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};
