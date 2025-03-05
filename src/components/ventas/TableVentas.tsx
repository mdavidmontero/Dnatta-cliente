import { formatCurrency } from "../../utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { PosVentaDay } from "@/types/schemas/ventas";
import { useNavigate } from "react-router-dom";

type VentasTableProps = {
  ventas: PosVentaDay["sales"];
};

export default function VentasTable({ ventas }: VentasTableProps) {
  const navigate = useNavigate();
  return (
    <div className="px-4 mt-10 sm:px-6 lg:px-8">
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full overflow-hidden align-middle bg-white rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="py-4 pl-6 text-sm font-bold tracking-wider text-left text-gray-800 uppercase border-b-2">
                    Hora
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-bold tracking-wider text-left text-gray-800 uppercase border-b-2">
                    Total
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-bold tracking-wider text-left text-gray-800 uppercase border-b-2">
                    Productos
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-bold tracking-wider text-left text-gray-800 uppercase border-b-2">
                    Método de Pago
                  </TableHead>
                  <TableHead className="py-4 pr-6 text-sm font-bold tracking-wider text-center text-gray-800 uppercase border-b-2">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventas.map((venta) => (
                  <TableRow
                    key={venta.id}
                    className="transition-all duration-200 ease-in-out hover:bg-gray-50"
                  >
                    <TableCell className="py-4 pl-6 text-sm text-gray-900 whitespace-nowrap">
                      {new Date(venta.date).toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-black whitespace-nowrap">
                      {formatCurrency(venta.totalAmount)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-black whitespace-nowrap">
                      {venta.saleDetails.map((detail) => (
                        <div key={detail.id}>
                          {detail.product.name} -{" "}
                          {formatCurrency(detail.unitPrice)} x {detail.quantity}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-black whitespace-nowrap">
                      {venta.payments.map((payment) => (
                        <div key={payment.id}>
                          <p className="capitalize">
                            {payment.method} - {payment.amount}
                          </p>
                          {payment.transferPlatform !== "otro" && (
                            <div className="font-semibold">
                              <p className="font-bold capitalize">
                                Plataforma:{" "}
                                <span className="font-normal">
                                  {payment.transferPlatform}
                                </span>
                              </p>
                            </div>
                          )}
                          {/* {formatCurrency(detail.unitPrice)} x {detail.quantity} */}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-sm font-medium text-center whitespace-nowrap">
                      <Button
                        variant="destructive"
                        className="ml-2"
                        onClick={() =>
                          navigate(
                            location.pathname + `?handleDelete=${venta.id}`
                          )
                        }
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
