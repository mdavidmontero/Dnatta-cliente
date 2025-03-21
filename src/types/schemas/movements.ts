import { z } from "zod";

export const MovementSchema = z.object({
  id: z.number(),
  nit: z.string(),
  name: z.string(),
  concept: z.string(),
  amount: z.number(),
  detail: z.string(),
  cashRegisterId: z.number(),
  tipo: z.string(),
});

export type Movement = z.infer<typeof MovementSchema>;
export type RegisterFormMovement = Pick<
  Movement,
  "nit" | "name" | "concept" | "amount" | "detail" | "cashRegisterId" | "tipo"
>;

export const MovementSchemaI = z.array(MovementSchema);

// Definir el esquema para las denominaciones
export const denominationSchema = z.object({
  denomination: z.string(),
  quantity: z.number().min(0, "La cantidad debe ser mayor que 0"),
  cashRegisterId: z.number().min(1, "El ID de la caja es obligatorio"),
  totalDenomination: z
    .number()
    .min(0, "El total de la denominacion es obligatorio"),
});

// Esquema principal para el formulario de movimiento
export const registerFormSchema = z.object({
  denomination: z
    .array(denominationSchema)
    .min(1, "Debes agregar al menos una denominación"),
});

export const updateDenominationSchema = z.object({
  id: z.number(),
  denomination: z.string(),
  quantity: z.number(),
  cashRegisterId: z.number(),
  totalDenomination: z.number(),
});

export type FormUpdateSchema = z.infer<typeof updateDenominationSchema>;

export type FormUpdateMoney = Pick<
  FormUpdateSchema,
  "denomination" | "quantity" | "totalDenomination"
>;

// Tipo TypeScript para inferir el tipo del formulario
export type RegisterFormMoney = z.infer<typeof registerFormSchema>;
export type MoneyCashDaySchema = z.infer<typeof denominationSchema>;
export const MoneyCashDaySchema = denominationSchema
  .pick({
    denomination: true,
    quantity: true,
    totalDenomination: true,
    cashRegisterId: true,
  })
  .extend({
    id: z.number(),
  });

export type MoneyCashDaySchemaI = z.infer<typeof MoneyCashDaySchema>;
export const MoneyCashDaySchemas = z.array(MoneyCashDaySchema);
