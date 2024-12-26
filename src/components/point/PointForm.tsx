import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Point, PointsI } from "../../types";
import ErrorMessage from "../ErrorMessage";

interface ProductFormProps {
  register: UseFormRegister<PointsI>;
  errors: FieldErrors<Point>;
}

export default function PointForm({ register, errors }: ProductFormProps) {
  return (
    <>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          placeholder="Nombre punto de Venta"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Ubicacion:
        </label>
        <input
          id="ubicacion"
          type="text"
          {...register("ubicacion", {
            required: "El nombre es obligatorio",
          })}
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          placeholder="Nombre Producto"
        />
        {errors.ubicacion && (
          <ErrorMessage>{errors.ubicacion.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
