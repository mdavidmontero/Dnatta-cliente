import { useNavigate } from "react-router-dom";
import { Movement } from "../../types/schemas/movements";
import { formatCurrency } from "../../utils";

interface MovementsTableProps {
  movementsData: Movement[];
}

export default function MovementsTable({ movementsData }: MovementsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="px-4 mt-10 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden bg-white shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 shadow-md">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6"
                >
                  NIT
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6"
                >
                  Empresa
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 md:table-cell"
                >
                  Concepto
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6"
                >
                  Detalle
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6"
                >
                  Monto
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6"
                >
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {movementsData.map((movement) => (
                <tr key={movement.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-center text-gray-900 align-middle sm:px-6">
                    {movement.nit}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-center text-gray-900 align-middle sm:px-6">
                    {movement.name}
                  </td>
                  <td className="hidden px-4 py-4 text-sm text-center text-gray-500 align-middle whitespace-nowrap md:table-cell">
                    {movement.concept}
                  </td>
                  <td className="px-4 py-4 text-sm text-center text-gray-500 align-middle sm:px-6">
                    {movement.detail}
                  </td>
                  <td className="px-4 py-4 text-sm text-center text-gray-500 align-middle sm:px-6">
                    {formatCurrency(movement.amount)}
                  </td>
                  <td
                    className={`px-4 py-4 text-sm font-semibold text-center align-middle whitespace-nowrap sm:px-6 ${
                      movement.tipo === "entrada"
                        ? "text-green-700 bg-green-100"
                        : movement.tipo === "salida"
                        ? "text-red-700 bg-red-100"
                        : ""
                    }`}
                  >
                    {movement.tipo}
                  </td>
                  <td className="px-4 py-4 text-sm text-center align-middle sm:px-6">
                    <button
                      onClick={() =>
                        navigate(
                          location.pathname + `?editmovement=${movement.id}`
                        )
                      }
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
