import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Categories, useNewProductForm } from "../../types";
import ErrorMessage from "../ErrorMessage";

interface ProductFormProps {
  register: UseFormRegister<useNewProductForm>;
  errors: FieldErrors<useNewProductForm>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: Categories[];
}

export default function ProductForm({
  register,
  errors,
  handleChange,
  categories,
}: ProductFormProps) {
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
          type="number"
          inputMode="decimal"
          step="0.01"
          {...register("price", { required: "El precio es obligatorio" })}
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
            // opcional: convierte a number, y si queda vacío => undefined para que falle 'required'
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
        >
          <option value={0} disabled>
            -- Seleccione --
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <ErrorMessage>{errors.categoryId.message}</ErrorMessage>
        )}

        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="handle">Imagen:</label>
          <input
            id="image"
            type="file"
            name="handle"
            className="object-cover p-2 border-none rounded-lg bg-slate-100"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
