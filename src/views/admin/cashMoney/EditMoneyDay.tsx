import { getMoneyOne, updateMoneyCash } from "@/actions/movements.actions";
import ErrorMessage from "@/components/ErrorMessage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormUpdateMoney } from "@/types/schemas/movements";
import { formatCurrency } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

interface EditMoneyDayProps {
  moneyId: number;
}

export default function EditMoneyDay({ moneyId }: EditMoneyDayProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getMoneyOne(moneyId),
    queryKey: ["moneyOne", moneyId],
    enabled: !!moneyId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormUpdateMoney>({
    defaultValues: {
      quantity: data?.quantity,
      totalDenomination: data?.totalDenomination,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        denomination: data.denomination,
        quantity: data.quantity,
        totalDenomination: data.totalDenomination,
      });
    }
  }, [data, reset]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const mutationUpdateMoney = useMutation({
    mutationFn: updateMoneyCash,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["moneyOne", moneyId] });
      queryClient.invalidateQueries({ queryKey: ["cashmoneyday"] });
      setDialogOpen(false);
      reset();
    },
  });

  const updateAction = async (formData: FormUpdateMoney) => {
    if (data?.denomination === "monedas") {
      const dataUpdate = {
        id: data.id,
        formData: {
          denomination: data.denomination,
          quantity: +formData.quantity,
          totalDenomination: +formData.quantity,
        },
      };
      mutationUpdateMoney.mutate(dataUpdate);
    } else {
      mutationUpdateMoney.mutate({
        id: data!.id,
        formData: {
          denomination: data!.denomination,
          quantity: +formData.quantity,
          totalDenomination: +formData.quantity * +data!.denomination,
        },
      });
    }
  };

  // Cargando estado mientras se obtiene data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Manejo de error en caso de fallo al cargar los datos
  if (isError) {
    return <div>Error al cargar los datos.</div>;
  }

  // Caso cuando no hay datos
  if (!data) {
    return <div>No se encontraron datos.</div>;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="text-indigo-600 hover:text-indigo-800">
          Editar
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-2 text-xl font-bold">
            Editar Denominacion:{" "}
            <span>{formatCurrency(+data.denomination)}</span>
          </DialogTitle>
          <DialogDescription>
            <form
              className="flex flex-col gap-4 mt-4"
              onSubmit={handleSubmit(updateAction)}
            >
              <div className="flex flex-row items-center gap-4">
                <div className="flex-1">
                  {data.denomination && (
                    <img
                      src={`billetes/${data.denomination}.jpg`}
                      className="object-cover w-auto h-20 mx-auto rounded-lg"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    {...register("quantity", {
                      required: "La cantidad es obligatoria",
                      min: {
                        value: 1,
                        message: "La cantidad debe ser mayor que 0",
                      },
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                    placeholder="Cantidad"
                  />
                  {errors.quantity && (
                    <ErrorMessage>{errors.quantity?.message}</ErrorMessage>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  className="w-full p-3 font-bold text-white uppercase transition-colors rounded-lg cursor-pointer bg-bg-primary hover:bg-bg-secondary"
                  value="Guardar Cambios"
                />
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
