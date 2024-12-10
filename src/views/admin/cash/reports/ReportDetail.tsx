import { cashReportSchemaI } from "@/types/schemas/cash";
import { formatCurrency } from "@/utils";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: "2px solid #333",
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "2px solid #ccc",
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f1f1f1",
    padding: 8,
    fontWeight: "bold",
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottom: "1px solid #eee",
  },
  column: {
    width: "33%",
    textAlign: "center",
    fontSize: 12,
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: "2px solid #333",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
  platformTotals: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
});

interface Props {
  data: cashReportSchemaI;
  totalTrasferencias: {
    totalTransferenciasUsuario: number | undefined;
    totalEfectivoUsuario: number | undefined;
    transferPlatformTotals: Record<string, number>;
  }[];
}

export default function ReportDetail({ data, totalTrasferencias }: Props) {
  const formattedDate = new Date(data.date).toLocaleDateString("es-ES");

  const groupedProducts = data.point?.sales
    ?.flatMap((sale) => sale!.saleDetails || [])
    .reduce((acc, detail) => {
      if (detail?.product?.name) {
        const productName = detail.product.name;
        if (!acc[productName]) {
          acc[productName] = {
            name: productName,
            totalQuantity: 0,
            totalPrice: 0,
          };
        }
        acc[productName].totalQuantity += detail.quantity;
        acc[productName].totalPrice += detail.quantity * detail.unitPrice;
      }
      return acc;
    }, {} as Record<string, { name: string; totalQuantity: number; totalPrice: number }>);

  const groupedProductArray = Object.values(
    groupedProducts as unknown as Record<
      string,
      { name: string; totalQuantity: number; totalPrice: number }
    >
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Ventas del Día</Text>
          <Text style={styles.subtitle}>Dnata Helados</Text>
          <Text style={styles.subtitle}>Fecha: {formattedDate}</Text>
          <Text style={styles.subtitle}>
            Hora: {new Date().toLocaleTimeString()}
          </Text>
          <Text style={styles.subtitle}>
            Identificador de Factura: {data.id}
          </Text>
          <Text style={styles.subtitle}>
            Punto de Venta: {data.point?.name}
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Productos Vendidos</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.column}>Producto</Text>
          <Text style={styles.column}>Cantidad</Text>
          <Text style={styles.column}>Total</Text>
        </View>
        {groupedProductArray.map((product) => (
          <View style={styles.tableRow} key={product.name}>
            <Text style={styles.column}>{product.name}</Text>
            <Text style={styles.column}>{product.totalQuantity}</Text>
            <Text style={styles.column}>
              {formatCurrency(product.totalPrice)}
            </Text>
          </View>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Movimientos de Efectivo</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.column}>Concepto</Text>
          <Text style={styles.column}>Cantidad</Text>
        </View>
        {data.cashMovements?.map((movement, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.column}>{movement!.concept}</Text>
            <Text style={styles.column}>
              {formatCurrency(movement!.amount)}
            </Text>
          </View>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Dinero en Caja</Text>
        </View>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.column}>Denominación</Text>
            <Text style={styles.column}>Cantidad</Text>
            <Text style={styles.column}>Total</Text>
          </View>
          {data.cashDetails?.map((cash, index) => (
            <>
              <View style={styles.tableRow} key={index}>
                <Text style={styles.column}>{cash!.denomination}</Text>
                <Text style={styles.column}>
                  {formatCurrency(cash!.quantity)}
                </Text>
                <Text style={styles.column}>
                  {formatCurrency(cash!.totalDenomination)}
                </Text>
              </View>
            </>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Total Ventas del Día: {formatCurrency(data.totalventaHelados || 0)}
          </Text>
          <Text style={styles.footerText}>
            Total en Transferencias:{" "}
            {formatCurrency(
              totalTrasferencias?.[0]?.totalTransferenciasUsuario || 0
            )}
          </Text>
          <Text style={styles.footerText}>
            Total en Efectivo:{" "}
            {formatCurrency(totalTrasferencias?.[0]?.totalEfectivoUsuario || 0)}
          </Text>

          {Object.entries(
            totalTrasferencias[0]?.transferPlatformTotals || {}
          ).map(([platform, amount]) => (
            <Text key={platform} style={styles.platformTotals}>
              {platform.toLocaleUpperCase()}: {formatCurrency(amount)}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
