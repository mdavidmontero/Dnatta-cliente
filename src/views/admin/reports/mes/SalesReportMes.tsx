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
  family: "Roboto",
  fontWeight: "normal",
  fontStyle: "normal",
  src: "https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid #000",
    paddingBottom: 5,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
    fontWeight: "bold",
    padding: 10,
  },
  sectionContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

interface SalesReportPDFProps {
  groupedReports: GroupedReports;
}

export const SalesReportPDF = ({ groupedReports }: SalesReportPDFProps) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Ventas</Text>
          <Text>Fecha: {new Date().toLocaleDateString("es-ES")}</Text>
        </View>

        {Object.keys(groupedReports).map((date) => {
          const dailyReport = groupedReports[date];
          return (
            <View style={styles.section} key={date}>
              <Text style={styles.subtitle}>Fecha: {date}</Text>
              <View style={styles.sectionHeader}>
                <Text style={{ width: "40%" }}>Monto total:</Text>
                <Text style={{ width: "60%" }}>
                  {formatCurrency(dailyReport.totalAmount)}
                </Text>
              </View>
              {dailyReport.reports.length > 0 && (
                <View style={styles.sectionContent}>
                  <Text style={{ width: "40%" }}>Vendedora:</Text>
                  <Text style={{ width: "60%" }}>
                    {dailyReport.reports[0].user.name}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default SalesReportPDF;
