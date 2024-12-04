import { z } from "zod";

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
  currentPassword: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    id: z.number(),
    confirmed: z.boolean(),
    role: z.string(),
    image: z.string(),
  });
export type User = z.infer<typeof userSchema>;

export type UserProfileForm = Pick<User, "name" | "email">;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegisterForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export type Categories = z.infer<typeof CategorySchema>;
export const CategoriesSchema = z.array(CategorySchema);

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  estado: z.boolean(),
  categoryId: z.number(),
  category: CategorySchema,
});

export const ProductsSchema = z.object({
  products: z.array(ProductSchema),
  totalPages: z.number(),
  currentPage: z.number(),
  totalProducts: z.number(),
});
export type Product = z.infer<typeof ProductSchema>;
export type useNewProductForm = Pick<
  Product,
  "name" | "price" | "image" | "estado" | "categoryId"
>;

export interface Categoria {
  id: number;
  name: string;
  price: number;
  image: string;
  estado: boolean;
  categoryId: number;
}

export const ProductSchemaI = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  estado: z.boolean(),
  categoryId: z.number(),
});

export type ProductI = z.infer<typeof ProductSchemaI>;
export const CategoriasProductosSchema = z.array(ProductSchemaI);

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

// Ventas
export const SaleSchema = z.object({
  totalAmount: z.number().min(0, "Hay errores en la orden"),
  paymentType: z.string(),
  transferPlatform: z.string(),
  saleDetails: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
  userId: z.number(),
  pointId: z.number(),
});
export const SaleSchemaI = z.array(SaleSchema);

export type SaleOrder = z.infer<typeof SaleSchema>;
