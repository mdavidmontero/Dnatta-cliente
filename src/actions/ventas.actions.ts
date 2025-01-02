import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  CashRegister,
  CategoriasProductosSchema,
  SaleOrder,
  TotalAmountResponse,
} from "../types";
import { CashregisterSchema } from "../types/schemas/cash";
import { PosVentaDaySchema } from "@/types/schemas/ventas";

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

export const getPostVentas = async (
  page: number = 1,
  limit: number = 10,
  pointId: number
) => {
  try {
    const { data } = await api.get(`/ventas/post-ventas/dia`, {
      params: {
        page: page,
        limit: limit,
        pointId: +pointId,
      },
    });
    const response = PosVentaDaySchema.safeParse(data);
    console.log(response.success);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};

export const deleteVenta = async (id: number) => {
  try {
    const { data } = await api.delete(`/ventas/${id}`);
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

export const cashClosed = async ({
  cashId,
  formData,
}: {
  cashId: number;
  formData: CashRegister;
}) => {
  try {
    const { data } = await api.put(`/ventas/closed-cash/${cashId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
    throw new Error("Unexpected error occurred");
  }
};

export const statusCashRegister = async (userId: number, pointId: number) => {
  try {
    const { data } = await api.get(
      `/ventas/status/cash/?userId=${userId}&pointId=${pointId}`
    );
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

export const getCashDay = async (cashId: number) => {
  try {
    const { data } = await api.get(`/ventas/cash/${cashId}`);
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

export const getCashDayTotalAmount = async (
  userId: number,
  pointId: number
) => {
  try {
    const { data } = await api.get(
      `/ventas/total-cash/vendedora/?userId=${userId}&pointId=${pointId}`
    );

    const response = TotalAmountResponse.safeParse(data);
    if (response.success) {
      return response.data;
    }
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};
