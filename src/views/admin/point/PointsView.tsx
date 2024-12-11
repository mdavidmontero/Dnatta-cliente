import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import ButtonNavigate from "../../../components/shared/ButtonNavigate";
import { getPoints } from "../../../actions/point.actions";
import PointTable from "../../../components/point/PointTable";
import { useAuth } from "@/hook/useAuth";
import { Navigate } from "react-router-dom";

export default function PointsViewsForm() {
  const { data: user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryFn: getPoints,
    queryKey: ["points"],
  });

  if (user?.role !== "ADMIN") return <Navigate to="/404" />;

  if (isLoading)
    return <div className="py-4 text-xl text-center">Cargando puntos...</div>;
  if (isError)
    return (
      <div className="py-4 text-xl text-center text-red-600">
        Error al cargar los puntos.
      </div>
    );

  if (data)
    return (
      <div className="container px-4 py-4 mx-auto">
        <Heading>Administrar Puntos de Venta</Heading>

        <div className="flex flex-col gap-5 mb-6 lg:gap-0 lg:flex-row lg:justify-between">
          <ButtonNavigate label="Crear Punto" toUrl="/new-point" />
        </div>

        <PointTable points={data} />
      </div>
    );
}
