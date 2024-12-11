import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReportMes } from "../../../../actions/reports.actions";
import { formatCurrency } from "../../../../utils";
import { getPoints } from "../../../../actions/point.actions";
import { GroupedReports, Report } from "../../../../types/schemas/ventas";
import ModalReportesMes from "./ModalReportes";
import { useAuth } from "@/hook/useAuth";
import { Navigate } from "react-router-dom";

export default function ReportMonth() {
  const { data: user } = useAuth();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [point, setPoint] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reportMonth", selectedYear, selectedMonth, point],
    queryFn: () => getReportMes(selectedYear, selectedMonth, point),
    enabled: point !== 0,
  });

  const {
    data: pointsData,
    isLoading: pointsLoading,
    isError: pointsError,
  } = useQuery({
    queryKey: ["points"],
    queryFn: getPoints,
  });

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedMonth(0);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const reports = data?.reports || [];

  const groupedReports: GroupedReports = reports.reduce(
    (acc: GroupedReports, report: Report) => {
      const date = new Date(report.date).toLocaleDateString("es-ES");
      if (!acc[date]) {
        acc[date] = { totalAmount: 0, reports: [] };
      }
      acc[date].totalAmount += report.totalAmount;
      acc[date].reports.push(report);
      return acc;
    },
    {}
  );
  const totalSalesYear = data?.totalAmount._sum.totalAmount || 0;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (user?.role !== "ADMIN") return <Navigate to="/404" />;
  if (isLoading)
    return <div className="py-4 text-xl text-center">Cargando reportes...</div>;

  if (isError)
    return (
      <div className="py-4 text-xl text-center text-red-600">
        Error al cargar los reportes.
      </div>
    );

  if (pointsLoading)
    return <div className="py-4 text-xl text-center">Cargando puntos...</div>;

  if (pointsError)
    return (
      <div className="py-4 text-xl text-center text-red-600">
        Error al cargar los puntos.
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-end mb-6">
        <button
          onClick={openModal}
          className="bg-[#3C6997] rounded-lg text-white w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
        >
          Ver en PDF
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Reportes de Ventas
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:w-1/3"
        >
          {Array.from(
            { length: 5 },
            (_, index) => new Date().getFullYear() - index
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {selectedYear && (
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:w-1/3"
          >
            <option value={0}>Seleccionar Mes</option>
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (month) => (
                <option key={month} value={month}>
                  {month < 10 ? `0${month}` : month}
                </option>
              )
            )}
          </select>
        )}

        <select
          name="local"
          id="local"
          onChange={(e) => setPoint(parseInt(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-md md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={point}
        >
          <option value={0}>Seleccione un local</option>
          {pointsData?.map((point) => (
            <option key={point.id} value={point.id}>
              {point.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-6">
        <p className="text-lg font-semibold text-gray-700">
          Venta Total:{" "}
          <span className="text-xl font-bold">
            {formatCurrency(totalSalesYear)}
          </span>
        </p>

        <div className="space-y-4">
          {Object.keys(groupedReports).length ? (
            Object.keys(groupedReports).map((date) => {
              const dailyReport = groupedReports[date];
              return (
                <div
                  key={date}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    Fecha: <span className="text-xl font-bold">{date}</span>
                  </p>
                  <p className="text-lg">
                    Total del día:{" "}
                    <span className="font-semibold">
                      {formatCurrency(dailyReport.totalAmount)}
                    </span>
                  </p>
                  {/* <p className="text-g">
                    <span className="font-semibold">
                      {JSON.stringify(dailyReport.reports.user.map(user))}
                    </span>
                  </p> */}
                </div>
              );
            })
          ) : (
            <p className="text-xl text-center text-gray-700">
              No hay reportes para este mes
            </p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <ModalReportesMes
          isOpen={isModalOpen}
          onClose={closeModal}
          groupedReports={groupedReports}
        />
      )}
    </div>
  );
}
