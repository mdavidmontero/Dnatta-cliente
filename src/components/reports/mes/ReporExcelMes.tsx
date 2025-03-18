import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { calculateProductSalesSummary, formatCurrency } from "@/utils";
import { GroupedReports } from "@/types/schemas/ventas";
import ButtonGenerateExcel from "@/components/shared/ButtonGenerateExcel";

interface SalesExcelButtonProps {
  groupedReports: GroupedReports;
  totalSalesYear: number;
}

const SalesExcelButton: React.FC<SalesExcelButtonProps> = ({
  groupedReports,
  totalSalesYear,
}) => {
  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte Ventas");

    const headerStyle: Partial<ExcelJS.Style> = {
      font: {
        bold: true,
        color: { argb: "FFFFFF" },
        name: "Calibri",
        size: 12,
      },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "4F81BD" } },
      alignment: { horizontal: "center" },
      border: {
        top: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      },
    };

    const dayHeaderStyle: Partial<ExcelJS.Style> = {
      font: {
        bold: true,
        color: { argb: "000000" },
        name: "Calibri",
        size: 12,
      },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "DDEBF7" } },
      border: {
        top: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      },
    };

    const categoryStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, name: "Calibri", size: 12 },
    };

    const subtotalStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, name: "Calibri", size: 12 },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "F8CBAD" } },
    };

    const currencyStyle: Partial<ExcelJS.Style> = {
      numFmt: '"$"#,##0.00',
      font: { name: "Calibri", size: 12 },
    };

    worksheet.mergeCells("A1:D1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "Reporte de Ventas Mensual";
    const titleCell2 = worksheet.getCell("A2");
    titleCell2.value = `Venta total: ${formatCurrency(totalSalesYear)}`;
    titleCell2.font = { bold: true, size: 12, name: "Calibri" };
    titleCell.font = { bold: true, size: 16, name: "Calibri" };
    titleCell.alignment = { horizontal: "center" };

    const sortedDates = Object.keys(groupedReports).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    let currentRow = 3;

    sortedDates.forEach((date) => {
      const dailyReport = groupedReports[date];

      const vendedoras = [
        ...new Set(dailyReport.reports.map((report) => report.user.name)),
      ].join(", ");

      worksheet.getCell(`A${currentRow}`).value = "Fecha";
      worksheet.getCell(`B${currentRow}`).value = date;
      worksheet.getCell(`A${currentRow}`).style = dayHeaderStyle;
      worksheet.getCell(`B${currentRow}`).style = dayHeaderStyle;

      worksheet.getCell(`A${currentRow + 1}`).value = "Monto Total";
      worksheet.getCell(`B${currentRow + 1}`).value = dailyReport.totalAmount;
      worksheet.getCell(`A${currentRow + 1}`).style = dayHeaderStyle;
      worksheet.getCell(`B${currentRow + 1}`).style = {
        ...dayHeaderStyle,
        numFmt: '"$"#,##0.00',
      };

      worksheet.getCell(`A${currentRow + 2}`).value = "Vendedoras";
      worksheet.getCell(`B${currentRow + 2}`).value = vendedoras;
      worksheet.getCell(`A${currentRow + 2}`).style = dayHeaderStyle;
      worksheet.getCell(`B${currentRow + 2}`).style = dayHeaderStyle;

      currentRow += 4;

      worksheet.getCell(`A${currentRow}`).value = "Categoría";
      worksheet.getCell(`B${currentRow}`).value = "Producto";
      worksheet.getCell(`C${currentRow}`).value = "Cantidad";
      worksheet.getCell(`D${currentRow}`).value = "Total Vendido";
      ["A", "B", "C", "D"].forEach((col) => {
        worksheet.getCell(`${col}${currentRow}`).style = headerStyle;
      });

      currentRow++;

      const productsForDate = dailyReport.reports.flatMap((report) =>
        report.saleDetails.map((detail) => ({
          productName: detail.product.name,
          quantitySold: detail.quantity,
          totalAmountSold: detail.unitPrice * detail.quantity,
          categoryId: detail.product.categoryId,
        }))
      );

      const categorySummary = calculateProductSalesSummary(productsForDate);
      categorySummary.forEach((categoryGroup) => {
        let isFirstRow = true;
        let categoryTotal = 0;

        const sortedProducts = categoryGroup.products.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );

        sortedProducts.forEach((product) => {
          worksheet.getCell(`A${currentRow}`).value = isFirstRow
            ? `${categoryGroup.category}`
            : "";
          worksheet.getCell(`A${currentRow}`).style = categoryStyle;
          worksheet.getCell(`B${currentRow}`).value = product.productName;
          worksheet.getCell(`C${currentRow}`).value = product.quantitySold;
          worksheet.getCell(`D${currentRow}`).value = product.totalAmountSold;
          worksheet.getCell(`D${currentRow}`).style = currencyStyle;

          isFirstRow = false;
          categoryTotal += product.totalAmountSold;
          currentRow++;
        });

        worksheet.getCell(`B${currentRow}`).value = "Subtotal";
        worksheet.getCell(`D${currentRow}`).value = categoryTotal;
        worksheet.getCell(`D${currentRow}`).style = {
          ...currencyStyle,
          ...subtotalStyle,
        };
        currentRow++;
      });

      currentRow++;
    });

    worksheet.columns = [
      { width: 20 },
      { width: 30 },
      { width: 15 },
      { width: 15 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "reporte_ventas.xlsx");
  };

  return (
    <ButtonGenerateExcel
      handleGenerateReport={generateExcel}
      title="Generar Excel"
    />
  );
};

export default SalesExcelButton;
