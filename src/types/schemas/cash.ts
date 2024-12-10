import { z } from "zod";

export const CashregisterSchema = z.object({
  id: z.number(),
  date: z.string().datetime(),
  baseAmount: z.number(),
  totalventaHelados: z.number(),
  closingAmount: z.number(),
  userId: z.number(),
  pointId: z.number(),
  totalAmount: z.number(),
  isClosed: z.boolean(),
});

export type Cash = z.infer<typeof CashregisterSchema>;
export const CashSchema = z.array(CashregisterSchema);

// Reportes de caja

// CashDetail Schema

// CashDetail Schema
export const cashDetailSchema = z
  .object({
    id: z.number(),
    denomination: z.string(),
    quantity: z.number(),
    cashRegisterId: z.number(),
    totalDenomination: z.number(),
  })
  .optional();

// Sale detail

export const ProductSchemaI = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  estado: z.boolean(),
  categoryId: z.number(),
});

export const saleDetailSchema = z
  .object({
    id: z.number(),
    saleId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    unitPrice: z.number(),
    product: ProductSchemaI.optional(),
  })
  .optional();
// Sale Schema
export const saleSchema = z
  .object({
    id: z.number(),
    date: z.string().datetime(), // Cambié `.date()` por `.datetime()` para una validación más precisa
    totalAmount: z.number(),
    paymentType: z.string(),
    transferPlatform: z.string(),
    userId: z.number(),
    pointId: z.number(),
    saleDetails: z.array(saleDetailSchema).optional(),
  })
  .optional();

// Point Schema
export const pointSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    ubicacion: z.string(),
    sales: z.array(saleSchema).optional(), // Ventas opcionales
  })
  .optional();

// User Schema
export const userSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmed: z.boolean(),
    role: z.string(),
    token: z.string(),
    image: z.string().nullable(), // Imagen puede ser nula
    createdAt: z.string().datetime(), // Usar string para mayor flexibilidad
    updatedAt: z.string().datetime(),
  })
  .optional();

// CashMovement Schema
export const cashMovementSchema = z
  .object({
    id: z.number(),
    nit: z.string(),
    name: z.string(),
    concept: z.string(),
    amount: z.number(),
    detail: z.string(),
    cashRegisterId: z.number(),
    tipo: z.string(),
  })
  .optional();

// Report cashdetails

// CashReport Schema
export const cashReportSchema = z.object({
  id: z.number(),
  date: z.string().datetime(),
  baseAmount: z.number(),
  closingAmount: z.number(),
  totalventaHelados: z.number(),
  userId: z.number(),
  pointId: z.number(),
  totalAmount: z.number(),
  isClosed: z.boolean(),
  cashDetails: z.array(cashDetailSchema).optional(), // Opcional
  cashMovements: z.array(cashMovementSchema).optional(), // Opcional
  point: pointSchema.optional(), // Opcional
  user: userSchema.optional(), // Opcional
});

export type cashReportSchemaI = z.infer<typeof cashReportSchema>;

export const CashReportSchema = z.array(cashReportSchema);
