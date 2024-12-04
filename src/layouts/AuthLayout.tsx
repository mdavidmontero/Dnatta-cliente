import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/Logo";
import { useAuth } from "../hook/useAuth";
export default function AuthLayout() {
  const { data, isLoading } = useAuth();
  if (isLoading) return "Cargando...";
  if (data) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="flex flex-row min-h-screen bg-slate-800">
        <div className="max-w-lg px-5 pt-10 mx-auto">
          <Logo />
          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster position={"top-right"} />
    </>
  );
}
