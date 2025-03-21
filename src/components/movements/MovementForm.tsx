import { useFormContext, useWatch } from "react-hook-form"; // Importar useFormContext
import { RegisterFormMovement } from "../../types/schemas/movements";
import ErrorMessage from "../ErrorMessage";
import {
  Building,
  User,
  ClipboardList,
  DollarSign,
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";

export default function MovementForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormMovement>(); // Usar useFormContext
  const tipo = useWatch({ name: "tipo" }); // Observar el campo "tipo"

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* NIT */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Building className="w-5 h-5 text-indigo-600" />
          <span>NIT</span>
        </label>
        <input
          id="nit"
          type="text"
          placeholder="Ej: 843746483"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          {...register("nit", {
            required: "El NIT es obligatorio",
          })}
        />
        {errors.nit && <ErrorMessage>{errors.nit.message}</ErrorMessage>}
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <User className="w-5 h-5 text-indigo-600" />
          <span>Nombre</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Ej: Mi Futuro"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Concepto */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ClipboardList className="w-5 h-5 text-indigo-600" />
          <span>Concepto</span>
        </label>
        <input
          id="concept"
          type="text"
          placeholder="Ej: Compra de producto"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          {...register("concept", {
            required: "El concepto es obligatorio",
          })}
        />
        {errors.concept && (
          <ErrorMessage>{errors.concept.message}</ErrorMessage>
        )}
      </div>

      {/* Monto */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <DollarSign className="w-5 h-5 text-indigo-600" />
          <span>Monto</span>
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Ej: 100.000"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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

      {/* Detalle */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText className="w-5 h-5 text-indigo-600" />
          <span>Detalle</span>
        </label>
        <input
          id="detail"
          type="text"
          placeholder="Descripción del movimiento"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          {...register("detail", {
            required: "El detalle es obligatorio",
          })}
        />
        {errors.detail && <ErrorMessage>{errors.detail.message}</ErrorMessage>}
      </div>

      {/* Tipo de movimiento */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          {tipo === "entrada" ? (
            <ArrowDownCircle className="w-5 h-5 text-green-600" />
          ) : (
            <ArrowUpCircle className="w-5 h-5 text-red-600" />
          )}
          <span>Tipo de movimiento</span>
        </label>
        <select
          id="tipo"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          {...register("tipo", {
            required: "El tipo es obligatorio",
          })}
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
        {errors.tipo && <ErrorMessage>{errors.tipo.message}</ErrorMessage>}
      </div>
    </div>
  );
}
