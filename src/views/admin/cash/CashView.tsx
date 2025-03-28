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
      <div className="max-w-4xl px-6 py-8 mx-auto mt-10 bg-white rounded-lg shadow-xl">
        <div className="pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-800">
              Apertura de Caja
            </span>
          </div>
        </div>

        <form
          className="mt-6"
          noValidate
          onSubmit={handleSubmit(handlePointAction)}
        >
          <CashFormRegister register={register} errors={errors} />

          <div className="flex items-center justify-center mt-8">
            <button
              type="submit"
              className="flex items-center justify-center w-1/3 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Abrir Caja
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
