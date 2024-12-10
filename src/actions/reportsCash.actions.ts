import api from "@/lib/axios";
import { CashReportSchema } from "@/types/schemas/cash";
import { isAxiosError } from "axios";

export const reportsCash = async (fecha: string) => {
  try {
    const { data } = await api.get(`/movements/report-cashs?fecha=${fecha}`);
    const response = CashReportSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};
