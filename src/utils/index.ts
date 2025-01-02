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
    cono: "Conos",
    brownie: "Brownies",
    sundae: "Sundaes",
    supreme: "Supremes",
    tarrina: "Tarrinas",
    adición: "Adiciones",
    mega: "MegaSupreme",
    banana: "Banana Split",
    chococono: "Conos",
    malteada: "Malteadas",
  };

  const lowerCaseName = productName.toLowerCase();
  if (lowerCaseName.includes("brownie supreme")) {
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
