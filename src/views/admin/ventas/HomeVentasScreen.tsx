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
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
          <Heading>Elige y Personaliza tu Pedido a Continuación</Heading>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
}
