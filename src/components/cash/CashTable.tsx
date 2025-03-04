import { Link } from "react-router-dom";
import { Cash } from "../../types/schemas/cash";
import { formatDate } from "../../utils";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type CashTableProps = {
  cash: Cash;
};

export default function CashTable({ cash }: CashTableProps) {
  return (
    <div className="px-4 mt-20 sm:px-6 lg:px-8">
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
            <Table>
              <TableCaption>
                Aquí se encuentran las ventas de helados y montos acumulados del
                día.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-3 text-sm font-semibold text-center text-gray-700 border-b-2 border-gray-300">
                    Fecha
                  </TableHead>
                  <TableHead className="py-3 text-sm font-semibold text-center text-gray-700 border-b-2 border-gray-300">
                    Total Venta Helados
                  </TableHead>
                  <TableHead className="py-3 text-sm font-semibold text-center text-gray-700 border-b-2 border-gray-300">
                    Monto Acumulado Día
                  </TableHead>
                  <TableHead className="py-3 text-sm font-semibold text-center text-gray-700 border-b-2 border-gray-300">
                    Acción
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  key={cash.id}
                  className="transition-colors duration-300 hover:bg-gray-50"
                >
                  <TableCell className="py-4 text-sm text-center text-gray-900">
                    {formatDate(cash.date)}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-center text-gray-900">
                    {cash.totalventaHelados}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-center text-gray-900">
                    {cash.totalAmount}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-center">
                    <Link
                      to={`/cash-edit/${cash.id}/edit`}
                      className="inline-block text-indigo-600 transition-colors duration-300 hover:text-indigo-800"
                    >
                      Editar
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
