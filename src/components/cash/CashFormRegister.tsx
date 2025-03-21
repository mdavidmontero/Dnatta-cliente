import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CashRegister } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { userAuthStore } from "../../store/useAuthStore";
import { Calendar, User, Coins, Wallet } from "lucide-react";

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <span>Fecha:</span>
          <span className="font-normal">{new Date().toLocaleDateString()}</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <User className="w-5 h-5 text-indigo-600" />
          <span>Vendedor:</span>
          <span className="font-normal">{user?.name}</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Coins className="w-5 h-5 text-indigo-600" />
          <span>Base del día</span>
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Monto base"
        />
        {errors.baseAmount && (
          <ErrorMessage>{errors.baseAmount.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Wallet className="w-5 h-5 text-indigo-600" />
          <span>Monto Final del día</span>
        </label>
        <input
          id="closing"
          {...register("closingAmount")}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="600.000"
          disabled
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Coins className="w-5 h-5 text-indigo-600" />
          <span>Total Acumulado día</span>
        </label>
        <input
          id="totalamount"
          {...register("totalAmount")}
          disabled
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="600.000"
        />
      </div>
    </div>
  );
}
