import { OrderItem } from "@/types";
import { formatCurrency } from "@/utils";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useMemo } from "react";

const styles = StyleSheet.create({
  page: {
    width: "58mm",
    padding: "2mm",
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
  },
  businessName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  businessInfo: {
    fontSize: 8,
  },
  divider: {
    borderBottom: "0.5px solid black",
    margin: "1mm 0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    fontWeight: "bold",
    margin: "1mm 0",
  },
  persontext: {
    fontSize: 8,
  },
  footer: {
    fontSize: 8,
    textAlign: "center",
    marginTop: "1mm",
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

const TicketSale = ({ sale, paymentMethod, user }: Props) => {
  const totalAmount = useMemo(
    () => sale.reduce((total, item) => total + item.quantity * item.price, 0),
    [sale]
  );

  // Calcular la altura aproximada basada en el contenido
  const approximateHeight = Math.max(
    // Altura base para el contenido fijo
    100 +
      // Altura adicional por cada item (aproximadamente 10 unidades por item)
      sale.length * 10
  );

  return (
    <Document>
      <Page size={[164, approximateHeight]} style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.businessName}>DNATA</Text>
          <Text style={styles.businessInfo}>Tel: 3206180237</Text>
          <Text style={styles.businessInfo}>Comprobante de entrega</Text>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.businessInfo}>
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </Text>
          <Text style={styles.businessInfo}>
            #{Math.floor(1000 + Math.random() * 9000).toString()}
          </Text>
          <Text style={styles.businessInfo}>{paymentMethod}</Text>
        </View>

        <View style={styles.divider} />

        <View>
          <View style={styles.row}>
            <Text style={styles.boldText}>PROD</Text>
            <Text style={styles.boldText}>CANT</Text>
            <Text style={styles.boldText}>SUBT</Text>
          </View>
          {sale.map((item) => (
            <View style={styles.row} key={item.id}>
              <Text>{item.name}</Text>
              <Text>{item.quantity}</Text>
              <Text>{item.subtotal}</Text>
            </View>
          ))}
        </View>

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
  );
};

export default TicketSale;
