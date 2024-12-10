import { Navigate, useLocation } from "react-router-dom";
import { getMovementById } from "../../actions/movements.actions";
import { useQuery } from "@tanstack/react-query";
import EditMovementModal from "./EditMovementModal";

export default function EditTaskData() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movementId = queryParams.get("editmovement");

  const { data, isError } = useQuery({
    queryKey: ["movement", movementId],
    queryFn: () => getMovementById(+movementId!),
    enabled: !!movementId,
  });

  if (isError) return <Navigate to={"/404"} />;
  if (data) return <EditMovementModal data={data} movementId={+movementId!} />;
}
