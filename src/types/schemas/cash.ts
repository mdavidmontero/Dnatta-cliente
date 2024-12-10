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
export interface Prueba {
  id: number;
  date: Date;
  baseAmount: number;
  closingAmount: number;
  totalventaHelados: number;
  userId: number;
  pointId: number;
  totalAmount: number;
  isClosed: boolean;
}
