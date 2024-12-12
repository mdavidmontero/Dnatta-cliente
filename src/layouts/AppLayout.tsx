import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/shared/AdminSidebar";
import { Toaster } from "sonner";
import { useAuth } from "../hook/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStorePoint } from "../store/userStore";
import { MessagesPopover } from "@/views/admin/message/MessagesPopover";
import { getTokensConfirmUsers } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

export default function AppLayout() {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { data, isError, isLoading } = useAuth();
  const clearPoint = useStorePoint((state) => state.clearPoint);
  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    clearPoint();
    navigation("/", { replace: true });
    queryClient.clear();
  };
  const { data: tokensConfirm } = useQuery({
    queryFn: getTokensConfirmUsers,
    queryKey: ["getTokensConfirmUsers"],
  });

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
                {data.role === "ADMIN" && (
                  <MessagesPopover tokens={tokensConfirm} />
                )}
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
