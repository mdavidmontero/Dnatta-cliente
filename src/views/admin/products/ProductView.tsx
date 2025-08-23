import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductTable from "../../../components/products/ProductTable";
import PaginacionShared from "../../../components/shared/PaginacionShared";
import { getProducts } from "../../../actions/products.actions";
import SearchInput from "../../../components/shared/SearchInput";
import Heading from "../../../components/shared/Heading";
import ButtonNavigate from "../../../components/shared/ButtonNavigate";
import Spinner from "@/components/shared/spinner/Spinner";

export default function ProductView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["products", currentPage, searchTerm],
    queryFn: () => getProducts(currentPage, limit, searchTerm),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center my-3">
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <div className="py-4 text-xl text-center text-red-600">
        Error al cargar los productos.
      </div>
    );

  return (
    <div className="container px-4 py-4 mx-auto">
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col gap-5 mb-6 lg:gap-0 lg:flex-row lg:justify-between">
        <ButtonNavigate label="Crear Producto" toUrl="/new-product" />
        <SearchInput
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
          placeholder="Buscar Producto"
        />
      </div>

      <ProductTable products={data?.products || []} />

      <PaginacionShared
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        onPageChange={handlePageChange}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
}
