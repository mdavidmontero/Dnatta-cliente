import { z } from "zod";
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  estado: z.boolean(),
  categoryId: z.number(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirmed: z.boolean(),
  role: z.string(),
  token: z.string(),
  image: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const SaleDetailSchema = z.object({
  id: z.number(),
  saleId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  unitPrice: z.number(),
  product: ProductSchema,
});

export const ReportSchema = z.object({
  id: z.number(),
  date: z.string().datetime(),
  totalAmount: z.number(),
  userId: z.number(),
  pointId: z.number(),
  saleDetails: z.array(SaleDetailSchema),
  user: UserSchema,
});

export type Report = z.infer<typeof ReportSchema>;

export const SumSchema = z.object({
  totalAmount: z.number().nullable(),
});

export const TotalAmountSchema = z.object({
  _sum: SumSchema,
});

export const ResponseMesSchema = z.object({
  reports: z.array(ReportSchema),
  totalAmount: TotalAmountSchema,
});

export type ResponseMes = z.infer<typeof ResponseMesSchema>;

export type GroupedReports = {
  [date: string]: {
    totalAmount: number;
    reports: Report[];
  };
};
