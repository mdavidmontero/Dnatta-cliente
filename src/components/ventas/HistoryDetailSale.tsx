import { SaleTypeSchema } from "@/types/schemas/ventas";
import { formatCurrency, getImagePath } from "@/utils";

interface Props {
  sale: SaleTypeSchema;
}

export default function HistoryDetailSale({ sale }: Props) {
  return (
    <div
      key={sale.id}
      className="mt-6 overflow-hidden text-sm font-medium text-gray-500 border border-gray-300 rounded-lg"
    >
      <p className="p-2 text-sm font-black text-gray-900 bg-gray-200 ">
        ID: {sale.id}
      </p>
      <ul
        role="list"
        className="border-t border-b border-gray-200 divide-y divide-gray-200"
      >
        {sale.saleDetails.map((detail) => (
          <li key={detail.id} className="flex items-start gap-6 p-5">
            <div className="relative flex-shrink-0 w-24 h-24">
              <img
                src={getImagePath(detail.product.image)}
                alt={detail.product.name}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-gray-600">
                Hora: {new Date(sale.date).toLocaleTimeString()}
              </p>
              <h3 className="font-medium text-gray-900">
                {detail.product.name}
              </h3>
              <p className="text-lg font-extrabold text-gray-900">
                {formatCurrency(detail.product.price)}
              </p>
              <p className="text-lg text-gray-900">
                Cantidad: {detail.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="p-5">
        <h4 className="text-lg font-semibold text-gray-900">Métodos de Pago</h4>
        <ul className="space-y-1 text-gray-800">
          {sale.payments.map((platform, index) => (
            <li key={index} className="text-sm capitalize">
              {platform.method} - {formatCurrency(platform.amount)}
              {platform.transferPlatform !== "otro" && (
                <p className="font-semibold capitalize">
                  Plataforma:{" "}
                  <span className="font-normal">
                    {platform.transferPlatform}
                  </span>
                </p>
              )}
            </li>
          ))}
        </ul>
        <div className="flex justify-between pt-2 mt-4 text-lg font-black text-black border-t">
          <span>Total</span>
          <span>{formatCurrency(sale.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}
