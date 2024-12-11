import { useNavigate } from "react-router-dom";
import { Movement } from "../../types/schemas/movements";
import { formatCurrency } from "../../utils";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "../ui/button";

interface MovementsTableProps {
  movementsData: Movement[];
}

export default function MovementsTable({ movementsData }: MovementsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="px-4 mt-10 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden bg-white shadow-md sm:rounded-lg">
          <Table className="min-w-full divide-y divide-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6">
                  NIT
                </TableHead>
                <TableHead className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6">
                  Empresa
                </TableHead>
                <TableHead className="hidden px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 md:table-cell sm:px-6">
                  Concepto
                </TableHead>
                <TableHead className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6">
                  Detalle
                </TableHead>
                <TableHead className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6">
                  Monto
                </TableHead>
                <TableHead className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6">
                  Tipo
                </TableHead>
                <TableHead className="px-4 py-3 text-sm font-semibold text-center text-gray-900 border-b-2 border-gray-300 sm:px-6">
                  Acción
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {movementsData.map((movement) => (
                <TableRow key={movement.id} className="hover:bg-gray-50">
                  <TableCell className="px-4 py-4 text-sm font-medium text-center text-gray-900 align-middle sm:px-6">
                    {movement.nit}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm font-medium text-center text-gray-900 align-middle sm:px-6">
                    {movement.name}
                  </TableCell>
                  <TableCell className="hidden px-4 py-4 text-sm text-center text-gray-500 align-middle whitespace-nowrap md:table-cell sm:px-6">
                    {movement.concept}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm text-center text-gray-500 align-middle sm:px-6">
                    {movement.detail}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm text-center text-gray-500 align-middle sm:px-6">
                    {formatCurrency(movement.amount)}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-4 text-sm font-semibold text-center align-middle whitespace-nowrap sm:px-6 ${
                      movement.tipo === "entrada"
                        ? "text-green-700 bg-green-100"
                        : movement.tipo === "salida"
                        ? "text-red-700 bg-red-100"
                        : ""
                    }`}
                  >
                    {movement.tipo}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm text-center align-middle sm:px-6">
                    <Button
                      variant="link"
                      onClick={() =>
                        navigate(
                          location.pathname + `?editmovement=${movement.id}`
                        )
                      }
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
