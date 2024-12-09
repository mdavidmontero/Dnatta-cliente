import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CategorieNewForm } from "../../../types";
import { toast } from "sonner";
import {
  createCategory,
  getcategory,
  updateCategory,
} from "../../../actions/categories.actions";
import ErrorMessage from "../../../components/ErrorMessage";
import { useEffect } from "react";

export default function NewCategories() {
  const params = useParams();
  const categoryId = +params.id!;

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: () => getcategory(categoryId),
    queryKey: ["category", categoryId],
    enabled: !!categoryId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategorieNewForm>({
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        slug: data.slug,
      });
    }
  }, [data, reset]);

  const usecreateCategoryMutation = useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
    },
  });

  const useupdateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
    },
  });

  const handleActionCategory = (formData: CategorieNewForm) => {
    const adjustformdata = {
      ...formData,
    };
    if (categoryId) {
      const data = {
        id: categoryId,
        formData: adjustformdata,
      };
      useupdateCategoryMutation.mutate(data);
    } else {
      usecreateCategoryMutation.mutate(formData);
    }
  };
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
        <legend className="text-2xl font-bold text-center text-slate-800">
          {categoryId ? "Editar Categoria" : "Crear Categoria"}
        </legend>
        <form
          className="space-y-5"
          noValidate
          onSubmit={handleSubmit(handleActionCategory)}
        >
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
              placeholder="Nombre Categoria"
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          <div className="space-y-2">
            <label className="text-slate-800" htmlFor="name">
              Slug:
            </label>
            <input
              id="slug"
              type="text"
              {...register("slug", {
                required: "El slug es obligatorio",
              })}
              className="w-full p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
              placeholder="Slug categoria ej:conossencillos"
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <input
            disabled={usecreateCategoryMutation.isPending}
            type="submit"
            className="w-full p-3 mt-5 font-bold text-white bg-indigo-600 cursor-pointer disabled:opacity-50 hover:bg-indigo-800 disabled:cursor-not-allowed"
            value={categoryId ? "Guardar Cambios" : "Registrar Categoria"}
          />
        </form>
      </div>
    </>
  );
}
