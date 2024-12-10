import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { cashReportSchemaI } from "@/types/schemas/cash";
import { formatDate } from "@/utils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  handleChange: (e: Value) => void;
  value: Value;
  data: cashReportSchemaI[];
}

export default function TableReportCash({ handleChange, value, data }: Props) {
  return (
    <div className="p-6">
      <Table className="w-full bg-white rounded-lg shadow-md">
        <TableCaption>Reportes de Caja</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Fecha</TableHead>
            <TableHead className="text-left">Punto</TableHead>
            <TableHead className="text-left">Usuario</TableHead>
            <TableHead className="text-right">Venta Helados</TableHead>
            <TableHead className="text-right">Venta Total</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>{item.point?.name || "No asignado"}</TableCell>
                <TableCell>{item.user?.name || "Desconocido"}</TableCell>
                <TableCell className="text-right">
                  {item.totalventaHelados}
                </TableCell>
                <TableCell className="text-right">{item.totalAmount}</TableCell>
                <TableCell className="text-right">
                  <Link
                    to={`/cash-detail/${item.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Ver Detalles
                  </Link>
                  <Link
                    to={`/cash-summary/${item.id}`}
                    className="ml-4 text-green-500 hover:underline"
                  >
                    Ver Resumen
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No hay datos disponibles para esta fecha.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
