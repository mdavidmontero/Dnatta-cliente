import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import axios from "axios";
import { formatCurrency } from "../utils";
import { Button } from "./ui/button";
import { metodosDePago, paymentMethods, paymentMethodsCombinado } from "@/data";
import { toast } from "sonner";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/store";
import { userAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import CardTotal from "./ventas/CardTotal";

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
  cashAmount: string;
  setCashAmount: React.Dispatch<React.SetStateAction<string>>;
  sumaPagos: number;
  setSumaPagos: React.Dispatch<React.SetStateAction<number>>;
  mutationPending: boolean;
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
  mutationPending,
}: ModalMoneyProps) {
  // const bills = [5000, 10000, 20000, 50000, 100000];
  const sales = useStore((state) => state.order);
  const user = userAuthStore((state) => state.user);
  sales.map((sale) => sale.name);
  const tabla = sales
    .map(
      (producto) =>
        `${producto.name} - ${producto.quantity} - ${producto.subtotal}`
    )
    .join("\n");

  const payload = JSON.stringify({
    nombreImpresora: "POS-58",
    serial: "",
    operaciones: [
      { nombre: "Iniciar", argumentos: [] },
      { nombre: "Pulso", argumentos: [48, 60, 120] },
      { nombre: "EstablecerTamañoFuente", argumentos: [1, 1] },
      { nombre: "EstablecerEnfatizado", argumentos: [false] },
      { nombre: "EstablecerAlineacion", argumentos: [1] },
      { nombre: "EstablecerSubrayado", argumentos: [false] },
      { nombre: "EstablecerImpresionAlReves", argumentos: [false] },
      { nombre: "EstablecerImpresionBlancoYNegroInversa", argumentos: [false] },
      { nombre: "EstablecerRotacionDe90Grados", argumentos: [false] },
      {
        nombre: "EscribirTexto",
        argumentos: [
          `FACTURA DE VENTA\nFECHA: ${new Date().toLocaleString()}\nATENTIDO POR: ${
            user?.name
          }`,
        ],
      },
      { nombre: "Feed", argumentos: [1] },
      { nombre: "EscribirTexto", argumentos: ["RESUMEN DE COMPRA"] },
      { nombre: "Feed", argumentos: [1] },
      {
        nombre: "EscribirTexto",
        argumentos: [
          `--------------+--------+--------+\nDESCRIPCION|CANTIDAD|SUBTOTAL|\n--------------+--------+--------+\n${tabla}\n--------------+--------+--------+`,
        ],
      },
      { nombre: "Feed", argumentos: [1] },
      {
        nombre: "EscribirTexto",
        argumentos: [`TOTAL ${amount}`],
      },
      { nombre: "Feed", argumentos: [1] },
      { nombre: "EscribirTexto", argumentos: [`\nGracias por su compra`] },
      { nombre: "Feed", argumentos: [1] },
    ],
  });
  type Response = { ok: boolean; message: string };
  const printerTicked = async () => {
    try {
      const { data } = await axios.post<Response>(
        "http://localhost:8000/imprimir",
        payload
      );
      if (data.ok) {
        toast.success("Factura impresa");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al imprimir");
    }
  };

  const mutationPrinter = useMutation({
    mutationFn: printerTicked,
    onError: (error) => {
      toast.error(error.message || "Error al imprimir");
    },
  });

  const printer = async () => {
    mutationPrinter.mutate();
  };

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

  const calculateVuelto = (amountDue: number, amountPaid: number) => {
    const difference = amountPaid - amountDue;
    if (amountPaid > amountDue) {
      return 0;
    }

    return Math.round(difference);
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
      +cashAmount +
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
        payment.amount === +cashAmount
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
          amount: +cashAmount,
        },
      ]);
      setCashAmount("");
      setTransferAmounts({});
    }
  };

  const removePayment = (index: number) => {
    setPayments((prevState) => prevState.filter((_, i) => i !== index));
    const removedPayment = payments[index];
    const totalPaid =
      +cashAmount +
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
              <Dialog.Panel className="w-full max-w-lg p-6 shadow-xl bg-slate-50 rounded-3xl ring-2 ring-indigo-600">
                <Dialog.Title
                  as="h3"
                  className="mb-2 text-3xl font-extrabold text-gray-900"
                >
                  Confirmar Venta
                </Dialog.Title>

                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row justify-center">
                    <button
                      disabled={mutationPrinter.isPending}
                      onClick={printer}
                      className="flex items-center px-4 py-2 space-x-2 transition duration-200 ease-in-out bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <PrinterIcon className="w-4 h-4 text-indigo-600" />
                      <span className="text-base font-medium text-gray-800">
                        Imprimir Factura
                      </span>
                    </button>
                  </div>

                  {/* {paymentMethod === "efectivo" && (
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4">
                      {bills.map((bill) => (
                        <button
                          key={bill}
                          className={`p-3 rounded-lg shadow-lg transition transform hover:scale-110 focus:outline-none ${
                            selectedBill === bill
                              ? "bg-indigo-600 text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleBillSelection(bill)}
                        >
                          <p className="text-sm font-bold sm:text-base lg:hidden">
                            {bill}
                          </p>

                          <img
                            src={`/billetes/${bill}.jpg`}
                            alt={`Billete de ${bill}`}
                            className="hidden w-auto h-20 mx-auto sm:h-12 lg:block"
                          />
                        </button>
                      ))}
                    </div>
                  )} */}
                  {paymentMethod === "efectivo" && (
                    <CardTotal handleBillSelection={handleBillSelection} />
                  )}

                  <div className="mt-4">
                    <label
                      htmlFor="payment-method"
                      className="block mb-2 text-base font-semibold text-gray-700"
                    >
                      Método de pago:
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      name="payment-method"
                      className="block w-full p-2 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
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
                        className="block w-full p-2 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
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
                          className="block w-full p-2 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
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
                          onChange={(e) => setCashAmount(e.target.value)}
                          className="block w-full p-2 mt-4 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                        />
                        <Button
                          onClick={addPayment}
                          className="w-full p-4 mt-4 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-800"
                        >
                          Agregar Pago
                        </Button>

                        <div className="mt-2">
                          <p className="text-base font-bold">
                            Total a pagar:{" "}
                            <span className="font-normal text-gray-800">
                              {formatCurrency(amount)}
                            </span>
                          </p>
                          <p className="mt-2 text-base font-bold">
                            Total pagado:{" "}
                            <span className="font-normal text-gray-800">
                              {formatCurrency(sumaPagos)}
                            </span>
                          </p>
                        </div>

                        {payments.length > 0 && (
                          <div className="mt-2">
                            <p className="text-base font-semibold text-start">
                              Pagos Agregados:
                            </p>
                            {payments.map((payment, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 mt-2 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50"
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
                      <p className="text-lg font-bold ">
                        Total:{" "}
                        <span className="font-normal">
                          {formatCurrency(amount)}
                        </span>
                      </p>
                      {selectedBill > 0 && (
                        <>
                          <p className="text-lg font-bold">
                            Vuelto:
                            <span className="font-normal">
                              {formatCurrency(+calculateChange(amount))}
                            </span>
                          </p>
                          <p className="text-lg font-bold">
                            Restante:
                            <span className="font-normal">
                              {formatCurrency(
                                calculateVuelto(amount, selectedBill)
                              )}
                            </span>
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-4">
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
                      (paymentMethod === "combinado" && sumaPagos < amount) ||
                      mutationPending
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
