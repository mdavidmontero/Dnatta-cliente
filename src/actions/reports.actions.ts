import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ReportArraySchema } from "../types";

export const getReportDiario = async (
  fecha: string,
  userId: number,
  pointId: number
) => {
  try {
    const { data } = await api.get(
      `/reports/diario?fecha=${fecha}&userId=${userId}&pointId=${pointId}`
    );
    const result = ReportArraySchema.parse(data);
    return result;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch reports");
    }
    throw error;
  }
};
