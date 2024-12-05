import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Point, PointSchema, PointSchemI, PointsI } from "../types";

export const getPoint = async (id: Point["id"]) => {
  try {
    const { data } = await api.get(`/points/point/${id}`);
    const response = PointSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch points");
    }
  }
};

export const createPoint = async (formData: PointsI) => {
  try {
    const { data } = await api.post<string>("/points/create-point", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch points");
    }
  }
};
type ProductPointApiType = {
  formData: PointsI;
  pointId: Point["id"];
};

export const updatePoint = async ({
  formData,
  pointId,
}: ProductPointApiType) => {
  try {
    const { data } = await api.patch<string>(
      `/points/update-point/${pointId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch points");
    }
  }
};

export const deletePoint = async (id: Point["id"]) => {
  try {
    const { data } = await api.delete(`/points/delete-point/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch points");
    }
  }
};

export const getPoints = async () => {
  try {
    const { data } = await api.get("/points");
    const response = PointSchemI.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch points");
    }
  }
};
