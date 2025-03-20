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
        // Si la caja está abierta, mostrar error
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
              <div className="flex justify-end gap-5 py-2">
                {showPopover && <MessagesPopover tokens={tokenConfirmFilter} />}
                <Button
                  onClick={handleLogout}
                  className="w-full px-10 py-5 text-xl font-bold text-center text-white rounded-lg cursor-pointer bg-bg-violeta hover:bg-bg-violeta-hover lg:w-auto"
                >
                  Cerrar Sesión
                </Button>
              </div>

              <Outlet />
            </main>
          </div>
        </div>
        <Toaster position={"top-right"} />
      </>
    );
}
