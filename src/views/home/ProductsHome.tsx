import { useState } from "react";
import { getProductByCategory } from "@/actions/ventas.actions";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/actions/categories.actions";
import { formatCurrency, getImagePath } from "@/utils";

export default function ProductsHome() {
  const [slug, setSlug] = useState("conosencillo");

  const { data: categories } = useQuery({
    queryKey: ["getProductsHomeCategory"],
    queryFn: getCategories,
  });

  const { data: products } = useQuery({
    queryKey: ["getProductsHome", slug],
    queryFn: () => getProductByCategory(slug),
    enabled: !!slug,
  });

  return (
    <div className="container px-4 py-16 mx-auto space-y-10 bg-gradient-to-r from-pink-50 to-purple-50">
      <h1 className="mb-6 text-4xl font-bold text-center text-gray-900 sm:text-5xl lg:text-5xl dark:text-white">
        Nuestros Productos
      </h1>

      <div className="flex justify-center">
        <Select onValueChange={(value) => setSlug(value)}>
          <SelectTrigger className="w-64 px-4 py-2 text-lg font-medium border border-gray-300 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <SelectValue placeholder="Selecciona una Categoría" />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-md shadow-lg dark:bg-gray-800">
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="p-4 transition-transform transform bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 hover:scale-105 hover:shadow-xl dark:border-gray-700"
          >
            <div className="relative w-full h-64 overflow-hidden rounded-lg">
              <img
                src={getImagePath(product.image)}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="mt-4 space-y-2 text-center">
              <h2 className="text-lg font-bold sm:text-xl md:text-xl xl:text-2xl">
                {product.name}
              </h2>
              <p className="mt-3 text-xl sm:text-2xl md:text-2xl xl:text-3xl font-bold text-[#FE9000]">
                {formatCurrency(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
