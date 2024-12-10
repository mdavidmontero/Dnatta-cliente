import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovementForm from "./MovementForm";
import { useForm } from "react-hook-form";
import { RegisterFormMovement } from "../../types/schemas/movements";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMovement } from "../../actions/movements.actions";
import { toast } from "sonner";
import { statusCashRegisterOneClosed } from "../../actions/ventas.actions";
import { userAuthStore } from "../../store/useAuthStore";
import { useStorePoint } from "../../store/userStore";

export default function AddMovementModal() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalMovement = queryParams.get("movement");
  const show = modalMovement ? true : false;
  const user = userAuthStore((state) => state.user);
  const point = useStorePoint((state) => state.point);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () => statusCashRegisterOneClosed(+user!.id, +point),
    queryKey: ["cashActiveDay"],
  });

  const initialValues: RegisterFormMovement = {
    nit: "",
    name: "",
    amount: 0,
    tipo: "",
    detail: "",
    cashRegisterId: 0,
    concept: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const useCreateMutation = useMutation({
    mutationFn: createMovement,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["cashdaymovements"] });
      navigate(location.pathname, { replace: true });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateMovement = (formData: RegisterFormMovement) => {
    const adjustData = {
      ...formData,
      amount: +formData.amount,
      cashRegisterId: +data!.id,
    };

    useCreateMutation.mutate(adjustData);
  };

  const navigate = useNavigate();
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl p-16 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="my-2 text-2xl font-black">
                    Nuevo Movimiento
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y registra
                    <span className="text-bg-primary"> un movimiento</span>
                  </p>

                  <form
                    className="mt-10 space-y-3"
                    onSubmit={handleSubmit(handleCreateMovement)}
                    noValidate
                  >
                    <MovementForm register={register} errors={errors} />

                    <input
                      type="submit"
                      className="w-full p-3 font-bold text-white uppercase transition-colors rounded-lg cursor-pointer bg-bg-primary hover:bg-bg-secondary"
                      value="Registrar Movimiento"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
