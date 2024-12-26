import { OrderItem } from "@/types";
import { formatCurrency } from "@/utils";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useMemo } from "react";

const styles = StyleSheet.create({
  page: {
    width: "58mm",
    padding: "1mm",
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
    marginBottom: "2mm",
  },
  businessName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: "1mm",
  },
  businessInfo: {
    fontSize: 8,
    marginBottom: "0.5mm",
  },
  divider: {
    borderBottom: "0.5px solid black",
    marginVertical: "2mm",
  },
  section: {
    marginVertical: "2mm",
  },
  table: {
    marginVertical: "2mm",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    marginBottom: "1mm",
  },
  boldText: {
    fontWeight: "bold",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "3mm",
    fontSize: 10,
    fontWeight: "bold",
  },
  persontext: {
    fontSize: 8,
    marginBottom: "0.5mm",
  },
  footer: {
    marginTop: "4mm",
    fontSize: 8,
    textAlign: "center",
  },
});
interface Props {
  sale: OrderItem[];
  paymentMethod: string;
  user: {
    id: number;
    name: string;
    image: string | null;
    email: string;
    role: string;
    confirmed: boolean;
  } | null;
}

const TickeSale = ({ sale, paymentMethod, user }: Props) => {
  const totalAmount = useMemo(
    () => sale.reduce((total, item) => total + item.quantity * item.price, 0),
    [sale]
  );
  return (
    <>
      <Document>
        <Page size={[164, "auto"]} style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.businessName}>DNATA</Text>
            <Text style={styles.businessInfo}>Tel: 3206180237</Text>
            <Text style={styles.businessInfo}>Comprobante de entrega</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.businessInfo}>
              Fecha: {new Date().toLocaleDateString()} - Hora:{" "}
              {new Date().toLocaleTimeString()}
            </Text>
            <Text style={styles.businessInfo}>
              Ticket #: {Math.floor(1000 + Math.random() * 9000).toString()}
            </Text>
            <Text style={styles.businessInfo}>
              Medio de Pago: {paymentMethod}
            </Text>
            <Text style={styles.businessInfo}>
              Artículos Vendidos: {sale.length}
            </Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.boldText}>PRODUCTO</Text>
              <Text style={styles.boldText}>CANT</Text>
              <Text style={styles.boldText}>SUBTOTAL</Text>
            </View>
          </View>
          {sale.map((item) => (
            <View style={styles.table} key={item.id}>
              <View style={styles.row}>
                <Text>{item.name}</Text>
                <Text>{item.quantity}</Text>
                <Text>{item.subtotal}</Text>
              </View>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.total}>
            <Text>Total:</Text>
            <Text>{formatCurrency(totalAmount)}</Text>
          </View>
          <View style={styles.persontext}>
            <Text>Atendido por: {user?.name}</Text>
          </View>

          <View style={styles.footer}>
            <Text>¡Gracias por su preferencia!</Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default TickeSale;
