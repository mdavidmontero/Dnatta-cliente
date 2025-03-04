import { cashReportSchemaI } from "@/types/schemas/cash";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
}
export function getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";
  if (imagePath.startsWith(cloudinaryBaseUrl)) {
    return imagePath;
  } else {
    return `/products/${imagePath}.png`;
  }
}

export const formatDate = (date: string) => {
  const fecha = new Date(date).toLocaleDateString();
  return fecha;
};

export const getCategoryFromProductName = (productName: string): string => {
  const categories: Record<string, string> = {
    Cono: "Conos",
    Brownie: "Brownies",
    Sundae: "Sundaes",
    Supreme: "Supremes",
    Tarrina: "Tarrinas",
    Adición: "Adiciones",
    Megahelado: "MegaHelados",
    Banana: "Banana Split",
    Chococono: "Conos",
    Malteada: "Malteadas",
  };

  const lowerCaseName = productName;
  if (lowerCaseName.includes("Supreme") || lowerCaseName.includes("supreme")) {
    return "Supremes";
  }
  for (const key in categories) {
    if (lowerCaseName.startsWith(key)) {
      return categories[key];
    }
  }

  return "Otros";
};

type ProductSalesSummary = {
  productName: string;
  quantitySold: number;
  totalAmountSold: number;
};

type SaleDetailsProps = {
  productSalesSummary: ProductSalesSummary[];
  totalQuantitySold: number;
};

export const calculateProductSalesSummary = (
  productSalesSummary: SaleDetailsProps["productSalesSummary"]
): {
  category: string;
  subtotal: number;
  cantidad: number;
  products: ProductSalesSummary[];
}[] => {
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
    subtotal: products.reduce(
      (sum, product) => sum + product.totalAmountSold,
      0
    ),
    cantidad: products.reduce(
      (cant, product) => cant + product.quantitySold,
      0
    ),
    products,
  }));
};

export const calculateDataCashDay = (data: cashReportSchemaI[]) => {
  const totals = data?.map((item) => {
    const punto = item.point?.id;

    let totalEfectivo = 0;
    let totalTransferencia = 0;
    const transferPlatformTotals: Record<string, number> = {};

    item.point?.sales?.forEach((sale) => {
      sale?.payments?.forEach((payment) => {
        if (payment?.method === "efectivo") {
          totalEfectivo += payment.amount || 0;
        } else if (payment?.method === "transferencia") {
          totalTransferencia += payment.amount || 0;
          const platform = payment.transferPlatform || "otro";
          if (!transferPlatformTotals[platform]) {
            transferPlatformTotals[platform] = 0;
          }
          transferPlatformTotals[platform] += payment.amount || 0;
        }
      });
    });

    return {
      totalEfectivo,
      totalTransferencia,
      transferPlatformTotals,
      punto,
    };
  });
  return totals;
};
