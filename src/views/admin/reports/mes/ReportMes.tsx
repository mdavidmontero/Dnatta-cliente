import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReportMes } from "../../../../actions/reports.actions";
import {
  calculateProductSalesSummary,
  formatCurrency,
} from "../../../../utils";
import { getPoints } from "../../../../actions/point.actions";
import { GroupedReports, Report } from "../../../../types/schemas/ventas";
import { useAuth } from "@/hook/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarSelector } from "@/components/shared/CalendarSelector";
import { addDays } from "date-fns";
import SalesExcelButton from "@/components/reports/mes/ReporExcelMes";
import ButtonGenerateExcel from "@/components/shared/ButtonGenerateExcel";
import { getUsers } from "@/actions/auth.actions";
import { SaleDetails } from "@/components/ventas/SaleDetails";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesReportPDF from "./SalesReportMes";

export default function ReportMonth() {
  const { data: user } = useAuth();
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -5),
    to: addDays(new Date(), 5),
  });

  const [point, setPoint] = useState<number>(0);

  const [userSelected, setUserSelected] = useState(0);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["reportMonth", dateSelected.from, dateSelected.to, point, user],
    queryFn: () =>
      getReportMes(
        dateSelected.from!.toISOString(),
        dateSelected.to!.toISOString(),
        point,
        +userSelected || 0
      ),
    enabled: false,
  });

  const { data: pointsData } = useQuery({
    queryKey: ["points"],
    queryFn: getPoints,
  });
  const usersData = useQuery({
    queryKey: ["getUsersMes"],
    queryFn: () => getUsers(),
    enabled: true,
  });

  const userVendedoras = usersData?.data?.filter(
    (user) => user.role !== "ADMIN"
  );

  const handleFetchReports = () => {
    if (point === 0) {
      alert("Selecciona un punto antes de buscar reportes.");
      return;
    }
    if (!dateSelected.from || !dateSelected.to) {
      alert("Selecciona un rango de fechas válido.");
      return;
    }
    refetch();
  };

  const productSalesSummary =
    data?.reports.flatMap((report) =>
      report.saleDetails.map((detail) => ({
        productName: detail.product.name,
        quantitySold: detail.quantity,
        totalAmountSold: detail.unitPrice * detail.quantity,
      }))
    ) || [];

  const groupedReports: GroupedReports = (data?.reports || []).reduce(
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

  const sortedDates = Object.keys(groupedReports).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const totalSalesYear = data?.totalAmount?._sum?.totalAmount || 0;
  const totalQuantitySold = productSalesSummary.reduce(
    (acc, product) => acc + product.quantitySold,
    0
  );

  if (user?.role !== "ADMIN") return <Navigate to="/404" />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-wrap justify-between gap-2 mb-6">
        <PDFDownloadLink
          document={<SalesReportPDF groupedReports={groupedReports} />}
          fileName={`Reporte de ${
            new Date().getMonth() + 1
          } de ${new Date().getFullYear()}`}
        >
          <Button className="bg-[#3C6997] rounded-lg text-white w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer">
            Generar PDF
          </Button>
        </PDFDownloadLink>

        <SalesExcelButton
          groupedReports={groupedReports}
          totalSalesYear={totalSalesYear}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Reportes de Ventas Mensual
        </h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <CalendarSelector setDateSelected={setDateSelected} />

        <Select onValueChange={(value) => setPoint(+value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un punto" />
          </SelectTrigger>
          <SelectContent>
            {pointsData?.map((point) => (
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

        <ButtonGenerateExcel
          handleGenerateReport={handleFetchReports}
          small
          title="Buscar Reportes"
        />
      </div>

      {isLoading ? (
        <div className="text-center">Cargando reportes...</div>
      ) : isError ? (
        <div className="text-center text-red-600">
          Error al cargar los reportes.
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-lg font-semibold text-gray-700">
            Venta Total:{" "}
            <span className="text-xl font-bold">
              {formatCurrency(totalSalesYear)}
            </span>
          </p>

          <SaleDetails
            productSalesSummary={productSalesSummary}
            totalQuantitySold={totalQuantitySold}
          />

          <div className="overflow-x-auto">
            <h2 className="my-4 text-2xl font-bold text-center">
              Detallado de Ventas
            </h2>
            {sortedDates.length ? (
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl">
                <thead>
                  <tr className="text-gray-700 bg-gray-100">
                    <th className="px-6 py-3 text-sm font-semibold text-left">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left">
                      Total Vendido
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDates.map((date) => {
                    const dailyReport = groupedReports[date];
                    if (dailyReport.reports.length === 0) return null;
                    const vendedoras = new Set(
                      dailyReport.reports.map((report) => report.user.name)
                    );

                    const productsForDate = dailyReport.reports.flatMap(
                      (report) =>
                        report.saleDetails.map((detail) => ({
                          productName: detail.product.name,
                          quantitySold: detail.quantity,
                          totalAmountSold: detail.unitPrice * detail.quantity,
                        }))
                    );

                    const groupedByCategory =
                      calculateProductSalesSummary(productsForDate);

                    return (
                      <React.Fragment key={date}>
                        <tr className="bg-gray-50">
                          <td
                            colSpan={4}
                            className="px-6 py-4 text-lg font-semibold text-gray-700 border-b"
                          >
                            Fecha: <span className="font-bold">{date}</span> -
                            Total:{" "}
                            <span className="font-bold text-green-600">
                              {formatCurrency(dailyReport.totalAmount)}
                            </span>{" "}
                            - Vendedoras:{" "}
                            <span className="text-lg font-semibold text-gray-700">
                              {([...vendedoras] as string[]).join(", ")}
                            </span>
                          </td>
                        </tr>

                        {groupedByCategory.map((categoryGroup) => (
                          <React.Fragment key={categoryGroup.category}>
                            <tr>
                              <td
                                colSpan={4}
                                className="px-6 py-3 text-base font-semibold text-gray-700 bg-gray-100"
                              >
                                {categoryGroup.category} -
                                {formatCurrency(categoryGroup.subtotal)} -
                                Cantidad: {categoryGroup.cantidad}
                              </td>
                            </tr>

                            {categoryGroup.products.map((product) => (
                              <tr
                                key={product.productName}
                                className="border-b bg-gray-50"
                              >
                                <td className="px-6 py-3 text-sm text-gray-600"></td>
                                <td className="px-6 py-3 text-sm text-gray-600">
                                  {product.productName}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-600">
                                  {product.quantitySold}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-600">
                                  {formatCurrency(product.totalAmountSold)}
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="mt-4 text-xl text-center text-gray-700">
                No hay reportes disponibles para este rango de fechas.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
