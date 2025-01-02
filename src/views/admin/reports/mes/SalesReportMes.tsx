import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  calculateProductSalesSummary,
  formatCurrency,
} from "../../../../utils";
import { GroupedReports } from "../../../../types/schemas/ventas";

// Registrando la fuente profesional
Font.register({
  family: "Helvetica",
  fontWeight: "normal",
  fontStyle: "normal",
  src: "https://fonts.gstatic.com/s/helvetica/v12/Jt6qckqIG2y6B1j8s6sVt0z3rZ2viX2wcmVJBQ.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    paddingBottom: 10,
    borderBottom: "2px solid #ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: 12,
    padding: 8,
    backgroundColor: "#f4f4f4",
    borderBottom: "1px solid #ddd",
    textTransform: "uppercase",
    color: "#333",
  },
  sectionContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    fontSize: 10,
    borderBottom: "1px solid #eee",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: 11,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderBottom: "2px solid #ccc",
    color: "#333",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    fontSize: 10,
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    width: "33%",
    textAlign: "center",
    padding: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#444",
  },
  productDetails: {
    fontSize: 10,
  },
});

interface SalesReportPDFProps {
  groupedReports: GroupedReports;
  productSalesSummary: {
    productName: string;
    quantitySold: number;
    totalAmountSold: number;
  }[];
}

export const SalesReportPDF = ({
  groupedReports,
  productSalesSummary,
}: SalesReportPDFProps) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Ventas</Text>
          <Text style={styles.subtitle}>
            Fecha: {new Date().toLocaleDateString("es-ES")}
          </Text>
        </View>

        {Object.keys(groupedReports).map((date) => {
          const dailyReport = groupedReports[date];

          return (
            <View style={styles.section} key={date}>
              <Text style={styles.subtitle}>Fecha: {date}</Text>

              <View style={styles.sectionHeader}>
                <Text style={{ width: "50%" }}>Monto Total:</Text>
                <Text style={{ width: "50%" }}>
                  {formatCurrency(dailyReport.totalAmount)}
                </Text>
              </View>

              {/* Información de la vendedora */}
              {dailyReport.reports.length > 0 && (
                <View style={styles.sectionContent}>
                  <Text style={{ width: "50%" }}>Vendedora:</Text>
                  <Text style={{ width: "50%" }}>
                    {dailyReport.reports[0].user.name}
                  </Text>
                </View>
              )}

              {/* Tabla de productos vendidos */}
              {calculateProductSalesSummary(productSalesSummary).map(
                (categoryGroup) => (
                  <View key={categoryGroup.category}>
                    <Text style={styles.categoryName}>
                      {categoryGroup.category}
                    </Text>

                    {categoryGroup.products.map((product) => (
                      <View style={styles.tableRow} key={product.productName}>
                        <Text style={styles.tableCell}>
                          {product.productName}
                        </Text>
                        <Text style={styles.tableCell}>
                          {product.quantitySold}
                        </Text>
                        <Text style={styles.tableCell}>
                          {formatCurrency(product.totalAmountSold)}
                        </Text>
                      </View>
                    ))}
                  </View>
                )
              )}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default SalesReportPDF;
