import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useNewProductForm } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../actions/categories.actions";
import ErrorMessage from "../ErrorMessage";

interface ProductFormProps {
  register: UseFormRegister<useNewProductForm>;
  errors: FieldErrors<useNewProductForm>;
}

export default function ProductForm({ register, errors }: ProductFormProps) {
  const { data } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
  return (
    <>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
          className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          placeholder="Nombre Producto"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          {...register("price", {
            required: "El precio es obligatorio",
          })}
          className="block w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          placeholder="Precio Producto"
        />
        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
          id="categoryId"
          {...register("categoryId", {
            required: "La categoría es obligatoria",
          })}
        >
          <option value="">-- Seleccione --</option>
          {data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <ErrorMessage>{errors.categoryId.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
