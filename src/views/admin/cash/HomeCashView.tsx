import { useQuery } from "@tanstack/react-query";
import CashTable from "../../../components/cash/CashTable";
import ButtonNavigate from "../../../components/shared/ButtonNavigate";
import Heading from "../../../components/shared/Heading";
import animationData from "../../../assets/vacioverde.json";
import { statusCashRegisterOneClosed } from "../../../actions/ventas.actions";
import { userAuthStore } from "../../../store/useAuthStore";
import { useStorePoint } from "../../../store/userStore";

import HomeMoneyCash from "../cashMoney/HomeCashMoney";
import LottieAnimation from "@/components/ui/LottieAnimation";

export default function HomeCashView() {
  const user = userAuthStore((state) => state.user);
  const point = useStorePoint((state) => state.point);

  const { data, isLoading } = useQuery({
    queryFn: () => statusCashRegisterOneClosed(+user!.id, +point),
    queryKey: ["cashregister"],
  });

  if (isLoading) return "Cargando...";
  return (
    <>
      <div className="container px-4 py-4 mx-auto">
        <div className="flex flex-col gap-5 mb-6 lg:gap-0 lg:flex-row lg:justify-between">
          {!data && <ButtonNavigate label="Abrir Caja" toUrl="/cash-new" />}
        </div>
        {data ? (
          <>
            <Heading>Gestión de Caja</Heading>

            <CashTable cash={data} />
          </>
        ) : (
          <div className="py-4 text-xl text-center ">
            <LottieAnimation animationData={animationData} />
            No has Abierto caja el dia de hoy
          </div>
        )}
      </div>
      <HomeMoneyCash />
    </>
  );
}
