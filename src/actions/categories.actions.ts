import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Categories, CategoriesSchema, CategorySchema } from "../types";
import { CategorieNewForm } from "../types/index";

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

export const getcategory = async (id: number) => {
  try {
    const { data } = await api.get(`/categories/category/${id}`);
    const response = CategorySchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch product");
    }
  }
};

export const createCategory = async (formData: CategorieNewForm) => {
  try {
    const { data } = await api.post<string>(
      "/categories/create-category",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create product");
    }
  }
};

type CategoryApiType = {
  formData: CategorieNewForm;
  id: Categories["id"];
};
export const updateCategory = async ({ id, formData }: CategoryApiType) => {
  try {
    const { data } = await api.put<string>(
      `/categories/category/${id}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to update product");
    }
  }
};

export const deleteCategory = async (id: Categories["id"]) => {
  try {
    const { data } = await api.delete<string>(`/categories/category/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to delete product");
    }
  }
};
