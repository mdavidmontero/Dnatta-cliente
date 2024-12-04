import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import { getProductByCategory } from "../../../actions/ventas.actions";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/ventas/ProductCard";

export default function HomeVentasScreen() {
  const { slug } = useParams();
  const { data } = useQuery({
    queryFn: () => getProductByCategory(slug!),
    queryKey: ["products", slug],
  });
  if (data)
    return (
      <>
        <Heading>Elige y Personaliza tu Pedido a Continuación</Heading>
        <div className="grid items-start grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-4">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
}
