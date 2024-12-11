import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PointsI } from "../../../types";
import { toast } from "sonner";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  createPoint,
  getPoint,
  updatePoint,
} from "../../../actions/point.actions";
import PointForm from "../../../components/point/PointForm";
import GoBackButton from "../../../components/ui/GoBackButton";
import { useAuth } from "@/hook/useAuth";

export default function PointsView() {
  const { data: user } = useAuth();
  const params = useParams();
  const pointId = +params.id!;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getPoint(pointId),
    queryKey: ["points", pointId],
    enabled: !!pointId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PointsI>({
    defaultValues: {
      name: "",
      ubicacion: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        ubicacion: data.ubicacion,
      });
    }
  }, [data, reset]);

  const usecreatePointMutation = useMutation({
    mutationFn: createPoint,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["points"] });
      reset();
    },
  });

  const useupdatePointMutation = useMutation({
    mutationFn: updatePoint,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["points"] });
      reset();
    },
  });

  const handlePointAction = async (formData: PointsI) => {
    const adjustedFormData = {
      ...formData,
      name: formData.name,
      ubicacion: formData.ubicacion,
    };
    if (pointId) {
      const data = {
        pointId,
        formData: adjustedFormData,
      };
      useupdatePointMutation.mutate(data);
    } else {
      usecreatePointMutation.mutate(adjustedFormData);
    }
  };
  if (user?.role !== "ADMIN") return <Navigate to="/" />;

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) return <Navigate to="/points" />;

  return (
    <>
      <GoBackButton />
      <div className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md">
        <legend className="text-2xl font-bold text-center text-slate-800">
          {pointId ? "Editar Punto" : "Crear Punto"}
        </legend>
        <form
          className="space-y-5"
          noValidate
          onSubmit={handleSubmit(handlePointAction)}
        >
          <PointForm register={register} errors={errors} />

          <input
            disabled={useupdatePointMutation.isPending}
            type="submit"
            className="w-full p-3 mt-5 font-bold text-white bg-indigo-600 cursor-pointer disabled:opacity-50 hover:bg-indigo-800"
            value={pointId ? "Guardar Cambios" : "Registrar Punto"}
          />
        </form>
      </div>
    </>
  );
}
