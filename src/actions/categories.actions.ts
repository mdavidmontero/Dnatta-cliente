import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CategoriesSchema } from "../types";

export const getCategories = async () => {
  try {
    const { data } = await api.get("/categories");
    const response = CategoriesSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};
