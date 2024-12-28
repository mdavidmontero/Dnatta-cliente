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
    chococono: "Chococono",
    malteada: "Malteadas",
  };

  const lowerCaseName = productName.toLowerCase();
  for (const key in categories) {
    if (lowerCaseName.startsWith(key)) {
      return categories[key];
    }
  }

  return "Otros"; // Default category
};
