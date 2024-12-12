import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import { statusCashRegister } from "../../../actions/ventas.actions";
import { userAuthStore } from "../../../store/useAuthStore";
import { useStorePoint } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";

import MoneyTable from "../../../components/cash/MoneyTable";
import { getMoneyCashDay } from "../../../actions/movements.actions";
import { useMemo } from "react";
import { formatCurrency } from "../../../utils";
import HomeMoneyCash from "./HomeCashMoney";
import { Button } from "@/components/ui/button";

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
      {!data?.id ? (
        <p className="text-xl text-center">No has Abierto caja el dia de hoy</p>
      ) : (
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Heading>Registro dinero en Caja</Heading>
            {!moneyCashday?.length && (
              <Button
                className="py-2 font-bold text-white bg-[#2d547c] rounded-full hover:bg-[#44719e] px-9"
                onClick={() => navigate(location.pathname + "?newMoney=true")}
              >
                Registrar Dinero en Caja
              </Button>
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
      )}

      <HomeMoneyCash />
    </>
  );
}
