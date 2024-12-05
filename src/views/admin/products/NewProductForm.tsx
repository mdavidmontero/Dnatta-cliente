import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNewProductForm } from "../../../types";
import {
  createProduct,
  editProduct,
  getProduct,
  uploadImage,
} from "../../../actions/products.actions";
import { toast } from "sonner";
import ProductForm from "../../../components/products/ProductForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../../../components/shared/spinner/Spinner";
import GoBackButton from "../../../components/ui/GoBackButton";
import { getImagePath } from "../../../utils";

export default function NewProductForm() {
  const params = useParams();
  const productId = +params.id!;

  const queryClient = useQueryClient(); // Accedemos al cliente de React Query

  const { data, isLoading } = useQuery({
    queryFn: () => getProduct(productId),
    queryKey: ["product", productId],
    enabled: !!productId,
  });

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

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
        estado: data.estado,
        image: data.image,
      });
    }
  }, [data, reset]);

  const usecreateProductMutation = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const useupdateProductMutation = useMutation({
    mutationFn: editProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const mutationImage = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      mutationImage.mutate({ productId: +productId, file: e.target.files[0] });
    }
  };

  const handleProductAction = async (formData: useNewProductForm) => {
    const adjustedFormData = {
      ...formData,
      categoryId: +formData.categoryId,
      price: +formData.price,
    };
    if (productId) {
      const data = {
        productId,
        formData: adjustedFormData,
      };
      useupdateProductMutation.mutate(data);
    } else {
      usecreateProductMutation.mutate(adjustedFormData);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <GoBackButton />
      <div className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
        <legend className="text-2xl font-bold text-center text-slate-800">
          {productId ? "Editar Producto" : "Crear Producto"}
        </legend>
        <form
          className="space-y-5"
          noValidate
          onSubmit={handleSubmit(handleProductAction)}
        >
          <ProductForm
            register={register}
            errors={errors}
            handleChange={handleChange}
          />

          {mutationImage.isPending ? (
            <div className="flex justify-center my-3">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center my-3">
              <img
                src={getImagePath(data!.image)}
                alt="Imagen de producto"
                className="object-contain w-56 h-56 rounded-xl"
              />
            </div>
          )}
          <input
            disabled={mutationImage.isPending}
            type="submit"
            className="w-full p-3 mt-5 font-bold text-white bg-indigo-600 cursor-pointer disabled:opacity-50 hover:bg-indigo-800"
            value={productId ? "Guardar Cambios" : "Registrar Producto"}
          />
        </form>
      </div>
    </>
  );
}
