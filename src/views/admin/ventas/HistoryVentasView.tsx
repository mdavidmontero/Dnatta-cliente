import { useState } from "react";
import { getPostVentas } from "@/actions/ventas.actions";
import CalendarShared, { Value } from "@/components/shared/CalendarShared";
import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/spinner/Spinner";
import { formatCurrency, getImagePath } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { startOfDay } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPoints } from "@/actions/point.actions";
import { getUsers } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

export default function HistoryVentasView() {
  const [value, setValue] = useState<Value>(new Date());
  const currentPage = 1;
  const limit = 500;

  const [pointUser, setPointUser] = useState(0);
  const [userselected, setUserSelected] = useState(0);
  const [fetchData, setFetchData] = useState(false);
  const handleChange = (e: Value) => {
    const date = Array.isArray(e) ? e[0] : e;
    setValue(date || null);
  };

  const selectedDate = value instanceof Date ? startOfDay(value) : null;

  const { data, isLoading } = useQuery({
    queryKey: ["ventashistoryday", selectedDate, pointUser || 0, userselected],
    queryFn: () =>
      getPostVentas(
        selectedDate!.toISOString(),
        currentPage,
        limit,
        +pointUser,
        +userselected
      ),

    enabled: fetchData,
  });

  const pointsData = useQuery({
    queryKey: ["points"],
    queryFn: () => getPoints(),
    enabled: true,
  });

  const usersData = useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers(),
    enabled: true,
  });
  const userVendedoras = usersData?.data?.filter(
    (user) => user.role !== "ADMIN"
  );
  const executeQuery = () => {
    if (selectedDate && pointUser) {
      setFetchData(true);
    } else {
      alert("Selecciona fecha, local antes de buscar.");
    }
  };

  const totalAmount = data?.sales.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <Heading className="my-2 font-semibold">Ventas</Heading>
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

        <Select onValueChange={(value) => setUserSelected(+value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="0" value="0">
              Todas
            </SelectItem>
            {userVendedoras?.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={executeQuery}
          className="w-full px-6 py-3 text-white transition-colors rounded-md bg-bg-primary md:w-auto hover:bg-[#44719e]"
        >
          Buscar
        </Button>
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
            data?.sales.map((sale) => (
              <div
                key={sale.id}
                className="mt-6 overflow-hidden text-sm font-medium text-gray-500 border border-gray-300 rounded-lg"
              >
                <p className="p-2 text-sm font-black text-gray-900 bg-gray-200 ">
                  ID: {sale.id}
                </p>
                <ul
                  role="list"
                  className="border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {sale.saleDetails.map((detail) => (
                    <li key={detail.id} className="flex items-start gap-6 p-5">
                      <div className="relative flex-shrink-0 w-24 h-24">
                        <img
                          src={getImagePath(detail.product.image)}
                          alt={detail.product.name}
                          className="object-cover w-full h-full rounded-md"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="font-semibold text-gray-600">
                          Hora: {new Date(sale.date).toLocaleTimeString()}
                        </p>
                        <h3 className="font-medium text-gray-900">
                          {detail.product.name}
                        </h3>
                        <p className="text-lg font-extrabold text-gray-900">
                          {formatCurrency(detail.product.price)}
                        </p>
                        <p className="text-lg text-gray-900">
                          Cantidad: {detail.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-5">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Métodos de Pago
                  </h4>
                  <ul className="space-y-1 text-gray-800">
                    {sale.payments.map((platform, index) => (
                      <li key={index} className="text-sm capitalize">
                        {platform.method} - {formatCurrency(platform.amount)}
                        {platform.transferPlatform !== "otro" && (
                          <p className="font-semibold capitalize">
                            Plataforma:{" "}
                            <span className="font-normal">
                              {platform.transferPlatform}
                            </span>
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between pt-2 mt-4 text-lg font-black text-black border-t">
                    <span>Total</span>
                    <span>{formatCurrency(sale.totalAmount)}</span>
                  </div>
                </div>
              </div>
            ))
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
