import { z } from "zod";

export const CashregisterSchema = z.object({
  id: z.number(),
  date: z.string().datetime(),
  baseAmount: z.number(),
  closingAmount: z.number(),
  totalventaHelados: z.number(),
  userId: z.number(),
  pointId: z.number(),
  totalTransactions: z.number(),
  totalAmount: z.number(),
  isClosed: z.boolean(),
});

export type Cash = z.infer<typeof CashregisterSchema>;
