import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormMovement } from "../../types/schemas/movements";
import ErrorMessage from "../ErrorMessage";

interface MovementFormProps {
  register: UseFormRegister<RegisterFormMovement>;
  errors: FieldErrors<RegisterFormMovement>;
}

export default function MovementForm({ register, errors }: MovementFormProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-black text-slate-800" htmlFor="nit">
          NIT
        </label>
        <input
          id="nit"
          type="text"
          placeholder="nit ej: 843746483"
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          {...register("nit", {
            required: "El nit es obligatorio",
          })}
        />
        {errors.nit && <ErrorMessage>{errors.nit.message}</ErrorMessage>}
      </div>
      <div className="flex flex-col gap-5">
        <label className="font-black text-slate-800" htmlFor="nit">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          placeholder="nombre ej: Mi futuro"
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className="flex flex-col gap-5">
        <label className="font-black text-slate-800" htmlFor="nit">
          Concepto
        </label>
        <input
          id="concept"
          type="text"
          placeholder="concepto ej: compra de producto"
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          {...register("concept", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.concept && (
          <ErrorMessage>{errors.concept.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <label className="font-black text-slate-800" htmlFor="nit">
          Monto
        </label>
        <input
          id="amount"
          type="number"
          placeholder="concepto ej: compra de producto"
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          {...register("amount", {
            required: "El monto es obligatorio",
            min: {
              value: 0,
              message: "El monto debe ser mayor a 0",
            },
          })}
        />
        {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
      </div>
      <div className="flex flex-col gap-5">
        <label className="font-black text-slate-800" htmlFor="nit">
          Detalle
        </label>
        <input
          id="detail"
          type="text"
          placeholder="descripción del movimiento"
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          {...register("detail", {
            required: "El detalle es obligatorio",
          })}
        />
        {errors.detail && <ErrorMessage>{errors.detail.message}</ErrorMessage>}
      </div>
      <div className="flex flex-col gap-5">
        <label className="font-black text-slate-800" htmlFor="tipo">
          Tipo de movimiento
        </label>
        <select
          id="tipo"
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          {...register("tipo", {
            required: "El tipo es obligatorio",
          })}
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
        {errors.tipo && <ErrorMessage>{errors.tipo.message}</ErrorMessage>}
      </div>
    </>
  );
}
