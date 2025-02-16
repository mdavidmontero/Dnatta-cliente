import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import Heading from "../../../components/shared/Heading";
import { getProductByCategory } from "../../../actions/ventas.actions";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/ventas/ProductCard";

export default function HomeVentasScreen() {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products, isLoading } = useQuery({
    queryFn: () => getProductByCategory(slug!),
    queryKey: ["products", slug],
    staleTime: 1000 * 60 * 5,
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (isLoading) return <p>Cargando productos...</p>;

  return (
    <div className="container px-4 mx-auto">
     
      <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
        <Heading>Registra el Pedido a Continuación</Heading>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE9000] focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="text-red-600 transition-colors hover:text-red-700"
            >
              <ArchiveBoxXMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

    
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
