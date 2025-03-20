import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/shared/AdminSidebar";
import { toast, Toaster } from "sonner";
import { useAuth } from "../hook/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStorePoint } from "../store/userStore";
import { MessagesPopover } from "@/views/admin/message/MessagesPopover";
import { getTokensConfirmUsers } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { userAuthStore } from "@/store/useAuthStore";
import { statusCashRegisterOneClosed } from "@/actions/ventas.actions";
import { getPoint } from "@/actions/point.actions";

export default function AppLayout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useAuth();
  const clearPoint = useStorePoint((state) => state.clearPoint);
  const point = useStorePoint((state) => state.point);
  const user = userAuthStore((state) => state.user);

  const { data: statusCash } = useQuery({
    queryFn: () => statusCashRegisterOneClosed(+user!.id, +point),
    queryKey: ["cashregister"],
    enabled: user?.role === "USER",
  });

  const pointsSelect = useQuery({
    queryKey: ["getpointSelect"],
    queryFn: () => getPoint(point),
    enabled: user?.role === "USER",
  });

  const { data: tokensConfirm } = useQuery({
    queryFn: getTokensConfirmUsers,
    queryKey: ["getTokensConfirmUsers"],
  });

  const handleLogout = () => {
    if (user?.role === "ADMIN") {
      performLogout();
      return;
    }

    if (user?.role === "USER") {
      if (!statusCash || statusCash.isClosed) {
        performLogout();
      } else {
        toast.error("Debes cerrar la caja antes de cerrar sesión");
      }
    }
  };

  const performLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    clearPoint();
    navigate("/", { replace: true });
    queryClient.clear();
  };

  const tokenConfirmFilter = tokensConfirm?.filter(
    (token) => token.token !== ""
  );

  const showPopover = user?.role === "ADMIN" || user?.id === 3;

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/" />;
  }

  if (data)
    return (
      <>
        <div className="bg-bg-primary-bg">
          <div className="md:flex">
            <aside className="bg-white md:w-72 md:h-screen">
              <AdminSidebar />
            </aside>

            <main className="p-5 bg-bg-primary-bg md:flex-1 md:h-screen md:overflow-y-scroll">
              <div
                className={`flex flex-col gap-4 py-2  ${
                  user?.role === "USER" &&
                  "md:justify-between md:items-center md:flex-row"
                }`}
              >
                {user?.role === "USER" && (
                  <p className="text-lg font-bold text-gray-800">
                    Punto de Venta: {pointsSelect.data?.name}
                  </p>
                )}

                <div
                  className={`flex items-center  gap-4 ${
                    user?.role !== "USER" && "justify-end"
                  }`}
                >
                  {showPopover && (
                    <MessagesPopover tokens={tokenConfirmFilter} />
                  )}

                  <Button
                    onClick={handleLogout}
                    className="px-6 py-3 text-lg font-bold text-white transition-colors duration-300 rounded-lg bg-bg-violeta hover:bg-bg-violeta-hover"
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              </div>

              <Outlet />
            </main>
          </div>

          <Toaster position={"top-right"} />
        </div>
      </>
    );
}
