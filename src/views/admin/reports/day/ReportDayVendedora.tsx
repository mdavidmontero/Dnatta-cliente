import { useNavigate } from "react-router-dom";
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
// import { useAuth } from "@/hook/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProfessionalExcelReport } from "@/components/reports/day/ReportExcel";
import { useVentas } from "@/hook/useVentas";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReportDayVendedora() {
  const navigate = useNavigate();
  const { pointsData, userVendedoras } = useVentas();
  // const { data: userdata } = useAuth();
  const [value, setValue] = useState<Value>(new Date());
  const [point, setPoint] = useState(0);
  const [user, setUser] = useState(0);
  const [fetchData, setFetchData] = useState(false);

  const selectedDate = value instanceof Date ? startOfDay(value) : null;

  const { data, isLoading, isError } = useQuery<ReportArray | undefined>({
    queryKey: ["report", selectedDate, point, user],
    queryFn: () =>
      selectedDate && point
        ? getReportDiario(selectedDate.toISOString(), user || 0, point)
        : Promise.resolve([]),
    enabled: fetchData,
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

  const executeQuery = () => {
    if (selectedDate && point) {
      setFetchData(true);
    } else {
      alert("Selecciona fecha, local y usuario antes de buscar.");
    }
  };

  // if (userdata?.role !== "ADMIN") return <Navigate to="/404" />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-wrap justify-between gap-2 mb-6">
        <Button
          onClick={() => navigate(location.pathname + "?reportcashone=true")}
          className="bg-[#2d547c] hover:bg-[#44719e] text-white w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
        >
          Ver en PDF
        </Button>
        <ProfessionalExcelReport
          ordenes={data}
          totalday={totalAmountSold}
          companyName="Dnata Helados"
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Resumen de Ventas
        </h1>
      </div>
      <div className="gap-5 md:flex md:items-start">
        <div className="flex justify-center p-5 bg-white border rounded-lg shadow-sm md:w-1/2 lg:w-1/3 lg:sticky lg:top-10">
          <Calendar
            value={value}
            onChange={handleChange}
            className="rounded-xl"
          />
        </div>
        <div className="p-2 space-y-5 md:w-1/2 lg:w-2/3">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Select onValueChange={(value) => setPoint(+value)}>
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

      <ModalReportes data={data} totalAmountSold={totalAmountSold} />
    </div>
  );
}
