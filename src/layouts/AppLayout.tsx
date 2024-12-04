import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../components/shared/AdminSidebar";
import { Toaster } from "sonner";
import { useAuth } from "../hook/useAuth";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/auth/login" />;
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
              <Outlet />
            </main>
          </div>
        </div>
        <Toaster position={"top-right"} />
      </>
    );
}
