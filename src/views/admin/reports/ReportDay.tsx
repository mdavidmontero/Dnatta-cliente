import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getReportDiario,
  getReportDiarioTotal,
} from "../../../actions/reports.actions";
import { startOfDay } from "date-fns";
import Spinner from "../../../components/shared/spinner/Spinner";
import { calculateDataCashDay, formatCurrency } from "../../../utils";
import { SaleDetails } from "../../../components/ventas/SaleDetails";
import { ReportArray } from "../../../types";
import ModalReportes from "./ModalReportes";
import { userAuthStore } from "../../../store/useAuthStore";
import { useStorePoint } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProfessionalExcelReport } from "@/components/reports/day/ReportExcel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { reportsCash } from "@/actions/reportsCash.actions";
import { useVentas } from "@/hook/useVentas";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReportDay() {
  const navigation = useNavigate();
  const { pointsData } = useVentas();
  const [value, setValue] = useState<Value>(new Date());
  const user = userAuthStore((state) => state.user);
  const point = useStorePoint((state) => state.point);
  const [pointUser, setPointUser] = useState(point);

  const selectedDate = value instanceof Date ? startOfDay(value) : null;

  const { data, isLoading, isError } = useQuery<ReportArray | undefined>({
    queryKey: ["report", selectedDate, pointUser],
    queryFn: () =>
      selectedDate
        ? getReportDiario(selectedDate.toISOString(), +user!.id, +pointUser)
        : Promise.resolve([]),
    enabled: !!selectedDate || !!pointUser,
  });
  const { data: datacash } = useQuery({
    queryKey: ["reportscashdaypoint", selectedDate],
    queryFn: () =>
      selectedDate
        ? reportsCash(selectedDate.toISOString())
        : Promise.resolve([]),
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

  const reportetotal = useQuery<ReportArray | undefined>({
    queryKey: ["reportsfinales", selectedDate],
    queryFn: () =>
      selectedDate
        ? getReportDiarioTotal(selectedDate.toISOString(), +point)
        : Promise.resolve([]),
    enabled: !!selectedDate,
  });

  const productSalesSummaryTotal =
    reportetotal.data?.flatMap((report) =>
      report.saleDetails.map((detail) => ({
        productName: detail.product.name,
        quantitySold: detail.quantity,
        totalAmountSold: detail.unitPrice * detail.quantity,
      }))
    ) || [];

  const totalQuantitySoldTotal = productSalesSummaryTotal.reduce(
    (acc, product) => acc + product.quantitySold,
    0
  );

  const totalAmountSoldTotal =
    reportetotal.data?.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0;

  const totalsMoney = datacash
    ? calculateDataCashDay(datacash).find((item) => item.punto === point)
    : undefined;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-wrap justify-between gap-2 mb-6">
        <Button
          onClick={() => navigation(location.pathname + "?reportcashone=true")}
          className="bg-[#3C6997] rounded-lg text-white w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
        >
          Ver en PDF
        </Button>
        <ProfessionalExcelReport
          ordenes={reportetotal.data}
          totalday={totalAmountSoldTotal}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Resumen de Ventas
        </h1>
      </div>
      <div className="gap-5 md:flex md:items-start">
        <div className="flex justify-center w-full max-w-md p-5 bg-white border rounded-lg shadow-sm md:w-2/3 lg:w-1/3 lg:sticky lg:top-10">
          <div className="flex flex-col w-full gap-4">
            <Select onValueChange={(value) => setPointUser(+value)}>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Seleccione un local" />
              </SelectTrigger>
              <SelectContent className="w-full max-w-sm">
                {pointsData.data?.map((point) => (
                  <SelectItem key={point.id} value={point.id.toString()}>
                    {point.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Calendar
              value={value}
              onChange={handleChange}
              className="w-full max-w-sm rounded-xl"
            />
          </div>
        </div>

        <div className="p-5 space-y-5 md:w-1/2 lg:w-2/3">
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
                {data ? (
                  data.length > 0 ? (
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
                      <hr />
                      <p className="text-lg font-bold text-center text-gray-800">
                        Ventas Totales del Día
                      </p>
                      <p className="text-2xl font-bold text-right">
                        Total del día:
                        <span className="ml-2 font-extrabold">
                          {formatCurrency(totalAmountSoldTotal)}
                        </span>{" "}
                      </p>
                      <SaleDetails
                        productSalesSummary={productSalesSummaryTotal}
                        totalQuantitySold={totalQuantitySoldTotal}
                      />
                      <div className="flex flex-col gap-4">
                        <p className="text-lg font-bold">Total Dinero</p>
                        {totalsMoney ? (
                          <div className="mb-6">
                            <p className="text-gray-700">
                              <span className="font-bold">Total Efectivo:</span>
                              {formatCurrency(totalsMoney.totalEfectivo)}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Total Transferencias:
                              </span>
                              {formatCurrency(totalsMoney.totalTransferencia)}
                            </p>

                            <ul className="pl-4 mt-2 text-gray-600 list-disc">
                              {Object.entries(
                                totalsMoney.transferPlatformTotals
                              ).map(([platform, amount]) => (
                                <li key={platform}>
                                  <span className="font-medium">
                                    {platform.toLocaleUpperCase()}:
                                  </span>{" "}
                                  {formatCurrency(amount)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="mb-6">
                            <h3 className="mb-2 text-lg font-semibold text-gray-700">
                              No hay transferencias
                            </h3>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-lg font-extrabold text-center text-gray-900">
                      No hay ventas en este día
                    </p>
                  )
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      <ModalReportes data={data} totalAmountSold={totalAmountSold} />
    </div>
  );
}
