import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovementForm from "./MovementForm";
import { useForm, FormProvider } from "react-hook-form";
import { Movement, RegisterFormMovement } from "../../types/schemas/movements";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovementByCash } from "../../actions/movements.actions";
import { toast } from "sonner";

interface EditMovementModalProps {
  movementId: number;
  data: Movement;
}

export default function EditMovementModal({
  movementId,
  data,
}: EditMovementModalProps) {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const methods = useForm<RegisterFormMovement>({
    defaultValues: {
      nit: data.nit,
      name: data.name,
      amount: data.amount,
      tipo: data.tipo,
      concept: data.concept,
      detail: data.detail,
      cashRegisterId: data.cashRegisterId,
    },
  });

  const useUpdateMutation = useMutation({
    mutationFn: updateMovementByCash,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cashdaymovements"] });
      queryClient.invalidateQueries({ queryKey: ["movement"] });
      toast.success(data);
      methods.reset();
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateMovement = (formData: RegisterFormMovement) => {
    const adjustData = {
      ...formData,
      amount: +formData.amount,
    };
    const payload = {
      id: movementId,
      formData: adjustData,
    };

    useUpdateMutation.mutate(payload);
  };

  return (
    <>
      <Transition appear show={true} as={Fragment}>
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
                    Editar Movimiento
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Modifica el movimiento
                    <span className="text-bg-primary"> {data.name}</span>
                  </p>

                  <FormProvider {...methods}>
                    <form
                      className="mt-10 space-y-3"
                      onSubmit={methods.handleSubmit(handleUpdateMovement)}
                      noValidate
                    >
                      <MovementForm />

                      <input
                        type="submit"
                        className="w-full p-3 font-bold text-white uppercase transition-colors rounded-lg cursor-pointer bg-bg-primary hover:bg-bg-secondary"
                        value="Guardar Cambios"
                      />
                    </form>
                  </FormProvider>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
