import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";

type MoneyTableProps = {
  money: {
    id: number;
    cashRegisterId: number;
    denomination: string;
    quantity: number;
    totalDenomination: number;
  }[];
};

export default function MoneyTable({ money }: MoneyTableProps) {
  return (
    <div className="px-4 mt-5 sm:px-6 lg:px-8">
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
                    Denominación
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {money.map((money) => (
                  <tr key={money.id}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                      {money.denomination}
                    </td>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                      {money.quantity}
                    </td>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                      {money.totalDenomination}
                    </td>

                    <td className="relative flex gap-2 py-4 pr-3 text-sm font-medium text-center whitespace-nowrap sm:pr-0">
                      <Link
                        to={`/cash-edit/${money.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Editar
                        <span className="sr-only">
                          {formatCurrency(money.totalDenomination)}
                        </span>
                      </Link>
                      {/* <DeletePoints id={point.id} name={point.name} /> */}
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
