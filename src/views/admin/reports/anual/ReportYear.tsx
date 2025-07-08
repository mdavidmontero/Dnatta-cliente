import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../../../utils";
import { getPoints } from "../../../../actions/point.actions";
import { getReportsAnual } from "../../../../actions/reports.actions";
import { GroupedReports, Report } from "../../../../types/schemas/ventas";
import ModalReportesAnual from "./ModalReportes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChartAreaLinear } from "@/components/reports/ChartKpiSales";
import { useVentas } from "@/hook/useVentas";

export default function ReportYear() {
  const { userVendedoras } = useVentas();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [point, setPoint] = useState<number>(0);
  const [user, setUser] = useState(0);
  const [fetchData, setFetchData] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getReportsAnual(selectedYear, point, user || 0),
    queryKey: ["reportYear", selectedYear, point, user],
    enabled: fetchData,
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
  };

  const executeQuery = () => {
    if (selectedYear && point) {
      setFetchData(true);
    } else {
      alert("Selecciona fecha, local y usuario antes de buscar.");
    }
  };

  const reports = data?.reports || [];

  const groupedReports: GroupedReports = reports.reduce(
    (acc: GroupedReports, report: Report) => {
      const month = new Date(report.date).toLocaleString("es-ES", {
        month: "long",
      });
      if (!acc[month]) {
        acc[month] = { totalAmount: 0, reports: [] };
      }
      acc[month].totalAmount += report.totalAmount;
      acc[month].reports.push(report);
      return acc;
    },
    {}
  );

  const totalSalesYear = data?.totalAmount._sum?.totalAmount || 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
    <div className="w-full p-6 bg-white rounded-lg ">
      <div className="flex justify-end mb-6">
        <Button
          onClick={openModal}
          className="bg-[#3C6997] rounded-lg text-white w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
        >
          Ver en PDF
        </Button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Reportes de Ventas por Año
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <Select
          onValueChange={(value) => handleYearChange(+value)}
          value={selectedYear.toString()}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un año" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              { length: 5 },
              (_, index) => new Date().getFullYear() - index
            ).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(e) => setPoint(+e)} value={point.toString()}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un local" />
          </SelectTrigger>
          <SelectContent>
            {pointsData?.map((point) => (
              <SelectItem key={point.id} value={point.id.toString()}>
                {point.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setUser(+value)}>
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
      <div className="space-y-6">
        {isLoading ? (
          <div className="py-4 text-xl text-center">Cargando reportes...</div>
        ) : isError ? (
          <div className="py-4 text-xl text-center text-red-600">
            Error al cargar los reportes.
          </div>
        ) : reports.length === 0 ? (
          <p className="flex flex-col items-center justify-center gap-2 text-xl text-gray-500">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008H14.25V9.75zM7.5 16.5h9m-11.25 3h13.5A2.25 2.25 0 0021 17.25V6.75A2.25 2.25 0 0018.75 4.5h-13.5A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5z"
              />
            </svg>
            No hay reportes disponibles para este año
          </p>
        ) : (
          <>
            {reports.length > 0 && <ChartAreaLinear reports={groupedReports} />}
            {Object.keys(groupedReports).map((month) => {
              const monthlyReport = groupedReports[month];
              return (
                <div
                  key={month}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    Mes: <span className="text-xl font-bold">{month}</span>
                  </p>
                  <p className="text-lg">
                    Total del Mes:{" "}
                    <span className="font-semibold">
                      {formatCurrency(monthlyReport.totalAmount)}
                    </span>
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>

      {isModalOpen && (
        <ModalReportesAnual
          isOpen={isModalOpen}
          onClose={closeModal}
          groupedReports={groupedReports}
          totalYearlySales={totalSalesYear}
        />
      )}
    </div>
  );
}
