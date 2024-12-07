import { useMemo, useState } from "react";
import { useStore } from "../../store/store";
import ProductsDetails from "./ProductsDetails";
import { formatCurrency } from "../../utils";
import { userAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { createOrder } from "../../actions/ventas.actions";
import { useStorePoint } from "../../store/userStore";
import ModalMoney from "../ModalMoney";

export default function OrderSummary() {
  const saleDetails = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const point = useStorePoint((state) => state.point);
  const user = userAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [selectedTransfer, setSelectedTransfer] = useState("otro");
  const [selectedBill, setSelectedBill] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  const totalAmount = useMemo(
    () =>
      saleDetails.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      ),
    [saleDetails]
  );

  const handleCreateOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = {
      totalAmount,
      paymentType: paymentMethod === "efectivo" ? "efectivo" : "transferencia",
      transferPlatform: selectedTransfer ? selectedTransfer : "otro",
      userId: user!.id,
      pointId: +point,
      saleDetails,
    };
    await createOrder(data);
    setPaymentMethod("efectivo");
    setSelectedTransfer("otro");
    setIsModalOpen(!isModalOpen);
    setSelectedBill(0);
    setAmountPaid(0);
    toast.success("Pedido Realizado Correctamente");
    clearOrder();
  };
  return (
    <aside className="p-5 lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-64 ">
      <h1 className="text-4xl font-black text-center">Mi Pedido</h1>
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

          <button type="button" onClick={() => setIsModalOpen(true)}>
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
      />
    </aside>
  );
}
