import { editProduct, uploadImage } from "@/actions/products.actions";
import ProductForm from "@/components/products/ProductForm";
import Spinner from "@/components/shared/spinner/Spinner";
import GoBackButton from "@/components/ui/GoBackButton";
import { Categories, ProductI, useNewProductForm } from "@/types";
import { getImagePath } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  data: ProductI;
  categories: Categories[];
}

export default function EditProductForm({ data, categories }: Props) {
  const params = useParams();
  const productId = +params.id!;
  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<useNewProductForm>({
    defaultValues: {
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      estado: data.estado,
      image: data.image,
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: editProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Imagen actualizada");
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
      await updateProductMutation.mutateAsync({
        productId,
        formData,
      });

      if (selectedImage) {
        await uploadImageMutation.mutateAsync({
          productId,
          file: selectedImage,
        });
        setSelectedImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isSubmitting =
    updateProductMutation.isPending || uploadImageMutation.isPending;

  return (
    <>
      <GoBackButton />
      <div className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
        <legend className="text-2xl font-bold text-center text-slate-800">
          Editar Producto
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

          <div className="flex justify-center my-3 min-h-[14rem]">
            {uploadImageMutation.isPending ? (
              <Spinner />
            ) : previewUrl ? (
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
            ) : data?.image ? (
              <img
                src={getImagePath(data.image)}
                alt="Imagen actual del producto"
                className="object-contain w-56 h-56 rounded-xl"
              />
            ) : (
              <span className="text-gray-500">Sin imagen disponible</span>
            )}
          </div>

          <input
            disabled={isSubmitting}
            type="submit"
            className="w-full p-3 mt-5 font-bold text-white bg-indigo-600 cursor-pointer disabled:opacity-50 hover:bg-indigo-800"
            value={isSubmitting ? "Guardando..." : "Guardar Cambios"}
          />
        </form>
      </div>
    </>
  );
}
