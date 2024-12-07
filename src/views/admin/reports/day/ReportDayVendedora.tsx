import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { startOfDay } from "date-fns";
import { getReportDiario } from "../../../../actions/reports.actions";
import Spinner from "../../../../components/shared/spinner/Spinner";
import { SaleDetails } from "../../../../components/ventas/SaleDetails";
import { ReportArray } from "../../../../types";
import { formatCurrency } from "../../../../utils";
import ModalReportes from "../ModalReportes";
import { getPoints } from "../../../../actions/point.actions";
import { getUsers } from "../../../../actions/auth.actions";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReportDayVendedora() {
  const [value, setValue] = useState<Value>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [point, setPoint] = useState(0);
  const [user, setUser] = useState(0);
  const [fetchData, setFetchData] = useState(false);

  const selectedDate = value instanceof Date ? startOfDay(value) : null;

  const { data, isLoading, isError } = useQuery<ReportArray | undefined>({
    queryKey: ["report", selectedDate, point, user],
    queryFn: () =>
      selectedDate && point && user
        ? getReportDiario(selectedDate.toISOString(), user, point)
        : Promise.resolve([]),
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

  const handleChange = (e: Value) => {
    const date = Array.isArray(e) ? e[0] : e;
    setValue(date || null);
  };

  const productSalesSummary =
    data?.flatMap((report) =>
      report.saleDetails.map((detail) => ({
        productName: detail.product.name,
        quantitySold: detail.quantity,
        totalAmountSold: detail.unitPrice * detail.quantity,
      }))
    ) || [];

  const totalQuantitySold = productSalesSummary.reduce(
    (acc, product) => acc + product.quantitySold,
    0
  );

  const totalAmountSold =
    data?.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const executeQuery = () => {
    if (selectedDate && point && user) {
      setFetchData(true);
    } else {
      alert("Selecciona fecha, local y usuario antes de buscar.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="bg-[#3C6997] rounded-lg text-white w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
        >
          Ver en PDF
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Resumen de Ventas
        </h1>
      </div>
      <div className="gap-5 md:flex md:items-start">
        <div className="flex justify-center p-5 bg-white border rounded-lg shadow-sm md:w-1/2 lg:w-1/3">
          <Calendar value={value} onChange={handleChange} />
        </div>
        <div className="p-5 space-y-5 md:w-1/2 lg:w-2/3">
          <div className="flex items-center gap-4 mb-6">
            <select
              name="local"
              id="local"
              onChange={(e) => setPoint(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={point}
            >
              <option value="">Seleccione un local</option>
              {pointsData.data?.map((point) => (
                <option key={point.id} value={point.id}>
                  {point.name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-3 border border-gray-300 rounded-md md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUser(parseInt(e.target.value))}
              value={user}
            >
              <option value="">Seleccione un usuario</option>
              {usersData.data?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <button
              onClick={executeQuery}
              className="w-full px-6 py-3 text-white transition-colors bg-blue-600 rounded-md md:w-auto hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center h-60">
              <Spinner />
            </div>
          )}
          {isError && <p>Error al cargar los datos.</p>}
          {!isLoading && !isError && (
            <>
              {selectedDate ? (
                <p className="text-lg font-semibold text-center text-gray-700">
                  Ventas de la fecha:{" "}
                  <span className="font-bold">
                    {selectedDate.toLocaleDateString("es-ES")}
                  </span>
                </p>
              ) : (
                <p className="text-lg font-extrabold text-center text-gray-900">
                  Selecciona una Fecha
                </p>
              )}
              <div className="space-y-5">
                {data && data.length > 0 ? (
                  <>
                    <p className="text-2xl font-bold text-right">
                      Total del día:
                      <span className="ml-2 font-extrabold">
                        {formatCurrency(totalAmountSold)}
                      </span>
                    </p>
                    <SaleDetails
                      productSalesSummary={productSalesSummary}
                      totalQuantitySold={totalQuantitySold}
                    />
                  </>
                ) : (
                  <p className="text-lg font-extrabold text-center text-gray-900">
                    No hay ventas en este día
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ModalReportes
          isOpen={isModalOpen}
          onClose={closeModal}
          data={data}
          totalAmountSold={totalAmountSold}
        />
      )}
    </div>
  );
}
