import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/actions/products.actions";
import ProductCard from "./ProductCard";

export default function SearchProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const { data: searchProduct = [], isLoading } = useQuery({
    queryKey: ["products search", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    staleTime: 1000 * 60 * 5,
    enabled: !!searchTerm,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Buscar Producto</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Buscar Producto</DialogTitle>
        </DialogHeader>
        <div className="flex items-center w-full gap-2 p-2">
          <input
            type="text"
            placeholder="Nombre de Producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE9000] focus:border-transparent"
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
        <div className="flex-1 p-2 overflow-auto">
          {isLoading ? (
            <p className="text-center text-gray-500">Cargando...</p>
          ) : searchProduct.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {searchProduct.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No se encontraron productos.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
