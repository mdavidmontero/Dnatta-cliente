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
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 10,
    color: "#555",
    marginBottom: 15,
  },
  dayHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1px solid #000000",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    fontWeight: "bold",
    padding: 5,
    borderBottom: "1px solid #000000",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
    padding: 5,
    borderBottom: "1px solid #DDDDDD",
  },
  categoryRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    fontWeight: "bold", // Negrita para categorías
    padding: 5,
    marginTop: 10,
  },
  totalRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    fontSize: 10,
    fontWeight: "bold", // Negrita para subtotales
    padding: 5,
    marginTop: 5,
  },
  cell: {
    width: "25%",
    textAlign: "left",
  },
  cellRight: {
    width: "25%",
    textAlign: "right",
  },
  separator: {
    borderBottom: "1px solid #000000",
    marginVertical: 10,
  },
});

interface SalesReportPDFProps {
  groupedReports: GroupedReports;
}

export const SalesReportPDF = ({ groupedReports }: SalesReportPDFProps) => {
  // Ordenar las fechas
  const sortedDates = Object.keys(groupedReports).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Ventas Mensual</Text>
          <Text style={styles.subtitle}>
            Generado el: {new Date().toLocaleDateString("es-ES")}
          </Text>
        </View>

        {sortedDates.map((date, index) => {
          const dailyReport = groupedReports[date];

          // Obtener todas las vendedoras únicas del día
          const vendedoras = [
            ...new Set(dailyReport.reports.map((report) => report.user.name)),
          ].join(", ");

          // Calcular los productos vendidos por categoría
          const productsForDate = dailyReport.reports.flatMap((report) =>
            report.saleDetails.map((detail) => ({
              productName: detail.product.name,
              quantitySold: detail.quantity,
              totalAmountSold: detail.unitPrice * detail.quantity,
              category: detail.product.categoryId, // Usar categoryId o category según tu esquema
            }))
          );

          const categorySummary = calculateProductSalesSummary(productsForDate);

          return (
            <View key={date}>
              {/* Encabezado del día */}
              <View style={styles.dayHeader}>
                <Text style={styles.cell}>Fecha: {date}</Text>
                <Text style={styles.cellRight}>
                  Monto Total: {formatCurrency(dailyReport.totalAmount)}
                </Text>
                <Text style={styles.cellRight}>Vendedoras: {vendedoras}</Text>
              </View>

              {/* Tabla de productos vendidos */}
              <View style={styles.tableHeader}>
                <Text style={styles.cell}>Categoría</Text>
                <Text style={styles.cell}>Producto</Text>
                <Text style={styles.cellRight}>Cantidad</Text>
                <Text style={styles.cellRight}>Total Vendido</Text>
              </View>

              {categorySummary.map((categoryGroup) => (
                <View key={categoryGroup.category}>
                  {/* Nombre de la categoría */}
                  <View style={styles.categoryRow}>
                    <Text style={styles.cell}>{categoryGroup.category}</Text>
                    <Text style={styles.cellRight}></Text>
                    <Text style={styles.cellRight}></Text>
                    <Text style={styles.cellRight}></Text>
                  </View>

                  {/* Productos de la categoría */}
                  {categoryGroup.products.map((product) => (
                    <View style={styles.tableRow} key={product.productName}>
                      <Text style={styles.cell}></Text>
                      <Text style={styles.cell}>{product.productName}</Text>
                      <Text style={styles.cellRight}>
                        {product.quantitySold}
                      </Text>
                      <Text style={styles.cellRight}>
                        {formatCurrency(product.totalAmountSold)}
                      </Text>
                    </View>
                  ))}

                  {/* Subtotal de la categoría */}
                  <View style={styles.totalRow}>
                    <Text style={styles.cellRight}>Subtotal:</Text>
                    <Text style={styles.cellRight}>
                      {formatCurrency(categoryGroup.subtotal)}
                    </Text>
                  </View>
                </View>
              ))}

              {/* Separador entre días (excepto después del último día) */}
              {index < sortedDates.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default SalesReportPDF;
