import React, { useMemo } from "react";
import { formatCurrency, getCategoryFromProductName } from "../../utils";

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
): { category: string; products: ProductSalesSummary[] }[] => {
  const summary: { [category: string]: ProductSalesSummary[] } = {};

  productSalesSummary.forEach((product) => {
    const category = getCategoryFromProductName(product.productName);

    if (!summary[category]) {
      summary[category] = [];
    }

    const existingProduct = summary[category].find(
      (item) => item.productName === product.productName
    );

    if (existingProduct) {
      existingProduct.quantitySold += product.quantitySold;
      existingProduct.totalAmountSold += product.totalAmountSold;
    } else {
      summary[category].push({
        productName: product.productName,
        quantitySold: product.quantitySold,
        totalAmountSold: product.totalAmountSold,
      });
    }
  });

  return Object.entries(summary).map(([category, products]) => ({
    category,
    products,
  }));
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
              {groupedProductSales.map((categoryGroup, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-3 text-lg font-bold text-gray-800"
                    >
                      {categoryGroup.category}
                    </td>
                  </tr>
                  {categoryGroup.products.map((product, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
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
                </React.Fragment>
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
