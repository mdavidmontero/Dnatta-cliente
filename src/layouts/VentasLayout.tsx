import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import OrderSidebar from "../components/ventas/OrderSidebar";
import OrderSummary from "../components/ventas/OrderSummary";
import { useAuth } from "../hook/useAuth";

export default function VentasLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/" />;
  }
  if (data)
    return (
      <>
        <div className="md:flex ">
          <OrderSidebar />
          <main className="p-5 md:flex-1 md:h-screen border-r border-gray-300 md:overflow-y-scroll scrollbar-thin scrollbar-thumb-[#CBD5E0] scrollbar-track-[#EDF3FB]">
            <Outlet />
          </main>
          <OrderSummary />
        </div>
        <Toaster position={"top-right"} />
      </>
    );
}
