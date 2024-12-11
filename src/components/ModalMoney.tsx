import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";

import { formatCurrency } from "../utils";

interface ModalMoneyProps {
  amount: number;

  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
  selectedTransfer: string;
  setSelectedTransfer: Dispatch<SetStateAction<string>>;
  handleCreateOrder: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBill: React.Dispatch<React.SetStateAction<number>>;
  selectedBill: number;
  setAmountPaid: React.Dispatch<React.SetStateAction<number>>;
  amountPaid: number;
}

export default function ModalMoney({
  amount,
  paymentMethod,
  setPaymentMethod,
  selectedTransfer,
  setSelectedTransfer,
  handleCreateOrder,
  isModalOpen,
  setIsModalOpen,
  setSelectedBill,
  selectedBill,
  setAmountPaid,
  amountPaid,
}: ModalMoneyProps) {
  const bills = [5000, 10000, 20000, 50000, 100000];
  const paymentMethods = [
    { id: "daviplata", name: "Daviplata" },
    { id: "nequi", name: "Nequi" },
    { id: "bancolombia", name: "Bancolombia" },
    { id: "trasfiya", name: "Trasfiya" },
  ];
  const metodosDePago = [
    { id: "efectivo", name: "Efectivo" },
    { id: "transferencia", name: "Transferencia" },
  ];

  const handleBillSelection = (bill: number) => {
    setSelectedBill(bill);
    setAmountPaid(bill);
  };

  const calculateChange = (amountDue: number) => {
    if (amountPaid > amountDue) {
      return amountPaid - amountDue;
    }
    return 0;
  };

  const validarCantidad = (amount: number) => {
    if (amount > amountPaid) {
      return false;
    }
    return true;
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsModalOpen(false)}
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
                <Dialog.Title as="h3" className="my-5 text-4xl font-black">
                  Confirmar Venta
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Completa los campos y crea
                  <span className="text-bg-primary">una nueva venta</span>
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {bills.map((bill) => (
                      <button
                        key={bill}
                        className={`border rounded-lg p-4 text-center shadow-md transition hover:scale-105 focus:outline-none ${
                          selectedBill === bill
                            ? "bg-[#3e709f] text-white"
                            : "bg-white"
                        }`}
                        onClick={() => handleBillSelection(bill)}
                      >
                        <img
                          src={`/billetes/${bill}.jpg`}
                          alt={`Billete de ${bill}`}
                          className="w-auto h-20 mx-auto"
                          width={200}
                          height={200}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="payment-method"
                      className="block my-2 text-sm font-medium"
                    >
                      Método de pago:
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      name="payment-method"
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {metodosDePago.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {paymentMethod === "transferencia" && (
                    <div className="mt-4">
                      <label
                        htmlFor="payment-method"
                        className="block my-2 text-sm font-medium"
                      >
                        Plataforma de Pago:
                      </label>
                      <select
                        value={selectedTransfer}
                        onChange={(e) => setSelectedTransfer(e.target.value)}
                        name="payment-method"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {paymentMethods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                {paymentMethod === "efectivo" && (
                  <>
                    <p className="mt-4 text-lg font-semibold">
                      Total a pagar:{" "}
                      <span className="font-normal">
                        {formatCurrency(amount)}
                      </span>
                    </p>
                    <p className="mt-4 text-lg font-semibold">
                      Cambio a devolver: $
                      <span className="font-normal">
                        {calculateChange(amount).toLocaleString()}
                      </span>
                    </p>
                  </>
                )}
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full p-3 mt-5 font-bold text-white uppercase bg-red-600 rounded cursor-pointer hover:bg-red-800"
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={
                      !validarCantidad(amount) && paymentMethod === "efectivo"
                    }
                    onClick={handleCreateOrder}
                    className="w-full p-3 mt-5 font-bold text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800 disabled:opacity-50"
                  >
                    Confirmar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
