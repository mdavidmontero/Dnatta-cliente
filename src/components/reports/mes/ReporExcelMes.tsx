import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { calculateProductSalesSummary, formatCurrency } from "@/utils";
import { GroupedReports } from "@/types/schemas/ventas";
import ButtonGenerateExcel from "@/components/shared/ButtonGenerateExcel";

interface SalesExcelButtonProps {
  groupedReports: GroupedReports;
  productSalesSummary: {
    productName: string;
    quantitySold: number;
    totalAmountSold: number;
  }[];
}

const SalesExcelButton: React.FC<SalesExcelButtonProps> = ({
  groupedReports,
  productSalesSummary,
}) => {
  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData: unknown[][] = [];

    Object.keys(groupedReports).forEach((date) => {
      const dailyReport = groupedReports[date];

      worksheetData.push(["Fecha", "Monto Total", "Vendedora"]);
      worksheetData.push([
        date,
        formatCurrency(dailyReport.totalAmount),
        dailyReport.reports.length > 0
          ? dailyReport.reports[0].user.name
          : "Desconocida",
      ]);

      worksheetData.push([]);
      worksheetData.push([
        "Categoría",
        "Producto",
        "Cantidad",
        "Total Vendido",
      ]);

      calculateProductSalesSummary(productSalesSummary).forEach(
        (categoryGroup) => {
          let isFirstRow = true;
          let categoryTotal = 0;

          categoryGroup.products.forEach((product) => {
            worksheetData.push([
              isFirstRow ? categoryGroup.category : "",
              product.productName,
              product.quantitySold,
              formatCurrency(product.totalAmountSold),
            ]);
            isFirstRow = false;
            categoryTotal += product.totalAmountSold;
          });

          worksheetData.push([
            "",
            "Subtotal",
            "",
            formatCurrency(categoryTotal),
          ]);
        }
      );

      worksheetData.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Ventas");

    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelFile]), "reporte_ventas.xlsx");
  };

  return (
    <ButtonGenerateExcel
      handleGenerateReport={generateExcel}
      title="Generar Excel"
    />
  );
};

export default SalesExcelButton;
