import { userAuthStore } from "../../store/useAuthStore";
import FotoPerfil from "./FotoPerfil";
import Navegacion from "./Navegacion";

export default function AdminSidebar() {
  const navigation = [
    { url: "/admin/orders", text: "Ordenes", blank: false, admin: false },
    { url: "/products", text: "Productos", blank: false, admin: false },
    { url: "/reports", text: "Reporte Diario", blank: false, admin: false },
    {
      url: "/reports-dias/vendedora",
      text: "Reporte Diario vendedora",
      blank: false,
      admin: false,
    },
    {
      url: "/report-mes",
      text: "Reporte Mes",
      blank: false,
      admin: true,
    },
    {
      url: "/ventas/conosencillo",
      text: "Ver Local",
      blank: true,
      admin: false,
    },
    {
      url: "/report-caja",
      text: "Reportes Caja",
      blank: false,
      admin: false,
    },
    { url: "/profile", text: "Perfil", blank: false, admin: false },
    { url: "/points", text: "Puntos", blank: false, admin: true },
    { url: "/cash-register", text: "Caja", blank: false, admin: false },
  ];

  const user = userAuthStore((state) => state.user);

  const filteredNavigation = navigation.filter((nav) => {
    if (user?.role === "ADMIN") return true;
    if (user?.role === "USER") return !nav.admin;
    return false;
  });

  return (
    <>
      <FotoPerfil />
      <p className="mt-5 font-bold text-center">{user?.name}</p>
      <div className="space-y-3">
        <p className="mt-10 text-sm font-bold text-center text-gray-600 uppercase">
          Navegación
        </p>
        <nav className="flex flex-col">
          {filteredNavigation.map((nav) => (
            <Navegacion key={nav.url} link={nav} />
          ))}
        </nav>
      </div>
    </>
  );
}
