import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getReportDiario } from "../../../actions/reports.actions";
import { startOfDay } from "date-fns";
import Spinner from "../../../components/shared/spinner/Spinner";
import { formatCurrency } from "../../../utils";
import { SaleDetails } from "../../../components/ventas/SaleDetails";
import { ReportArray } from "../../../types";
import ModalReportes from "./ModalReportes";
import { userAuthStore } from "../../../store/useAuthStore";
import { useStorePoint } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReportDay() {
  const navigation = useNavigate();
  const [value, setValue] = useState<Value>(new Date());
  const user = userAuthStore((state) => state.user);
  const point = useStorePoint((state) => state.point);

  const selectedDate = value instanceof Date ? startOfDay(value) : null;

  const { data, isLoading, isError } = useQuery<ReportArray | undefined>({
    queryKey: ["report", selectedDate],
    queryFn: () =>
      selectedDate
        ? getReportDiario(selectedDate.toISOString(), +user!.id, +point)
        : Promise.resolve([]),
    enabled: !!selectedDate,
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

  if (data)
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-end">
          <Button
            onClick={() =>
              navigation(location.pathname + "?reportcashone=true")
            }
            className="bg-[#3C6997] rounded-lg text-white w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
          >
            Ver en PDF
          </Button>
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
                  {data.length > 0 ? (
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

        <ModalReportes data={data} totalAmountSold={totalAmountSold} />
      </div>
    );
}
