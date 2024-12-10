import { Transition, Dialog } from "@headlessui/react";

import { Fragment } from "react/jsx-runtime";

import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovementById } from "@/actions/movements.actions";
import { formatCurrency } from "@/utils";

export default function MovementViewDay() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalMovement = queryParams.get("movementcash");
  const show = modalMovement ? true : false;
  const navigate = useNavigate();
  const { data } = useQuery({
    queryFn: () => getMovementById(+modalMovement!),
    queryKey: ["movementby", modalMovement],
    enabled: !!modalMovement,
  });
  if (data)
    return (
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
                    Detalle del Gasto
                  </Dialog.Title>

                  <div className="p-6 space-y-6 bg-white rounded-lg shadow-lg">
                    {/* NIT */}
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-bold text-slate-800">
                        NIT
                      </label>
                      <p className="text-slate-600">{data.nit}</p>
                    </div>
                    <hr className="border-t border-slate-200" />

                    {/* Nombre */}
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-bold text-slate-800">
                        Nombre
                      </label>
                      <p className="text-slate-600">{data.name}</p>
                    </div>
                    <hr className="border-t border-slate-200" />

                    {/* Concepto */}
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-bold text-slate-800">
                        Concepto
                      </label>
                      <p className="text-slate-600">{data.concept}</p>
                    </div>
                    <hr className="border-t border-slate-200" />

                    <div className="flex items-center justify-between">
                      <label className="text-lg font-bold text-slate-800">
                        Monto
                      </label>
                      <p className="text-slate-600">
                        {formatCurrency(data.amount)}
                      </p>
                    </div>
                    <hr className="border-t border-slate-200" />

                    <div className="flex items-center justify-between">
                      <label className="text-lg font-bold text-slate-800">
                        Detalle
                      </label>
                      <p className="text-slate-600">{data.detail}</p>
                    </div>
                    <hr className="border-t border-slate-200" />

                    <div className="flex items-center justify-between">
                      <label className="text-lg font-bold text-slate-800">
                        Tipo de Movimiento
                      </label>
                      <p className="capitalize text-slate-600">{data.tipo}</p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
}
