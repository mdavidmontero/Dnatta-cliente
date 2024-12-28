import { useMemo } from "react";
import { formatCurrency } from "../../utils";

type ProductSalesSummary = {
  productName: string;
  quantitySold: number;
  totalAmountSold: number;
};

type SaleDetailsProps = {
  productSalesSummary: ProductSalesSummary[];
  totalQuantitySold: number;
};

const calculateProductSalesSummary = (
  productSalesSummary: SaleDetailsProps["productSalesSummary"]
): ProductSalesSummary[] => {
  const summary: { [productName: string]: ProductSalesSummary } = {};

  productSalesSummary.forEach((product) => {
    const productName = product.productName;

    if (!summary[productName]) {
      summary[productName] = {
        productName: productName,
        quantitySold: 0,
        totalAmountSold: 0,
      };
    }

    summary[productName].quantitySold += product.quantitySold;
    summary[productName].totalAmountSold += product.totalAmountSold;
  });

  return Object.values(summary);
};

export function SaleDetails({
  productSalesSummary,
  totalQuantitySold,
}: SaleDetailsProps) {
  const groupedProductSales = useMemo(
    () => calculateProductSalesSummary(productSalesSummary),
    [productSalesSummary]
  );

  return (
    <div className="py-6 space-y-6 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Resumen de Productos Vendidos
      </h2>
      {groupedProductSales.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">
                  Producto
                </th>
                <th className="px-4 py-3 text-sm font-medium text-center text-gray-600">
                  Cantidad Vendida
                </th>
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groupedProductSales.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold whitespace-nowrap">
                    {product.productName}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-600 whitespace-nowrap">
                    {product.quantitySold}
                  </td>
                  <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                    {formatCurrency(product.totalAmountSold)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-lg font-semibold text-right text-gray-800">
            Total Cantidad Vendida: {totalQuantitySold}
          </div>
        </div>
      ) : (
        <p className="text-lg font-semibold text-center text-gray-500">
          No hay ventas registradas para este producto.
        </p>
      )}
    </div>
  );
}
