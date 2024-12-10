import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import { userAuthStore } from "../../../store/useAuthStore";
import { useStorePoint } from "../../../store/userStore";
import { statusCashRegisterOneClosed } from "../../../actions/ventas.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RegisterFormMoney } from "../../../types/schemas/movements";
import ErrorMessage from "../../../components/ErrorMessage";
import { registerMoneyInCash } from "../../../actions/movements.actions";
import { toast } from "sonner";

export default function HomeMoneyCash() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const queryParams = new URLSearchParams(location.search);
  const modalMovement = queryParams.get("newMoney");
  const show = modalMovement ? true : false;
  const user = userAuthStore((state) => state.user);
  const point = useStorePoint((state) => state.point);

  const { data } = useQuery({
    queryFn: () => statusCashRegisterOneClosed(+user!.id, +point),
    queryKey: ["cashActiveDay"],
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RegisterFormMoney>({
    defaultValues: {
      denomination: [
        { denomination: "2000", quantity: 0 },
        { denomination: "5000", quantity: 0 },
        { denomination: "10000", quantity: 0 },
        { denomination: "20000", quantity: 0 },
        { denomination: "50000", quantity: 0 },
        { denomination: "monedas", quantity: 0 },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "denomination",
  });

  const useRegisterMoney = useMutation({
    mutationFn: registerMoneyInCash,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["cashregister"] });
      reset();
    },
  });
  const handleCreateMovement = (formData: RegisterFormMoney) => {
    const adjustData = formData.denomination.map((movement) => {
      if (movement.denomination === "monedas") {
        return {
          denomination: movement.denomination,
          quantity: +movement.quantity,
          totalDenomination: +movement.quantity,
          cashRegisterId: +data!.id,
        };
      } else {
        return {
          denomination: movement.denomination,
          quantity: +movement.quantity,
          totalDenomination: +movement.denomination * +movement.quantity,
          cashRegisterId: +data!.id,
        };
      }
    });

    const dataform = {
      denomination: adjustData,
    };
    useRegisterMoney.mutate(dataform);
  };

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
                    Registro de Billetes en Caja
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y registra
                    <span className="text-bg-primary">
                      {" "}
                      el dinero en caja del día
                    </span>
                  </p>

                  <form
                    className="mt-10 space-y-6"
                    onSubmit={handleSubmit(handleCreateMovement)}
                    noValidate
                  >
                    {/* Campos para denominaciones */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {fields.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex flex-col items-center gap-4 md:flex-row"
                        >
                          <div className="flex-1">
                            <img
                              src={`billetes/${item.denomination}.jpg`}
                              className="object-cover w-auto h-20 mx-auto rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="number"
                              {...register(`denomination.${index}.quantity`, {
                                required: "La cantidad es obligatoria",
                                min: {
                                  value: 1,
                                  message: "La cantidad debe ser mayor que 0",
                                },
                              })}
                              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                              placeholder="Cantidad"
                            />
                            {errors.denomination?.[index]?.quantity && (
                              <ErrorMessage>
                                {
                                  errors.denomination?.[index]?.quantity
                                    ?.message
                                }
                              </ErrorMessage>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10">
                      <input
                        type="submit"
                        className="w-full p-3 font-bold text-white uppercase transition-colors rounded-lg cursor-pointer bg-bg-primary hover:bg-bg-secondary"
                        value="Registrar Movimiento"
                      />
                    </div>
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
