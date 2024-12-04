import { useMemo, useState } from "react";
import { useStore } from "../../store/store";
import ProductsDetails from "./ProductsDetails";
import { formatCurrency } from "../../utils";
import { userAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { createOrder } from "../../actions/ventas.actions";

export default function OrderSummary() {
  const saleDetails = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  // const point = useStorePoint((state) => state.point);
  const user = userAuthStore((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  // const [selectedTransfer, setSelectedTransfer] = useState("otro");
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
      transferPlatform: "nequi",
      userId: user!.id,
      pointId: 1,
      saleDetails,
    };
    await createOrder(data);
    setPaymentMethod("");
    // setSelectedTransfer("");
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
          {/* <p className="mt-5 text-xl text-start">{session?.user.name}</p> */}
          <p className="mt-5 text-xl text-right">
            Total a Pagar: {""}
            <span className="font-bold">{formatCurrency(totalAmount)}</span>
          </p>
          <form className="w-full mt-10 space-y-5">
            {/* <input
              type="text"
              placeholder="Tu nombre"
              className="w-full p-2 bg-white border boder-gray-100"
              name="name"
            /> */}

            {/* <ModalMoney
            amount={totalAmount}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            selectedTransfer={selectedTransfer}
            setSelectedTransfer={setSelectedTransfer}
          >
            <button onClick={handleCreateOrde}>Confirmar Pago</button>
          </ModalMoney> */}
            <button onClick={handleCreateOrder} className="p-5 bg-blue-500">
              Confirmar Pago
            </button>
            <span></span>
          </form>
        </div>
      )}
    </aside>
  );
}
