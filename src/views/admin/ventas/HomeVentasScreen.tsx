import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import { getProductByCategory } from "../../../actions/ventas.actions";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/ventas/ProductCard";
import SearchProduct from "@/components/ventas/SearchProduct";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function HomeVentasScreen() {
  const { slug } = useParams();

  const { data: products = [], isLoading } = useQuery({
    queryFn: () => getProductByCategory(slug!),
    queryKey: ["products", slug],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );

  if (!products || products.length === 0)
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6 mb-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">
              Registra el Pedido
            </h1>
            <p className="mt-2 text-muted-foreground">
              Selecciona productos para agregar al pedido
            </p>
          </div>
          <div className="lg:w-80">
            <input
              type="search"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 border rounded-lg border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-6 mb-6 rounded-full bg-muted/50">
            <ExclamationTriangleIcon className="w-16 h-16 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            No hay productos disponibles
          </h3>
          <p className="max-w-md text-muted-foreground">
            No se encontraron productos en esta categoría. Intenta seleccionar
            otra categoría o contacta al administrador.
          </p>
        </div>
      </div>
    );

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
        <Heading>Registra el Pedido a Continuación</Heading>
        <SearchProduct />
      </div>

      <div className="grid items-stretch grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
