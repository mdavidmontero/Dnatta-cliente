import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { formatCurrency } from "../../../../utils";
import { GroupedReports } from "../../../../types/schemas/ventas";

Font.register({
  family: "Helvetica",
  fontWeight: "normal",
  fontStyle: "normal",
  src: "https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid #333",
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: "#e9ecef",
    fontWeight: "bold",
    fontSize: 14,
    padding: 12,
  },
  reportRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottom: "1px solid #ddd",
  },
  reportRowTotal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    fontWeight: "bold",
    borderTop: "1px solid #ddd",
    marginTop: 15,
  },
  footer: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 12,
    color: "#777",
  },
});

interface AnnualReportPDFProps {
  groupedReports: GroupedReports;
  totalYearlySales: number;
}

export const AnnualReportPDF = ({
  groupedReports,
  totalYearlySales,
}: AnnualReportPDFProps) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte Anual de Ventas</Text>
          <Text style={styles.subtitle}>
            Fecha: {new Date().toLocaleDateString("es-ES")}
          </Text>
          <Text style={styles.subtitle}>
            Total de Ventas del Año: {formatCurrency(totalYearlySales)}
          </Text>
        </View>

        {Object.keys(groupedReports).map((month) => {
          const monthlyReport = groupedReports[month];

          const sellersSummary: {
            [key: string]: { totalSold: number; quantitySold: number };
          } = {};

          monthlyReport.reports.forEach((report) => {
            const sellerName = report.user.name;
            if (sellersSummary[sellerName]) {
              const totalSold = report.saleDetails.reduce(
                (acc, detail) => acc + detail.quantity * detail.product.price,
                0
              );
              const quantitySold = report.saleDetails.reduce(
                (acc, detail) => acc + detail.quantity,
                0
              );

              sellersSummary[sellerName].totalSold += totalSold;
              sellersSummary[sellerName].quantitySold += quantitySold;
            } else {
              const totalSold = report.saleDetails.reduce(
                (acc, detail) => acc + detail.quantity * detail.product.price,
                0
              );
              const quantitySold = report.saleDetails.reduce(
                (acc, detail) => acc + detail.quantity,
                0
              );

              sellersSummary[sellerName] = { totalSold, quantitySold };
            }
          });

          const totalMonthlySales = monthlyReport.totalAmount;

          return (
            <View style={styles.section} key={month}>
              {/* Encabezado del mes */}
              <View style={styles.sectionHeader}>
                <Text style={{ width: "50%" }}>Mes: {month}</Text>
                <Text style={{ width: "50%", textAlign: "right" }}>
                  Total: {formatCurrency(totalMonthlySales)}
                </Text>
              </View>

              {Object.keys(sellersSummary).map((sellerName) => {
                const seller = sellersSummary[sellerName];
                return (
                  <View style={styles.reportRow} key={sellerName}>
                    <Text style={{ width: "50%" }}>
                      Vendedora: {sellerName}
                    </Text>
                    <Text style={{ width: "50%", textAlign: "right" }}>
                      Total vendido: {formatCurrency(seller.totalSold)}
                    </Text>
                  </View>
                );
              })}

              {/* Cantidad vendida por vendedora */}
              {Object.keys(sellersSummary).map((sellerName) => {
                const seller = sellersSummary[sellerName];
                return (
                  <View style={styles.reportRow} key={`${sellerName}-quantity`}>
                    <Text style={{ width: "50%" }}>
                      Cantidad vendida: {sellerName}
                    </Text>
                    <Text style={{ width: "50%", textAlign: "right" }}>
                      {seller.quantitySold} productos
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}

        <View style={styles.footer}>
          <Text>Reporte generado por el sistema</Text>
        </View>
      </Page>
    </Document>
  );
};

export default AnnualReportPDF;
