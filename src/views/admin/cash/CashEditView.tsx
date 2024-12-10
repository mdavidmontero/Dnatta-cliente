import { useParams } from "react-router-dom";
import { useStorePoint } from "../../../store/userStore";
import { useEffect, useMemo, useState } from "react";
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
import { getAllMovementsCashDay } from "../../../actions/movements.actions";

export default function CashEditView() {
  const point = useStorePoint((state) => state.point);
  const user = userAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const params = useParams();
  const cashId = params.id;
  const [closed, setClosed] = useState(false);

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
  }, [data, dataTotalDay.data, reset]);

  const handleCloseCash = () => {
    const confirmClose = window.confirm(
      "¿Estás seguro de que deseas cerrar la caja?"
    );
    if (confirmClose) {
      setClosed(true);
      toast.success("Caja cerrada correctamente");
    }
  };

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
    },
  });

  const handleCashClosed = (formData: CashRegister) => {
    const dataClosed = {
      ...formData,
      isClosed: closed,
    };
    updateCashMutation.mutate({ cashId: +cashId!, formData: dataClosed });
  };

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <div className="max-w-4xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
        <div className="items-center mb-4 border-b-2">
          <label className="font-black text-slate-800">
            Estado Caja:
            <span className="ml-2 font-normal">
              {data?.isClosed ? "Cerrada" : "Abierta"}
            </span>
          </label>
        </div>
        <form onSubmit={handleSubmit(handleCashClosed)}>
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
                Monto Venta Helados
              </label>
              <input
                id="totalventa"
                type="number"
                {...register("totalventaHelados", {
                  required: "El monto de venta es obligatorio",
                })}
                className="block w-full p-3 rounded-md bg-slate-100"
                placeholder="600.000"
              />
              {errors.totalventaHelados && (
                <ErrorMessage>{errors.totalventaHelados.message}</ErrorMessage>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-bold text-slate-800" htmlFor="totalamount">
                Total Gasto Compras:
              </label>
              <input
                id="closing"
                type="number"
                {...register("closingAmount", {
                  required: "El Monto de compras es obligatorio",
                })}
                className="block w-full p-3 rounded-md bg-slate-100"
                placeholder="600.000"
              />
              {errors.closingAmount && (
                <ErrorMessage>{errors.closingAmount.message}</ErrorMessage>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-bold text-slate-800" htmlFor="totalamount">
                Total Acumulado día:
              </label>
              <input
                id="totalamount"
                type="number"
                {...register("totalAmount", {
                  required: "El total Acumulado del día es obligatorio",
                })}
                className="block w-full p-3 rounded-md bg-slate-100"
                placeholder="600.000"
              />
              {errors.totalAmount && (
                <ErrorMessage>{errors.totalAmount.message}</ErrorMessage>
              )}
            </div>
          </div>
          <div className="flex justify-between my-5 space-x-4">
            <button
              type="button"
              onClick={handleCloseCash}
              className="w-full py-3 font-bold text-white bg-red-600 rounded-md cursor-pointer hover:bg-red-800"
            >
              Cerrar Caja
            </button>
            <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-800"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    );
}
