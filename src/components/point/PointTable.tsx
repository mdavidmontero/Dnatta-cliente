import { Link } from "react-router-dom";
import { Point } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PointsTableProps = {
  points: Point[];
};

export default function PointTable({ points }: PointsTableProps) {
  return (
    <div className="px-4 mt-20 sm:px-6 lg:px-8">
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full p-5 py-2 align-middle bg-white rounded-lg shadow-md sm:px-6 lg:px-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Nombre
                  </TableHead>
                  <TableHead className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Ubicación
                  </TableHead>
                  <TableHead className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {points.map((point) => (
                  <TableRow
                    key={point.id}
                    className="transition-all duration-200 ease-in-out hover:bg-gray-50"
                  >
                    <TableCell className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                      {point.name}
                    </TableCell>
                    <TableCell className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {point.ubicacion}
                    </TableCell>
                    <TableCell className="py-4 pl-3 pr-4 text-sm font-medium text-center whitespace-nowrap sm:pr-0">
                      <Link
                        to={`/edit-point/${point.id}`}
                        className="text-indigo-600 transition-colors hover:text-indigo-800"
                      >
                        Editar<span className="sr-only">{point.name}</span>
                      </Link>
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
