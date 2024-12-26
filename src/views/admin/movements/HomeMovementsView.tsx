import { useQuery } from "@tanstack/react-query";
import ButtonNavigate from "../../../components/shared/ButtonNavigate";
import Heading from "../../../components/shared/Heading";
import { statusCashRegister } from "../../../actions/ventas.actions";
import { userAuthStore } from "../../../store/useAuthStore";
import { useStorePoint } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import AddMovementModal from "../../../components/movements/AddMovementModal";
import { getAllMovementsCashDay } from "../../../actions/movements.actions";
import MovementsTable from "../../../components/movements/MovementsTable";
import EditTaskData from "../../../components/movements/EditTaskData";
import { useMemo } from "react";
import { formatCurrency } from "../../../utils/index";
import LottieAnimation from "@/components/ui/LottieAnimation";
import animationData from "../../../assets/vacioverde.json";
import animationMovements from "../../../assets/Movements.json";

export default function HomeMovementsView() {
  const user = userAuthStore((state) => state.user);
  const point = useStorePoint((state) => state.point);
  const navigate = useNavigate();

  const { data: cashRegisterData, isLoading: isLoadingCashRegister } = useQuery(
    {
      queryFn: () => statusCashRegister(+user!.id, +point),
      queryKey: ["statuscashregister"],
    }
  );

  const { data: movementsData, isLoading: isLoadingMovements } = useQuery({
    queryFn: () => getAllMovementsCashDay(+cashRegisterData!.id),
    queryKey: ["cashdaymovements"],
    enabled: !!cashRegisterData?.id,
  });

  const totalEgresos = useMemo(() => {
    if (!movementsData || movementsData.length === 0) return 0;
    return movementsData.reduce((total, item) => total + item.amount, 0);
  }, [movementsData]);

  if (isLoadingCashRegister) return "Cargando...";

  return (
    <>
      {movementsData ? (
        <div className="container px-4 py-4 mx-auto">
          <div className="flex flex-col gap-5 mb-6 lg:gap-0 lg:flex-row lg:justify-between">
            {!cashRegisterData?.id && (
              <ButtonNavigate label="Abrir Caja" toUrl="/cash-new" />
            )}
          </div>

          {cashRegisterData && (
            <>
              <div className="flex items-center justify-between mb-4">
                <Heading>Registro de Movimientos</Heading>
                <button
                  onClick={() => navigate(location.pathname + "?movement=true")}
                  className="w-full px-6 py-3 text-xl font-bold text-center text-white transition-all duration-300 bg-indigo-600 rounded-md hover:bg-indigo-700 lg:w-auto"
                >
                  Nuevo Movimiento
                </button>
              </div>

              {isLoadingMovements ? (
                <div>Cargando movimientos...</div>
              ) : movementsData?.length > 0 ? (
                <>
                  <p className="font-bold">
                    Total Gastos/Compras:{" "}
                    <span className="font-semibold">
                      {formatCurrency(totalEgresos)}
                    </span>
                  </p>
                  <MovementsTable movementsData={movementsData} />
                </>
              ) : (
                <div>
                  <LottieAnimation
                    animationData={animationMovements}
                    width={150}
                    height={150}
                  />
                  <p className="text-center text-gray-500">
                    No hay movimientos registrados para este día.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="py-4 text-xl text-center ">
          <LottieAnimation animationData={animationData} />
          <p>No has abierto caja el dia de hoy</p>
        </div>
      )}

      <EditTaskData />
      <AddMovementModal />
    </>
  );
}
