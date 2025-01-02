import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { ReportArray } from "../../../types";
import { formatCurrency } from "../../../utils";
import ButtonGenerateExcel from "@/components/shared/ButtonGenerateExcel";

interface Props {
  ordenes: ReportArray | undefined;
  totalday: number;
  companyName?: string;
  companyLogo?: string;
}

interface ProductSalesSummary {
  productName: string;
  quantitySold: number;
  totalAmountSold: number;
  averagePrice: number;
  percentageOfTotal: number;
}

const generateProfessionalExcelReport = (
  ordenes: ReportArray | undefined,
  totalday: number,
  companyName: string = "Dnata Helados"
) => {
  if (!ordenes || ordenes.length === 0) {
    console.error("No hay órdenes disponibles para generar el informe.");
    return;
  }

  // Calcular resumen detallado de ventas por producto
  const calculateDetailedProductSummary = (
    orders: ReportArray
  ): ProductSalesSummary[] => {
    const summary: Record<string, ProductSalesSummary> = {};

    orders.forEach((order) => {
      order.saleDetails.forEach((detail) => {
        const { product, quantity, unitPrice } = detail;
        const productName = product.name;

        if (!summary[productName]) {
          summary[productName] = {
            productName,
            quantitySold: 0,
            totalAmountSold: 0,
            averagePrice: 0,
            percentageOfTotal: 0,
          };
        }

        summary[productName].quantitySold += quantity;
        summary[productName].totalAmountSold += quantity * unitPrice;
      });
    });

    // Calcular estadísticas adicionales
    const totalSales = Object.values(summary).reduce(
      (sum, product) => sum + product.totalAmountSold,
      0
    );

    return Object.values(summary).map((product) => ({
      ...product,
      averagePrice: product.totalAmountSold / product.quantitySold,
      percentageOfTotal: (product.totalAmountSold / totalSales) * 100,
    }));
  };

  const productSalesSummary = calculateDetailedProductSummary(ordenes);
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("es-ES");

  // Crear las secciones del informe
  const headerSection = [
    [companyName.toUpperCase()],
    ["REPORTE DE VENTAS DIARIO"],
    [`Fecha: ${currentDate}`],
    [`Hora de generación: ${currentTime}`],
    [`Número de Referencia: REF-${Date.now().toString().slice(-6)}`],
    [],
  ];

  const summarySection = [
    ["RESUMEN EJECUTIVO"],
    ["Indicadores Principales:"],
    [`Total de Ventas: ${formatCurrency(totalday)}`],
    [`Número de Productos Diferentes: ${productSalesSummary.length}`],
    [
      `Total de Unidades Vendidas: ${productSalesSummary.reduce(
        (sum, p) => sum + p.quantitySold,
        0
      )}`,
    ],
    [],
  ];

  const detailsHeaders = [
    ["DETALLE DE VENTAS POR PRODUCTO"],
    [
      "Producto",
      "Unidades Vendidas",
      "Venta Total",
      "Precio Promedio",
      "% del Total",
    ],
  ];

  const productDetails = productSalesSummary.map((product) => [
    product.productName,
    product.quantitySold,
    formatCurrency(product.totalAmountSold),
    formatCurrency(product.averagePrice),
    `${product.percentageOfTotal.toFixed(2)}%`,
  ]);

  const performanceSection = [
    [],
    ["ANÁLISIS DE RENDIMIENTO"],
    ["Top Productos por Ventas:"],
    ...productSalesSummary
      .sort((a, b) => b.totalAmountSold - a.totalAmountSold)
      .slice(0, 3)
      .map((product, index) => [
        `${index + 1}. ${product.productName} - ${formatCurrency(
          product.totalAmountSold
        )}`,
      ]),
  ];

  // Combinar todas las secciones
  const allData = [
    ...headerSection,
    ...summarySection,
    ...detailsHeaders,
    ...productDetails,
    ...performanceSection,
  ];

  // Crear y configurar la hoja de cálculo
  const worksheet = XLSX.utils.aoa_to_sheet(allData);
  const workbook = XLSX.utils.book_new();

  // Configurar estilos y formato

  // Configurar anchos de columna
  worksheet["!cols"] = [
    { wch: 35 }, // Producto
    { wch: 15 }, // Unidades
    { wch: 15 }, // Venta Total
    { wch: 15 }, // Precio Promedio
    { wch: 12 }, // Porcentaje
  ];

  // Añadir la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Ventas");

  // Generar y descargar el archivo
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileName = `Reporte_Ventas_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;
  saveAs(new Blob([excelBuffer]), fileName);
};

export const ProfessionalExcelReport = ({
  ordenes,
  totalday,
  companyName,
}: Props) => {
  const handleGenerateReport = () => {
    if (!ordenes || ordenes.length === 0) {
      alert("No hay datos disponibles para generar el informe.");
      return;
    }
    generateProfessionalExcelReport(ordenes, totalday, companyName);
  };

  return (
    <ButtonGenerateExcel
      handleGenerateReport={handleGenerateReport}
      title="Generar Excel"
    />
  );
};
