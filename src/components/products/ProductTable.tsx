import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";
import { Product } from "../../types";
import EditEstado from "../ui/EdiEstado";
type ProductTableProps = {
  products: Product[];
};
export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 mt-20 sm:px-6 lg:px-8">
      <div className="flow-root mt-8 ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full p-5 py-2 align-middle bg-white sm:px-6 lg:px-8 ">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Categoría
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                      {product.name}
                    </td>
                    <td className="py-4 pl-4 pr-3 whitespace-nowrap sm:pl-0">
                      <EditEstado
                        productos={product.id}
                        estado={product.estado}
                      />
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {product.category.name}
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                      <Link
                        to={`/edit-product/${product.id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Editar<span className="sr-only">{product.name}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
