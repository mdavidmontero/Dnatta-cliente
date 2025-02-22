import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import { getProductByCategory } from "../../../actions/ventas.actions";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/ventas/ProductCard";
import SearchProduct from "@/components/ventas/SearchProduct";

export default function HomeVentasScreen() {
  const { slug } = useParams();

  const { data: products, isLoading } = useQuery({
    queryFn: () => getProductByCategory(slug!),
    queryKey: ["products", slug],
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Cargando productos...</p>;

  if (products)
    return (
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
          <Heading>Registra el Pedido a Continuación</Heading>
          <SearchProduct />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
}
