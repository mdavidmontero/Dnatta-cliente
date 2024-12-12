import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../../../utils";
import { getPoints } from "../../../../actions/point.actions";
import { getReportsAnual } from "../../../../actions/reports.actions";
import { GroupedReports, Report } from "../../../../types/schemas/ventas";
import ModalReportesAnual from "./ModalReportes";
import { useAuth } from "@/hook/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ReportYear() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [point, setPoint] = useState<number>(0);
  const { data: user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getReportsAnual(selectedYear, point),
    queryKey: ["reportYear", selectedYear, point],
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
      </div>
      <div className="space-y-6">
        <p className="text-lg font-semibold text-gray-700">
          Venta Total del Año:{" "}
          <span className="text-xl font-bold">
            {formatCurrency(totalSalesYear)}
          </span>
        </p>

        <div className="space-y-4">
          {Object.keys(groupedReports).length ? (
            Object.keys(groupedReports).map((month) => {
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
            })
          ) : (
            <p className="text-xl text-center text-gray-700">
              No hay reportes para este año
            </p>
          )}
        </div>
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
