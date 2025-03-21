import { useNavigate, useParams } from "react-router-dom";
import { useStorePoint } from "../../../store/userStore";
import { useEffect, useMemo } from "react";
import { CashRegister } from "../../../types";
import { useForm } from "react-hook-form";
import { userAuthStore } from "../../../store/useAuthStore";
import ErrorMessage from "../../../components/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cashClosed,
  getCashDay,
  getCashDayTotalAmount,
} from "../../../actions/ventas.actions";
import { toast } from "sonner";
import {
  getAllMovementsCashDay,
  getMoneyCashDay,
} from "../../../actions/movements.actions";
import { formatDate } from "@/utils";
import {
  Wallet,
  Coins,
  ShoppingCart,
  Calendar,
  Clock,
  User,
} from "lucide-react"; // Importar iconos de Lucide

export default function CashEditView() {
  const point = useStorePoint((state) => state.point);
  const user = userAuthStore((state) => state.user);
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams();
  const cashId = params.id;

  const { data, isLoading } = useQuery({
    queryFn: () => getCashDay(+cashId!),
    queryKey: ["cashgetDay"],
  });
  const dataTotalDay = useQuery({
    queryFn: () => getCashDayTotalAmount(+user!.id, point),
    queryKey: ["totaldayCashVendedora"],
    enabled: !!user,
  });
  const { data: movementsData } = useQuery({
    queryFn: () => getAllMovementsCashDay(+cashId!),
    queryKey: ["cashdaymovements"],
    enabled: !!cashId,
  });
  const { data: moneyCashday } = useQuery({
    queryFn: () => getMoneyCashDay(+data!.id),
    queryKey: ["cashmoneyday"],
  });

  const totalCompras = useMemo(() => {
    const totalAmountEgresos = movementsData?.reduce(
      (total, item) => total + item.amount,
      0
    );
    return totalAmountEgresos;
  }, [movementsData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CashRegister>({
    defaultValues: {
      baseAmount: 0,
      totalventaHelados: 0,
      userId: user?.id,
      pointId: +point,
      closingAmount: data?.closingAmount,
      totalAmount: 0,
      isClosed: false,
    },
  });

  useEffect(() => {
    if (data && dataTotalDay.data) {
      reset({
        totalventaHelados: dataTotalDay.data._sum?.totalAmount || 0,
        userId: data.userId,
        pointId: data.pointId,
        closingAmount: totalCompras,
        totalAmount: dataTotalDay.data._sum?.totalAmount + totalCompras,
        isClosed: data.isClosed,
        baseAmount: data.baseAmount,
      });
    }
  }, [data, dataTotalDay.data, reset, totalCompras]);

  const updateCashMutation = useMutation({
    mutationFn: cashClosed,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["cashregister"] });
      queryClient.invalidateQueries({ queryKey: ["cashgetDay"] });
      reset();
      navigation(-1);
    },
  });

  const handleCashClosed = (formData: CashRegister) => {
    if (confirm("¿Está seguro que desea cerrar la caja?")) {
      const dataClosed = {
        ...formData,
        isClosed: true,
      };
      if (moneyCashday?.length === 0) {
        toast.error(
          "No puedes cerrar caja, Asegurate de haber registrado el dinero en caja"
        );
        return;
      }
      updateCashMutation.mutate({ cashId: +cashId!, formData: dataClosed });
    }
  };

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <div className="max-w-4xl px-6 py-8 mx-auto mt-10 bg-white rounded-lg shadow-xl">
        {/* Encabezado */}
        <div className="pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">
              Cierre de Caja
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Periodo: {formatDate(data?.date)}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>
              {new Date(data.date).toLocaleTimeString()} -{" "}
              {new Date().toLocaleDateString() +
                " " +
                new Date().toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>Vendedora: {user?.name}</span>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(handleCashClosed)} className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Base del día */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Coins className="w-5 h-5 text-indigo-600" />
                <span>Base del día</span>
              </label>
              <input
                disabled={data.baseAmount > 0}
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

            {/* Monto Venta Helados */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                <span>Monto Venta Helados</span>
              </label>
              <input
                id="totalventa"
                type="number"
                {...register("totalventaHelados", {
                  required: "El monto de venta es obligatorio",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Monto de venta"
              />
              {errors.totalventaHelados && (
                <ErrorMessage>{errors.totalventaHelados.message}</ErrorMessage>
              )}
            </div>

            {/* Total Gasto Compras */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                <span>Total Gasto Compras</span>
              </label>
              <input
                id="closing"
                type="number"
                {...register("closingAmount", {
                  required: "El Monto de compras es obligatorio",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Monto de compras"
              />
              {errors.closingAmount && (
                <ErrorMessage>{errors.closingAmount.message}</ErrorMessage>
              )}
            </div>

            {/* Total Acumulado día */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Coins className="w-5 h-5 text-indigo-600" />
                <span>Total Acumulado día</span>
              </label>
              <input
                id="totalamount"
                type="number"
                {...register("totalAmount", {
                  required: "El total Acumulado del día es obligatorio",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Total acumulado"
              />
              {errors.totalAmount && (
                <ErrorMessage>{errors.totalAmount.message}</ErrorMessage>
              )}
            </div>
          </div>

          {/* Botón de Cerrar Caja */}
          <div className="flex items-center justify-center mt-8">
            <button
              type="submit"
              className="flex items-center justify-center w-1/3 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Cerrar Caja
            </button>
          </div>
        </form>
      </div>
    );
}
