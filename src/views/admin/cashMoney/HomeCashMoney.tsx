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
        { denomination: "100000", quantity: 0 },
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
      queryClient.invalidateQueries({ queryKey: ["cashmoneyday"] });
      navigate(location.pathname, { replace: true });
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
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
                <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-gray-900"
                  >
                    Registro de Billetes en Caja
                  </Dialog.Title>

                  <p className="mt-1 text-sm text-gray-500">
                    Ingresa las cantidades de cada denominación para registrar
                    el dinero en caja.
                  </p>

                  <form
                    className="mt-6 space-y-4"
                    onSubmit={handleSubmit(handleCreateMovement)}
                    noValidate
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {fields.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 transition-colors duration-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex items-center justify-center flex-shrink-0">
                            <img
                              src={`billetes/${item.denomination}.jpg`}
                              className="object-contain w-12 h-12 rounded-lg"
                              alt={`Billete de ${item.denomination}`}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                              {item.denomination === "monedas"
                                ? "Monedas"
                                : `Billete de $${item.denomination}`}
                            </label>
                            <input
                              type="number"
                              {...register(`denomination.${index}.quantity`, {
                                required: "La cantidad es obligatoria",
                                min: {
                                  value: 0,
                                  message: "La cantidad no puede ser negativa",
                                },
                              })}
                              className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Registrar Movimiento
                      </button>
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
