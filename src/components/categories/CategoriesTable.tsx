import { Link, useNavigate } from "react-router-dom";
import { Categories } from "../../types";

type CategoriesTableProps = {
  categories: Categories[];
  handleDeleteCategory: (id: Categories["id"]) => void;
};
export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const navigate = useNavigate();
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
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    slug
                  </th>

                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                      {category.name}
                    </td>

                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {category.name}
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-center whitespace-nowrap sm:pr-0">
                      <Link
                        to={`/edit-categories/${category.id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Editar<span className="sr-only">{category.name}</span>
                      </Link>
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-center whitespace-nowrap sm:pr-0">
                      <button
                        onClick={() =>
                          navigate(
                            location.pathname + `?handleDelete=${category.id}`
                          )
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
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
