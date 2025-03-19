import { useMemo, useState } from "react";
import { useStore } from "../../store/store";
import ProductsDetails from "./ProductsDetails";
import { formatCurrency } from "../../utils";
import { userAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { createOrder } from "../../actions/ventas.actions";
import { useStorePoint } from "../../store/userStore";
import ModalMoney from "../ModalMoney";
import { useMutation } from "@tanstack/react-query";
import OpenDrawerCash from "../shared/OpenDrawerCash";

export default function OrderSummary() {
  const saleDetails = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const openCashDrawer = useStore((state) => state.openCashDrawer);
  const point = useStorePoint((state) => state.point);
  const user = userAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [selectedTransfer, setSelectedTransfer] = useState("otro");
  const [cashAmount, setCashAmount] = useState("");

  const [sumaPagos, setSumaPagos] = useState(0);
  const [selecttrasferCombinado, setSelecttrasferCombinado] =
    useState("efectivo");
  const [selectedBill, setSelectedBill] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [transferAmounts, setTransferAmounts] = useState<{
    [key: string]: number;
  }>({});
  const [payments, setPayments] = useState<
    { method: string; transferPlatform: string; amount: number }[]
  >([]);
  const totalAmount = useMemo(
    () =>
      saleDetails.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      ),
    [saleDetails]
  );
  const resetPaymentState = () => {
    setPaymentMethod("efectivo");
    setSelectedTransfer("otro");
    setPayments([]);
    setIsModalOpen(false);
    setTransferAmounts({});
    setSelecttrasferCombinado("efectivo");
    setSelectedBill(0);
    setAmountPaid(0);
    setCashAmount("");
    setSumaPagos(0);
  };

  const mutationCreateOrder = useMutation({
    mutationFn: createOrder,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      resetPaymentState();
      toast.success(data);
      openCashDrawer();
      clearOrder();
    },
  });

  const handleCreateOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const orderData = {
      totalAmount,
      payments,
      saleDetails,
      userId: user!.id,
      pointId: +point,
    };
    mutationCreateOrder.mutate(orderData);
  };

  return (
    <>
      <aside className="p-5 lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-64">
        <h1 className="text-4xl font-black text-center">Pedido</h1>
        {saleDetails.length === 0 ? (
          <p className="my-10 text-center">El Pedido esta vacio</p>
        ) : (
          <div className="mt-5">
            {saleDetails.map((item) => (
              <ProductsDetails key={item.id} item={item} />
            ))}

            <p className="mt-5 text-xl text-right">
              Total a Pagar: {""}
              <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </p>

            <button
              className="w-full p-3 mt-5 font-bold text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800 disabled:opacity-50"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Confirmar Pago
            </button>
          </div>
        )}
        <ModalMoney
          amount={totalAmount}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          selectedTransfer={selectedTransfer}
          setSelectedTransfer={setSelectedTransfer}
          handleCreateOrder={handleCreateOrder}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setSelectedBill={setSelectedBill}
          selectedBill={selectedBill}
          amountPaid={amountPaid}
          setAmountPaid={setAmountPaid}
          transferAmounts={transferAmounts}
          setTransferAmounts={setTransferAmounts}
          payments={payments}
          setPayments={setPayments}
          setSelecttrasferCombinado={setSelecttrasferCombinado}
          selecttrasferCombinado={selecttrasferCombinado}
          cashAmount={cashAmount}
          setCashAmount={setCashAmount}
          sumaPagos={sumaPagos}
          setSumaPagos={setSumaPagos}
          mutationPending={mutationCreateOrder.isPending}
        />
      </aside>
      <OpenDrawerCash />
    </>
  );
}
