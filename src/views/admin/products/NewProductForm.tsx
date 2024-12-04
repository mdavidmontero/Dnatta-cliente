import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNewProductForm } from "../../../types";
import {
  createProduct,
  editProduct,
  getProduct,
} from "../../../actions/products.actions";
import { toast } from "sonner";
import ProductForm from "../../../components/products/ProductForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function NewProductForm() {
  const params = useParams();
  const productId = +params.id!;

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
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
        estado: data.estado,
      });
    }
  }, [data]);

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
    <div className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
      <legend className="text-2xl font-bold text-center text-slate-800">
        {productId ? "Editar Producto" : "Crear Producto"}
      </legend>
      <form
        className="space-y-5"
        noValidate
        onSubmit={handleSubmit(handleProductAction)}
      >
        <ProductForm register={register} errors={errors} />
        <input
          type="submit"
          className="w-full p-3 mt-5 font-bold text-white bg-indigo-600 cursor-pointer hover:bg-indigo-800"
          value={productId ? "Guardar Cambios" : "Registrar Producto"}
        />
      </form>
    </div>
  );
}
