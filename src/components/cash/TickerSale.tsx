import { OrderItem } from "@/types";
import { formatCurrency } from "@/utils";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useMemo } from "react";

const styles = StyleSheet.create({
  page: {
    width: "58mm",
    minHeight: "auto",
    padding: "2mm",
    backgroundColor: "white",
  },
  header: {
    marginBottom: "2mm",
    textAlign: "center",
  },
  businessName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: "1mm",
  },
  businessInfo: {
    fontSize: 8,
    marginBottom: "0.5mm",
  },
  divider: {
    borderBottom: "0.5px solid black",
    marginVertical: "1mm",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    marginVertical: "0.5mm",
  },
  boldText: {
    fontWeight: "bold",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    fontWeight: "bold",
    marginVertical: "1mm",
  },
  persontext: {
    fontSize: 8,
    marginTop: "2mm",
  },
  footer: {
    fontSize: 8,
    textAlign: "center",
    marginTop: "2mm",
    marginBottom: "1mm",
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

  return (
    <Document>
      <Page size={[164, "auto"]} style={styles.page}>
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
