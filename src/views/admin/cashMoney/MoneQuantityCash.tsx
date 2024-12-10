import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import { statusCashRegister } from "../../../actions/ventas.actions";
import { userAuthStore } from "../../../store/useAuthStore";
import { useStorePoint } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import HomeMoneyCash from "../cashMoney/HomeCashMoney";
import MoneyTable from "../../../components/cash/MoneyTable";
import { getMoneyCashDay } from "../../../actions/movements.actions";
import { useMemo } from "react";
import { formatCurrency } from "../../../utils";

export default function MoneyQuantityCashView() {
  const user = userAuthStore((state) => state.user);
  const point = useStorePoint((state) => state.point);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryFn: () => statusCashRegister(+user!.id, +point),
    queryKey: ["cashmoneyactive"],
  });

  const { data: moneyCashday } = useQuery({
    queryFn: () => getMoneyCashDay(+data!.id),
    queryKey: ["cashmoneyday"],
    enabled: !!data?.id,
  });
  const totalBilletes = useMemo(() => {
    if (!moneyCashday || moneyCashday.length === 0) return 0;
    return moneyCashday.reduce(
      (total, item) => total + item.totalDenomination,
      0
    );
  }, [moneyCashday]);

  if (isLoading) return "Cargando...";

  return (
    <>
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Heading>Registro dinero en Caja</Heading>
          {!moneyCashday?.length && (
            <button
              className="py-2 font-bold text-white bg-green-600 rounded-full hover:bg-green-700 px-9"
              onClick={() => navigate(location.pathname + "?newMoney=true")}
            >
              Registrar Dinero en Caja
            </button>
          )}
        </div>
        {moneyCashday?.length ? (
          <>
            <p className="font-bold">
              Total Suma Billetes:{" "}
              <span className="font-semibold">
                {formatCurrency(totalBilletes)} Pesos
              </span>
            </p>
            <MoneyTable money={moneyCashday} />
          </>
        ) : (
          <>
            <p className="text-xl text-center">
              No has registrado dinero en caja el dia de hoy
            </p>
          </>
        )}
      </div>
      <HomeMoneyCash />
    </>
  );
}
