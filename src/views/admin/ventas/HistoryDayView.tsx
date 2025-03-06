import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPostVentas } from "@/actions/ventas.actions";
import CalendarShared, { Value } from "@/components/shared/CalendarShared";
import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/spinner/Spinner";
import HistoryDetailSale from "@/components/ventas/HistoryDetailSale";
import { userAuthStore } from "@/store/useAuthStore";
import { useStorePoint } from "@/store/userStore";
import { formatCurrency } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { startOfDay } from "date-fns";
import { useVentas } from "@/hook/useVentas";

export default function HistoryDayView() {
  const { pointsData } = useVentas();
  const currentPage = 1;
  const limit = 500;
  const [value, setValue] = useState<Value>(new Date());
  const pointUserAuthenticated = useStorePoint((state) => state.point);
  const [pointUser, setPointUser] = useState(pointUserAuthenticated);
  const userselected = userAuthStore((state) => state.user);

  const handleChange = (e: Value) => {
    const date = Array.isArray(e) ? e[0] : e;
    setValue(date || null);
  };

  const selectedDate = value instanceof Date ? startOfDay(value) : null;

  const { data, isLoading } = useQuery({
    queryKey: ["ventashistorial", selectedDate, pointUser || 0, userselected],
    queryFn: () =>
      getPostVentas(
        selectedDate!.toISOString(),
        currentPage,
        limit,
        +pointUser,
        userselected!.id!
      ),
    enabled: !!selectedDate || !!pointUser,
  });

  const totalAmount = data?.sales.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <Heading className="my-2 font-semibold">Detalle de Venta </Heading>
      <p className="my-2 text-lg">
        En esta sección aparecerán todas las ventas, utiliza el calendario para
        filtrar por fecha
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-6 ">
        <Select onValueChange={(value) => setPointUser(+value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un local" />
          </SelectTrigger>
          <SelectContent>
            {pointsData.data?.map((point) => (
              <SelectItem key={point.id} value={point.id.toString()}>
                {point.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="gap-5 justify-evenly md:flex md:items-start">
        <CalendarShared handleChange={handleChange} value={value} />

        <div className="p-5 space-y-5 md:w-1/2 lg:w-2/4">
          {isLoading && (
            <div className="flex items-center justify-center h-60">
              <Spinner />
            </div>
          )}
          {data && data.sales.length > 0 && (
            <>
              <p className="font-bold">
                Cantidad de Ventas Realizadas:{" "}
                <span className="font-semibold">{data?.totalSales}</span>
              </p>
              <p className="font-bold">
                Total de las ventas:{" "}
                <span className="font-semibold">
                  {formatCurrency(+totalAmount!)}
                </span>
              </p>
            </>
          )}
          {data && data.sales.length > 0 ? (
            data?.sales.map((sale) => <HistoryDetailSale sale={sale} />)
          ) : (
            <p className="text-lg text-center">
              No hay ventas para este periodo
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
