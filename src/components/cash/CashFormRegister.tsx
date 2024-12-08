import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CashRegister } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { userAuthStore } from "../../store/useAuthStore";

interface CashFormRegisterProps {
  register: UseFormRegister<CashRegister>;
  errors: FieldErrors<CashRegister>;
}
export default function CashFormRegister({
  register,
  errors,
}: CashFormRegisterProps) {
  const user = userAuthStore((state) => state.user);
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="font-bold text-slate-800" htmlFor="date">
            Fecha:
            <span className="ml-2 font-normal">
              {new Date().toLocaleDateString()}
            </span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="font-bold text-slate-800">
            Vendedor: <span className="font-normal">{user?.name}</span>
          </label>
        </div>
        <div className="space-y-2">
          <label className="text-slate-800" htmlFor="name">
            Base del día
          </label>
          <input
            id="baseAmount"
            type="number"
            {...register("baseAmount", {
              required: "El monto base es obligatorio",
              min: {
                value: 1000,
                message: "El monto base debe ser mayor a 1000",
              },
            })}
            className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            placeholder="Nombre Producto"
          />
          {errors.baseAmount && (
            <ErrorMessage>{errors.baseAmount.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-slate-800" htmlFor="closing">
            Monto Final del día:
          </label>
          <input
            id="closing"
            {...register("closingAmount")}
            className="block w-full p-3 rounded-md bg-slate-100"
            placeholder="600.000"
            disabled
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold text-slate-800" htmlFor="totalamount">
            Total Acumulado día:
          </label>
          <input
            id="totalamount"
            {...register("totalAmount")}
            disabled
            className="block w-full p-3 rounded-md bg-slate-100"
            placeholder="600.000"
          />
        </div>
        <div className="space-y-2">
          <label className="font-bold text-slate-800">
            Estado Caja:
            {/* <span className="ml-2 font-normal">
              {register("isClosed") ? "Cerrada" : "Abierta"}
            </span> */}
          </label>
        </div>
      </div>
    </>
  );
}
