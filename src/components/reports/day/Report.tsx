import { useMemo } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ReportArray } from "../../../types";
import { formatCurrency } from "../../../utils";

// Registrar la fuente
Font.register({
  family: "Roboto",
  fontStyle: "normal",
  src: "https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
  fontWeight: 400,
});

// Estilos del PDF
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
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
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 5,
    borderBottom: "1px solid #ccc",
  },
  column: {
    width: "33%",
    textAlign: "center",
    fontSize: 12,
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
    borderTop: "2px solid #000",
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

const generateInvoiceNumber = () => {
  return `INV-${Math.floor(Math.random() * 1000000)}`;
};

interface ProductSalesSummary {
  productName: string;
  quantitySold: number;
  totalAmountSold: number;
}

const calculateProductSalesSummary = (
  orders: ReportArray
): ProductSalesSummary[] => {
  const summary: { [productName: string]: ProductSalesSummary } = {};

  orders.forEach((order) => {
    order.saleDetails.forEach((detail) => {
      const { product, quantity } = detail;
      const unitPrice = detail.unitPrice;

      const productName = product.name;

      if (!summary[productName]) {
        summary[productName] = {
          productName: productName,
          quantitySold: 0,
          totalAmountSold: 0,
        };
      }

      summary[productName].quantitySold += quantity;
      summary[productName].totalAmountSold += quantity * unitPrice;
    });
  });

  return Object.values(summary);
};

interface Props {
  ordenes: ReportArray;
  totalday: number;
}

export const GeneratePdf = ({ ordenes, totalday }: Props) => {
  const productSalesSummary = useMemo(
    () => calculateProductSalesSummary(ordenes),
    [ordenes]
  );

  const totalQuantitySold = productSalesSummary.reduce(
    (sum, product) => sum + product.quantitySold,
    0
  );

  const formattedDate = new Date().toLocaleDateString("es-ES");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado del reporte */}
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Ventas del Día</Text>
          <Text style={styles.subtitle}>Dnata Helados</Text>
          <Text style={styles.subtitle}>Fecha: {formattedDate}</Text>
          <Text style={styles.subtitle}>
            Hora: {new Date().toLocaleTimeString()}
          </Text>
          <Text style={styles.subtitle}>
            Identificador de Factura: {generateInvoiceNumber()}
          </Text>
        </View>

        {/* Encabezado de la tabla */}
        <View style={styles.sectionHeader}>
          <Text style={styles.column}>Producto</Text>
          <Text style={styles.column}>Cantidad Vendida</Text>
          <Text style={styles.column}>Total por Producto</Text>
        </View>

        {/* Detalle de ventas por producto */}
        <View>
          {productSalesSummary.map((product, index) => (
            <View style={styles.section} key={index}>
              <Text style={styles.column}>{product.productName}</Text>
              <Text style={styles.column}>{product.quantitySold}</Text>
              <Text style={styles.column}>
                {formatCurrency(product.totalAmountSold)}
              </Text>
            </View>
          ))}
        </View>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text style={styles.totalText}>
            Cantidad Total Vendidos: {totalQuantitySold}
          </Text>
          <Text style={styles.totalText}>
            Total Monetario: {formatCurrency(totalday)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
