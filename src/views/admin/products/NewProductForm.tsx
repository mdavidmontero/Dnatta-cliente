// NewProductForm.tsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNewProductForm } from "../../../types";
import { createProduct, uploadImage } from "../../../actions/products.actions";
import { toast } from "sonner";
import ProductForm from "../../../components/products/ProductForm";
import Spinner from "../../../components/shared/spinner/Spinner";
import GoBackButton from "../../../components/ui/GoBackButton";
import { getCategories } from "@/actions/categories.actions";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export default function NewProductForm() {
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<useNewProductForm>({
    defaultValues: {
      name: "",
      price: 0,
      categoryId: 0,
      estado: true,
      image: "",
    },
  });

  const { data: categories } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 5,
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const previewUrl = useMemo(
    () => (selectedImage ? URL.createObjectURL(selectedImage) : null),
    [selectedImage]
  );
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setSelectedImage(f);
  };

  const handleProductAction = async (formData: useNewProductForm) => {
    try {
      const payload = { ...formData, price: +formData.price };
      const created = await createProductMutation.mutateAsync(payload);

      const newId = created?.id;
      if (!newId) {
        toast.error("No se recibió el ID del producto creado.");
        return;
      }

      // 2) Subir imagen si hay archivo
      if (selectedImage) {
        await uploadImageMutation.mutateAsync({
          productId: newId,
          file: selectedImage,
        });
      }

      toast.success("Producto registrado correctamente");
      // Limpiar UI
      reset();
      setSelectedImage(null);

      // Revalidar listados
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.log(error);
    }
  };

  if (!categories) return null;

  const isSubmitting =
    createProductMutation.isPending || uploadImageMutation.isPending;

  return (
    <>
      <GoBackButton />
      <div className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
        <legend className="text-2xl font-bold text-center text-slate-800">
          Crear Producto
        </legend>

        <form
          className="space-y-5"
          noValidate
          onSubmit={handleSubmit(handleProductAction)}
        >
          <ProductForm
            categories={categories}
            register={register}
            errors={errors}
            handleChange={handleChange}
          />

          {uploadImageMutation.isPending ? (
            <div className="flex justify-center my-3">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center my-3">
              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="object-contain w-56 h-56 rounded-xl"
                  />
                  <Button
                    type="button"
                    className="w-full mt-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    Eliminar Imagen
                  </Button>
                </div>
              ) : (
                <span className="text-gray-500">Sin imagen seleccionada</span>
              )}
            </div>
          )}

          <input
            disabled={isSubmitting}
            type="submit"
            className="w-full p-3 mt-5 font-bold text-white bg-indigo-600 cursor-pointer disabled:opacity-50 hover:bg-indigo-800"
            value={
              createProductMutation.isPending
                ? "Creando..."
                : uploadImageMutation.isPending
                ? "Subiendo imagen..."
                : "Registrar Producto"
            }
          />
        </form>
      </div>
    </>
  );
}
