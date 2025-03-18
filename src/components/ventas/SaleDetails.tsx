import React, { useMemo } from "react";
import { calculateProductSalesSummary, formatCurrency } from "../../utils";

type ProductSalesSummary = {
  productName: string;
  quantitySold: number;
  totalAmountSold: number;
};

type SaleDetailsProps = {
  productSalesSummary: ProductSalesSummary[];
  totalQuantitySold: number;
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
      {totalQuantitySold > 0 && (
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Resumen de Productos Vendidos
        </h2>
      )}

      {groupedProductSales.length > 0 && (
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
              {groupedProductSales.map((categoryGroup, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-3 text-lg font-bold text-gray-800"
                    >
                      {categoryGroup.category}
                    </td>
                  </tr>

                  {/* Detalles de los productos */}
                  {categoryGroup.products.map((product, productIndex) => (
                    <tr key={productIndex} className="hover:bg-gray-50">
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

                  <tr className="bg-slate-100">
                    <td colSpan={1} className="px-4 py-2 font-bold text-right">
                      Cantidad:
                    </td>
                    <td className="px-4 py-2 font-bold text-center text-gray-800">
                      {categoryGroup.cantidad}
                    </td>
                    <td className="px-4 py-2 font-bold text-gray-800">
                      {formatCurrency(categoryGroup.subtotal)}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-lg font-semibold text-right text-gray-800">
            Total Cantidad Vendida: {totalQuantitySold}
          </div>
        </div>
      )}
    </div>
  );
}
