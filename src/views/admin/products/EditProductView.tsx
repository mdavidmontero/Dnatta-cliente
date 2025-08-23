import { getProduct } from "@/actions/products.actions";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import EditProductForm from "./EditProductForm";
import { getCategories } from "@/actions/categories.actions";

export default function EditProductView() {
  const params = useParams();
  const productId = +params.id!;
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getProduct(productId),
    queryKey: ["product", productId],
    retry: false,
  });
  const { data: categories } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;

  if (data && categories)
    return <EditProductForm data={data} categories={categories} />;
}
