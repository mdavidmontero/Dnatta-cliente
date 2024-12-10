import { cashReportSchemaI } from "@/types/schemas/cash";
import { formatCurrency } from "@/utils";
import { useNavigate } from "react-router-dom";

interface DetailReportCashOneDayProps {
  item: cashReportSchemaI;
  totalTrasferencias: {
    totalTransferenciasUsuario: number | undefined;
    totalEfectivoUsuario: number | undefined;
    transferPlatformTotals: Record<string, number>;
  }[];
  index: number;
}

export default function DetailReportCashOneDay({
  item,
  totalTrasferencias,
  index,
}: DetailReportCashOneDayProps) {
  const navigate = useNavigate();
  return (
    <div
      key={item.id}
      className="p-6 transition-all bg-white border rounded-lg shadow-lg hover:shadow-xl"
    >
      <div className="flex items-center gap-6 mb-6">
        {item.user?.image && (
          <img
            src={item.user?.image}
            alt={item.user?.name}
            className="object-cover w-16 h-16 border-2 border-blue-500 rounded-full"
          />
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{item.user?.name}</h2>
          <p className="text-sm text-gray-500">
            Hora de Apertura: {new Date(item.date).toLocaleTimeString("es-ES")}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-indigo-600">
          Apertura de Caja
        </h3>
        <p className="text-gray-700">
          Monto Inicial: {formatCurrency(item.baseAmount || 0)}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-700">
          Resumen de Ventas
        </h3>
        <ul className="space-y-2 text-gray-600">
          <li>
            <span className="font-medium">Punto:</span> {item.point?.name}
          </li>
          <li>
            <span className="font-medium">Total Helados:</span>{" "}
            {formatCurrency(item.totalventaHelados)}
          </li>
          <li>
            <span className="font-medium">Venta Acumulada:</span>{" "}
            {formatCurrency(item.totalAmount)}
          </li>
          <li>
            <span className="font-medium">Gastos:</span>{" "}
            {formatCurrency(item.closingAmount)}
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-blue-600">
          Transferencias
        </h3>
        <p className="text-gray-700">
          Total Transferencias:{" "}
          {formatCurrency(
            totalTrasferencias[index].totalTransferenciasUsuario!
          )}
        </p>
        <ul className="pl-4 mt-2 text-gray-600 list-disc">
          {Object.entries(totalTrasferencias[index].transferPlatformTotals).map(
            ([platform, amount]) => (
              <li key={platform}>
                <span className="font-medium">
                  {platform.toLocaleUpperCase()}:
                </span>{" "}
                {formatCurrency(amount)}
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-green-600">Efectivo</h3>
        <p className="text-gray-700">
          Total en Efectivo:{" "}
          {formatCurrency(totalTrasferencias[index].totalEfectivoUsuario!)}
        </p>

        <div className="p-4 mt-4 rounded-lg bg-gray-50">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Listado de Compras/Gastos
          </h3>
          <ul className="space-y-3">
            {item.cashMovements?.map((movement) => (
              <li
                key={movement?.id}
                className="flex items-center justify-between p-3 transition-all bg-white border rounded-lg shadow-sm hover:shadow-md"
              >
                <span className="font-medium text-gray-700">
                  {movement?.concept}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(movement!.amount)}
                </span>
                <button
                  className="text-sm font-semibold text-blue-600 hover:underline"
                  onClick={() =>
                    navigate(
                      location.pathname + "?movementcash=" + movement?.id
                    )
                  }
                >
                  Ver Detalles
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
