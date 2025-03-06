import { deleteVenta, getPostVentas } from "@/actions/ventas.actions";
import Heading from "@/components/shared/Heading";
import PaginacionShared from "@/components/shared/PaginacionShared";
import ModalConfirmVenta from "@/components/ventas/ModalConfirmVenta";
import VentasTable from "@/components/ventas/TableVentas";
import { userAuthStore } from "@/store/useAuthStore";
import { useStorePoint } from "@/store/userStore";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PostVentaView() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState(new Date());
  const limit = 10;
  const point = useStorePoint((state) => state.point);
  const user = userAuthStore((state) => state.user);

  useEffect(() => {
    if (!value) {
      setValue(new Date());
    }
  }, [value]);

  const selectedDate = value ? startOfDay(value) : null;

  const { data, isLoading, isError, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["post-ventas", currentPage],
    queryFn: () =>
      getPostVentas(
        selectedDate!.toISOString(),
        currentPage,
        limit,
        +point,
        user!.id
      ),

    placeholderData: keepPreviousData,
    enabled: !!user?.id,
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const useMutationDeleteVenta = useMutation({
    mutationFn: deleteVenta,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["post-ventas"] });
    },
  });

  const handleDeleteVenta = (id: number) => {
    useMutationDeleteVenta.mutate(id);
  };
  if (isLoading)
    return <div className="py-4 text-xl text-center">Cargando Ventas...</div>;
  if (isError)
    return (
      <div className="py-4 text-xl text-center text-red-600">
        Error al cargar las ventas.
      </div>
    );

  if (data)
    return (
      <div className="container px-4 py-4 mx-auto">
        <Heading>Registro de ventas</Heading>
        {data?.sales.length > 0 && (
          <>
            <VentasTable ventas={data?.sales || []} />
            <PaginacionShared
              currentPage={currentPage}
              totalPages={data?.totalPages || 1}
              onPageChange={handlePageChange}
              isPlaceholderData={isPlaceholderData}
            />
          </>
        )}
        {data?.sales?.length === 0 && (
          <div className="mt-4 text-center text-gray-500">
            No hay ventas registradas
          </div>
        )}

        {isFetching && (
          <div className="mt-4 text-center text-gray-500">Cargando más...</div>
        )}

        <ModalConfirmVenta handleDeleteVenta={handleDeleteVenta} />
      </div>
    );
}
