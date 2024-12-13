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
    console.log(data);
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
  anio: number,
  mes: number | null,
  pointId: number
) => {
  try {
    if (!anio || isNaN(Number(anio))) {
      throw new Error(
        "El parámetro 'anio' es obligatorio y debe ser un número."
      );
    }
    if (!pointId || isNaN(Number(pointId))) {
      throw new Error(
        "El parámetro 'pointId' es obligatorio y debe ser un número."
      );
    }
    const { data } = await api.get(
      `/reports/mes?anio=${anio}&mes=${mes ?? ""}&pointId=${pointId}`
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
