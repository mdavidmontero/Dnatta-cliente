import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEstado } from "../../actions/products.actions";
import { toast } from "sonner";

interface EditEstadoProps {
  productos: number;
  estado: boolean;
}

const EditEstado = ({ productos, estado }: EditEstadoProps) => {
  const queryClient = useQueryClient();
  const mutationEstado = useMutation({
    mutationFn: ({ estado }: { estado: boolean }) =>
      updateEstado(productos, estado),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEstado = () => {
    mutationEstado.mutate({ estado: !estado });
  };

  return (
    <button
      onClick={handleEstado}
      className={
        estado
          ? "bg-blue-500 hover:bg-blue-600 p-3 text-white font-bold rounded-md"
          : " bg-red-500 font-bold p-3 text-white rounded-md"
      }
    >
      {estado ? "Disponible" : "No disponible"}
    </button>
  );
};

export default EditEstado;
