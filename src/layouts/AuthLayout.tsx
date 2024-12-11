import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { LogoAuthentication } from "../components/Logo";
import { useAuth } from "../hook/useAuth";

export default function AuthLayout() {
  const { data, isLoading } = useAuth();
  if (isLoading) return "Cargando...";
  if (data) {
    return <Navigate to="/products" />;
  }
  return (
    <>
      <div className="flex flex-row min-h-screen bg-btn-secondary">
        <div className="flex flex-col items-center justify-center w-full max-w-md px-5 pt-10 mx-auto">
          <LogoAuthentication />
          <div className="w-full pb-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster position={"top-right"} />
    </>
  );
}
