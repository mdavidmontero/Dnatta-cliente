import { getUsers } from "@/actions/auth.actions";
import { getPoints } from "@/actions/point.actions";
import { useQuery } from "@tanstack/react-query";

export const useVentas = () => {
  const pointsData = useQuery({
    queryKey: ["points"],
    queryFn: () => getPoints(),
    enabled: true,
  });

  const usersData = useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers(),
    enabled: true,
  });
  const userVendedoras = usersData?.data?.filter(
    (user) => user.role !== "ADMIN"
  );

  return {
    pointsData,
    usersData,
    userVendedoras,
  };
};
