import { z } from "zod";

export const authSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
  currentPassword: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export const userSchemas = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  confirmed: z.boolean(),
  role: z.enum(["USER", "ADMIN"]),
  image: z.string().nullable(),
  token: z.string(),
});

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    id: z.number(),
    confirmed: z.boolean(),
    role: z.string(),
    image: z.string().nullable(),
  });
export type User = z.infer<typeof userSchema>;

export type UserProfileForm = Pick<User, "name" | "email">;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegisterForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type ConfirmToken = Pick<Auth, "token">;
export type CheckPasswordForm = Pick<Auth, "password">;

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

export const PointSchema = z.object({
  id: z.number(),
  name: z.string(),
  ubicacion: z.string(),
});

export const PointSchemI = z.array(PointSchema);

export type Point = z.infer<typeof PointSchema>;
export const schemaUpdatePoint = z.array(PointSchema);

export type PointsI = Pick<Point, "name" | "ubicacion">;

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

// Puntos
export interface Points {
  id: number;
  name: string;
  ubicacion: string;
}

// ventas

export const ReportSchema = z.object({
  id: z.number(),
  date: z.string().datetime(),
  totalAmount: z.number(),
  paymentType: z.string(),
  transferPlatform: z.string(),
  userId: z.number(),
  pointId: z.number(),
  saleDetails: z.array(
    z.object({
      id: z.number(),
      saleId: z.number(),
      productId: z.number(),
      quantity: z.number(),
      unitPrice: z.number(),
      product: z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        image: z.string(),
        estado: z.boolean(),
        categoryId: z.number(),
      }),
    })
  ),
});

export const ReportArraySchema = z.array(ReportSchema);

export type Report = z.infer<typeof ReportSchema>;
export type ReportArray = z.infer<typeof ReportArraySchema>;
