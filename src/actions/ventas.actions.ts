import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CashRegister, CategoriasProductosSchema, SaleOrder } from "../types";
import { CashregisterSchema } from "../types/schemas/cash";

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

export const cashRegister = async (formData: CashRegister) => {
  try {
    const { data } = await api.post("/ventas/cash-register", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};

export const statusCashRegister = async (userId: number, pointId: number) => {
  try {
    const { data } = await api.get(
      `/ventas/status/cash/?userId=${userId}&pointId=${pointId}`
    );
    console.log(data);
    const response = CashregisterSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};

export const statusCashRegisterOneClosed = async (
  userId: number,
  pointId: number
) => {
  try {
    const { data } = await api.get(
      `/ventas/status/cash/?userId=${userId}&pointId=${pointId}`
    );
    console.log(data);
    const response = CashregisterSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};
