import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CashRegister } from "../../../types";
import { toast } from "sonner";

import GoBackButton from "../../../components/ui/GoBackButton";
import CashFormRegister from "../../../components/cash/CashFormRegister";
import { userAuthStore } from "../../../store/useAuthStore";
import { useStorePoint } from "../../../store/userStore";
import { cashRegister } from "../../../actions/ventas.actions";
import { useNavigate } from "react-router-dom";

export default function CashRegisterView() {
  const user = userAuthStore((state) => state.user);
  const point = useStorePoint((state) => state.point);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const useCreateRegisterCash = useMutation({
    mutationFn: cashRegister,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["cashregister"] });
      reset();
    },
  });
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
      closingAmount: 0,
      totalAmount: 0,
      isClosed: false,
    },
  });

  const handlePointAction = async (formData: CashRegister) => {
    const data = {
      ...formData,
      userId: parseInt(user!.id.toString()),
      pointId: +point,
    };
    navigate(-1);

    useCreateRegisterCash.mutate(data);
  };

  return (
    <>
      <GoBackButton />
      <div className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
        <legend className="text-2xl font-bold text-center text-slate-800">
          Apertura de Caja
        </legend>
        <form
          className="space-y-5"
          noValidate
          onSubmit={handleSubmit(handlePointAction)}
        >
          {/* <CashFormRegister register={register} errors={errors} /> */}
          <CashFormRegister register={register} errors={errors} />

          <input
            // disabled={useupdatePointMutation.isPending}
            type="submit"
            className="w-full p-3 mt-5 font-bold text-white bg-indigo-600 cursor-pointer disabled:opacity-50 hover:bg-indigo-800"
            value={"Abrir Caja"}
          />
        </form>
      </div>
    </>
  );
}
