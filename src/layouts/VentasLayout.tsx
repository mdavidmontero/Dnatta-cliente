import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import OrderSidebar from "../components/ventas/OrderSidebar";
import OrderSummary from "../components/ventas/OrderSummary";
import { useAuth } from "../hook/useAuth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, X } from "lucide-react";

export default function VentasLayout() {
  const { data, isError, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/" />;

  if (data)
    return (
      <>
        <div className="flex h-screen overflow-hidden bg-background">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <div
            className={`
              fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              lg:relative lg:z-auto lg:translate-x-0
            `}
          >
            <OrderSidebar onItemSelected={() => setIsSidebarOpen(false)} />
          </div>

          <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b bg-card lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2"
              >
                <Menu className="w-5 h-5" />
                <span>Menú</span>
              </Button>

              <h1 className="font-serif text-lg font-semibold">DNATA</h1>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="lg:hidden"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="sr-only">Abrir pedido</span>
              </Button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-muted/50 scrollbar-track-transparent hover:scrollbar-thumb-muted">
              <Outlet />
            </div>
          </main>

          {isCartOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsCartOpen(false)}
            />
          )}

          <div
            className={`
              fixed right-0 top-0 z-50 transform transition-transform duration-300 ease-in-out
              ${isCartOpen ? "translate-x-0" : "translate-x-full"}
              lg:relative lg:z-auto lg:translate-x-0
            `}
          >
            {/* Botón cerrar solo cuando es drawer */}
            <div className="absolute z-10 top-4 left-4 lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <OrderSummary />
          </div>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </>
    );
}
