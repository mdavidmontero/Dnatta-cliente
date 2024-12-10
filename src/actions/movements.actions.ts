import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  MoneyCashDaySchemaI,
  MoneyCashDaySchemas,
  MovementSchema,
  MovementSchemaI,
  RegisterFormMoney,
  RegisterFormMovement,
} from "../types/schemas/movements";
import { Cash } from "../types/schemas/cash";

export const createMovement = async (formData: RegisterFormMovement) => {
  try {
    const { data } = await api.post(
      "/movements/cash-register-movement",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create movement");
    }
    throw error;
  }
};

export const getAllMovementsCashDay = async (cashId: Cash["id"]) => {
  try {
    const { data } = await api.get(`/movements/cash-details/${cashId}`);
    const response = MovementSchemaI.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to get movements");
    }
    throw error;
  }
};

type updateFormMovementType = {
  id: number;
  formData: RegisterFormMovement;
};

export const updateMovementByCash = async ({
  id,
  formData,
}: updateFormMovementType) => {
  try {
    const { data } = await api.put(`/movements/cash-movement/${id}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
    throw error;
  }
};

export const getMovementById = async (id: number) => {
  try {
    const { data } = await api.get(`/movements/cash-movement/${id}`);
    const response = MovementSchema.safeParse(data);
    console.log(response.data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
    throw error;
  }
};

export const registerMoneyInCash = async (formData: RegisterFormMoney) => {
  try {
    const { data } = await api.post(
      "/movements/register-money-in-cash",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
    throw error;
  }
};

export const getMoneyCashDay = async (cashId: MoneyCashDaySchemaI["id"]) => {
  try {
    const { data } = await api.get(`/movements/money-cash/${cashId}`);
    const response = MoneyCashDaySchemas.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};
