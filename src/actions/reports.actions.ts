import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ReportArraySchema } from "../types";
import { ResponseMesSchema } from "../types/schemas/ventas";

export const getReportDiario = async (
  fecha: string,
  userId: number,
  pointId: number
) => {
  try {
    const { data } = await api.get(
      `/reports/diario?fecha=${fecha}&userId=${userId}&pointId=${pointId}`
    );
    const result = ReportArraySchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch reports");
    }
    throw error;
  }
};

export const getReportDiarioTotal = async (fecha: string, pointId: number) => {
  try {
    const { data } = await api.get(
      `/reports/diariototal?fecha=${fecha}&pointId=${pointId}`
    );
    const result = ReportArraySchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch reports");
    }
    throw error;
  }
};

export const getReportMes = async (
  from: string,
  to: string,
  pointId: number,
  userId: number
) => {
  try {
    const { data } = await api.get(
      `/reports/mes?from=${from}&to=${to}&pointId=${pointId}&userId=${userId}`
    );
    const response = ResponseMesSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.message || "Error al obtener los reportes";
      throw new Error(errorMessage);
    }
  }
};

export const getReportsAnual = async (anio: number, pointId: number) => {
  try {
    const { data } = await api.get(
      `/reports/anual?anio=${anio}&pointId=${pointId}`
    );
    const response = ResponseMesSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.message || "Error al obtener los reportes";
      throw new Error(errorMessage);
    }

    throw new Error(
      error instanceof Error ? error.message : "Ocurrió un error inesperado."
    );
  }
};
