import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  Product,
  ProductSchemaI,
  ProductsSchema,
  useNewProductForm,
} from "../types";

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  searchTerm: string = ""
) => {
  try {
    const { data } = await api.get("/products/products/paginated", {
      params: { page, limit, searchTerm },
    });
    const response = ProductsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};

export const createProduct = async (formData: useNewProductForm) => {
  try {
    const { data } = await api.post<string>(
      "/products/create-product",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};

type ProductApiType = {
  formData: useNewProductForm;
  productId: Product["id"];
};

export const editProduct = async ({ formData, productId }: ProductApiType) => {
  try {
    const { data } = await api.patch(
      `/products/product/${productId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};

export const getProduct = async (id: Product["id"]) => {
  try {
    const { data } = await api.get(`/products/product/${id}`);
    const response = ProductSchemaI.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products");
    }
  }
};

export const updateEstado = async (id: Product["id"], estado: boolean) => {
  try {
    const { data } = await api.patch(`/products/update-estado/${id}`, {
      estado,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to update product status"
      );
    }
  }
};
