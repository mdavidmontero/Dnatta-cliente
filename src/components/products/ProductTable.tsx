import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";
import { Product } from "../../types";
import EditEstado from "../ui/EdiEstado";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 mt-20 sm:px-6 lg:px-8">
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full overflow-hidden align-middle bg-white rounded-lg shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="py-4 pl-6 text-sm font-bold tracking-wider text-left uppercase border-b-2">
                    Producto
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-bold tracking-wider text-left uppercase border-b-2">
                    Estado
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-bold tracking-wider text-left uppercase border-b-2">
                    Precio
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-bold tracking-wider text-left uppercase border-b-2">
                    Categoría
                  </TableHead>
                  <TableHead className="py-4 pr-6 text-sm font-bold tracking-wider text-center uppercase border-b-2">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="transition-all duration-200 ease-in-out hover:bg-gray-100"
                  >
                    <TableCell className="py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {product.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <EditEstado
                        productos={product.id}
                        estado={product.estado}
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {formatCurrency(product.price)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {product.category.name}
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-sm font-medium text-center whitespace-nowrap">
                      <Link to={`/edit-product/${product.id}`}>
                        <Button
                          variant="link"
                          className="text-indigo-600 transition-colors hover:text-indigo-800"
                        >
                          Editar
                          <span className="sr-only">{product.name}</span>
                        </Button>
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
