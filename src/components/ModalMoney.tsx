import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

import { formatCurrency } from "../utils";
import { Button } from "./ui/button";
import { metodosDePago, paymentMethods, paymentMethodsCombinado } from "@/data";
import { toast } from "sonner";
import TickeSale from "./cash/TickerSale";
import { PDFViewer } from "@react-pdf/renderer";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/store";
import { userAuthStore } from "@/store/useAuthStore";

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
  selectedBill: number;
  setSelectedBill: React.Dispatch<React.SetStateAction<number>>;
  setAmountPaid: React.Dispatch<React.SetStateAction<number>>;
  amountPaid: number;
  transferAmounts: {
    [key: string]: number;
  };
  setTransferAmounts: React.Dispatch<
    React.SetStateAction<{
      [key: string]: number;
    }>
  >;
  payments: {
    method: string;
    transferPlatform: string;
    amount: number;
  }[];
  setPayments: React.Dispatch<
    React.SetStateAction<
      {
        method: string;
        transferPlatform: string;
        amount: number;
      }[]
    >
  >;
  setSelecttrasferCombinado: React.Dispatch<React.SetStateAction<string>>;
  selecttrasferCombinado: string;
  cashAmount: number;
  setCashAmount: React.Dispatch<React.SetStateAction<number>>;
  sumaPagos: number;
  setSumaPagos: React.Dispatch<React.SetStateAction<number>>;
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
  transferAmounts,
  setTransferAmounts,
  payments,
  setPayments,
  selecttrasferCombinado,
  setSelecttrasferCombinado,
  cashAmount,
  setCashAmount,
  sumaPagos,
  setSumaPagos,
}: ModalMoneyProps) {
  const bills = [5000, 10000, 20000, 50000, 100000];
  const [viewTicked, setViewTicked] = useState(false);
  const sales = useStore((state) => state.order);
  const user = userAuthStore((state) => state.user);

  useEffect(() => {
    if (paymentMethod === "efectivo" || paymentMethod === "transferencia") {
      setPayments([
        {
          method: paymentMethod,
          transferPlatform: selectedTransfer,
          amount: amount,
        },
      ]);
    }
    if (paymentMethod === "combinado") {
      setSumaPagos(0);
      setPayments([]);
    }
  }, [paymentMethod, selectedTransfer, amount, setPayments]);

  // useEffect(() => {
  //   if (paymentMethod === "combinado") {
  //     setSumaPagos(0);
  //     setPayments([]);
  //   }
  // }, [paymentMethod]);

  const handleBillSelection = (bill: number) => {
    if (paymentMethod === "efectivo") {
      setSelectedBill(bill);
      setAmountPaid(bill);
    }
  };

  const calculateChange = (amountDue: number) => {
    if (amountPaid > amountDue) {
      return amountPaid - amountDue;
    }
    return 0;
  };

  const validarCantidad = (amount: number) => {
    if (paymentMethod === "efectivo") {
      return amountPaid >= amount;
    }
    if (paymentMethod === "transferencia") {
      return true;
    }
    if (paymentMethod === "combinado") {
      return true;
    }
  };

  const addPayment = () => {
    const totalPaid =
      cashAmount +
      Object.values(transferAmounts).reduce((acc, curr) => acc + curr, 0);
    const totalAmountPaid = totalPaid + sumaPagos;

    if (totalAmountPaid > amount) {
      toast.error(
        "La suma total de los pagos no puede superar el monto a pagar."
      );
      return;
    }

    const paymentExists = payments.some(
      (payment) =>
        payment.method ===
          (selecttrasferCombinado === "efectivo"
            ? "efectivo"
            : "transferencia") &&
        payment.transferPlatform === selecttrasferCombinado &&
        payment.amount === cashAmount
    );

    if (paymentExists) {
      toast.success("Este pago ya ha sido agregado.");
      return;
    }

    setSumaPagos(totalAmountPaid);
    if (paymentMethod === "combinado") {
      setPayments((prevState) => [
        ...prevState,
        {
          method:
            selecttrasferCombinado === "efectivo"
              ? "efectivo"
              : "transferencia",
          transferPlatform:
            selecttrasferCombinado === "efectivo"
              ? "otro"
              : selecttrasferCombinado,
          amount: cashAmount,
        },
      ]);
      setCashAmount(0);
      setTransferAmounts({});
    }
  };

  const removePayment = (index: number) => {
    setPayments((prevState) => prevState.filter((_, i) => i !== index));
    const removedPayment = payments[index];
    const totalPaid =
      cashAmount +
      Object.values(transferAmounts).reduce((acc, curr) => acc + curr, 0);
    const totalAmountPaid = totalPaid + sumaPagos - removedPayment.amount;
    setSumaPagos(totalAmountPaid);
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
          <div className="fixed inset-0 bg-black/70" />
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
              <Dialog.Panel className="w-full max-w-lg p-6 bg-white shadow-xl rounded-3xl ring-2 ring-indigo-600">
                <Dialog.Title
                  as="h3"
                  className="mb-6 text-3xl font-extrabold text-gray-900"
                >
                  Confirmar Venta
                </Dialog.Title>

                <p className="mb-6 text-lg text-gray-700">
                  Completa los campos y crea{" "}
                  <span className="font-semibold text-indigo-600">
                    una nueva venta
                  </span>
                </p>

                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => setViewTicked(!viewTicked)}
                    className="self-end p-2 transition duration-200 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
                  >
                    <PrinterIcon className="w-6 h-6 text-indigo-600" />
                  </button>
                  {viewTicked && (
                    <div className="w-full max-w-3xl mx-auto">
                      <PDFViewer
                        width="100%"
                        height="500px"
                        className="rounded-lg shadow-lg"
                      >
                        <TickeSale
                          sale={sales}
                          paymentMethod={paymentMethod}
                          user={user}
                        />
                      </PDFViewer>
                    </div>
                  )}
                  {paymentMethod === "efectivo" && (
                    <div className="flex flex-wrap items-center justify-center gap-6">
                      {bills.map((bill) => (
                        <button
                          key={bill}
                          className={`p-4 rounded-lg shadow-lg transition transform hover:scale-105 focus:outline-none ${
                            selectedBill === bill
                              ? "bg-indigo-600 text-white"
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
                  )}

                  <div className="mt-4">
                    <label
                      htmlFor="payment-method"
                      className="block mb-2 text-sm font-semibold text-gray-700"
                    >
                      Método de pago:
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      name="payment-method"
                      className="block w-full p-4 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
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
                        htmlFor="transferPlatform"
                        className="block mb-2 text-sm font-semibold text-gray-700"
                      >
                        Plataforma de Pago:
                      </label>
                      <select
                        value={selectedTransfer}
                        onChange={(e) => setSelectedTransfer(e.target.value)}
                        name="transfer-method"
                        className="block w-full p-4 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                      >
                        {paymentMethods.map((method, index) => (
                          <option value={method.id} key={index}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {paymentMethod === "combinado" && (
                    <div className="mt-4 space-y-6">
                      <div>
                        <label
                          htmlFor="transferAmount"
                          className="block mb-2 text-sm font-semibold text-gray-700"
                        >
                          Monto de Transferencia:
                        </label>
                        <select
                          value={selecttrasferCombinado}
                          onChange={(e) =>
                            setSelecttrasferCombinado(e.target.value)
                          }
                          name="transferAmount"
                          className="block w-full p-4 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                        >
                          {paymentMethodsCombinado.map((method, index) => (
                            <option value={method.id} key={index}>
                              {method.name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          id="cashAmount"
                          value={cashAmount}
                          onChange={(e) =>
                            setCashAmount(Number(e.target.value))
                          }
                          className="block w-full p-4 mt-4 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                        />
                        <Button
                          onClick={addPayment}
                          className="w-full p-4 mt-4 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-800"
                        >
                          Agregar Pago
                        </Button>

                        <div className="mt-6">
                          <p className="text-lg font-semibold">
                            Total a pagar:{" "}
                            <span className="font-normal text-gray-800">
                              {formatCurrency(amount)}
                            </span>
                          </p>
                          <p className="mt-2 text-lg font-semibold">
                            Total pagado:{" "}
                            <span className="font-normal text-gray-800">
                              {formatCurrency(sumaPagos)}
                            </span>
                          </p>
                        </div>

                        {payments.length > 0 && (
                          <div className="mt-6">
                            <p className="text-lg font-semibold">
                              Pagos Agregados:
                            </p>
                            {payments.map((payment, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 mt-4 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50"
                              >
                                <span>
                                  {payment.method} - {payment.transferPlatform}:{" "}
                                  {formatCurrency(payment.amount)}
                                </span>
                                <button
                                  onClick={() => removePayment(index)}
                                  className="text-red-600 hover:underline"
                                >
                                  Eliminar
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {paymentMethod === "efectivo" && (
                    <div>
                      <p className="mt-4 text-lg font-semibold">
                        Total a pagar:{" "}
                        <span className="font-normal">
                          {formatCurrency(amount)}
                        </span>
                      </p>
                      {selectedBill > 0 && (
                        <p className="mt-4 text-lg font-semibold">
                          Cambio a devolver: $
                          <span className="font-normal">
                            {calculateChange(amount).toLocaleString()}
                          </span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full p-4 text-white bg-red-600 rounded-lg hover:bg-red-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    disabled={
                      !validarCantidad(amount) ||
                      (paymentMethod === "efectivo" && selectedBill === 0) ||
                      (paymentMethod === "combinado" && sumaPagos < amount)
                    }
                    onClick={handleCreateOrder}
                    className="w-full p-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-800 disabled:opacity-50"
                  >
                    Confirmar
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
