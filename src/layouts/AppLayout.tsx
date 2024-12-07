import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/shared/AdminSidebar";
import { Toaster } from "sonner";
import { useAuth } from "../hook/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useStorePoint } from "../store/userStore";

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

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/" />;
  }
  if (data)
    return (
      <>
        <div className="bg-gray-100">
          <div className="md:flex">
            <aside className="bg-white md:w-72 md:h-screen">
              <AdminSidebar />
            </aside>

            <main className="p-5 bg-gray-100 md:flex-1 md:h-screen md:overflow-y-scroll">
              <div className="flex justify-end py-2">
                <button
                  onClick={handleLogout}
                  className="bg-[#3C6997] rounded-lg text-white w-full lg:w-auto text-xl px-10 py-2 text-center font-bold cursor-pointer"
                >
                  Cerrar Sesión
                </button>
              </div>

              <Outlet />
            </main>
          </div>
        </div>
        <Toaster position={"top-right"} />
      </>
    );
}
