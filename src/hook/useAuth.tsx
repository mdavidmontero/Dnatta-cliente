import { useQuery } from "@tanstack/react-query";
import { getUser } from "../actions/auth.actions";
import { useEffect } from "react";
import { userAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const setUser = userAuthStore((state) => state.setUser);

  const { data, isError, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["userauthenticated"],
    retry: 1,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data) {
      setUser(data); // Guarda el usuario en Zustand
    }
  }, [data, setUser]);

  return { data, isError, isLoading };
};
