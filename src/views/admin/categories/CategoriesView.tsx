import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategory,
  getCategories,
} from "../../../actions/categories.actions";
import CategoriesTable from "../../../components/categories/CategoriesTable";
import ButtonNavigate from "../../../components/shared/ButtonNavigate";
import Heading from "../../../components/shared/Heading";
import { toast } from "sonner";
import { Categories } from "../../../types";
import ModalConfirmCategory from "../../../components/categories/ModalConfirm";

export default function CategoriesView() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
  const useMutationDeleteCategory = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDeleteCategory = (id: Categories["id"]) => {
    useMutationDeleteCategory.mutate(id);
  };
  return (
    <div className="container px-4 py-4 mx-auto">
      <Heading>Administrar Categorias</Heading>

      <div className="flex flex-col gap-5 mb-6 lg:gap-0 lg:flex-row lg:justify-between">
        <ButtonNavigate label="Crear Categoria" toUrl="/new-categories" />
      </div>

      <CategoriesTable
        categories={data || []}
        handleDeleteCategory={handleDeleteCategory}
      />
      <ModalConfirmCategory handleDeleteCategory={handleDeleteCategory} />
    </div>
  );
}
