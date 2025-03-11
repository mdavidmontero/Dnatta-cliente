import { userAuthStore } from "../../store/useAuthStore";
import FotoPerfil from "./FotoPerfil";
import Navegacion from "./Navegacion";

export default function AdminSidebar() {
  const user = userAuthStore((state) => state.user);

  if (!user) {
    return (
      <aside className="flex flex-col bg-white md:w-72 md:h-screen">
        <div className="p-5 text-center">Cargando...</div>
      </aside>
    );
  }

  const navigation = [
    {
      url: "/products",
      text: "Productos",
      blank: false,
      allowedRoles: ["USER", "ADMIN"],
    },

    ...(user.role === "ADMIN" || user.id === 3
      ? [
          {
            url: "/history-venta-vendedora",
            text: "Historial Ventas Vendedora",
            blank: false,
            allowedRoles: ["USER", "ADMIN"],
          },
        ]
      : []),
    {
      url: "/history-venta",
      text: "Detalle Venta",
      blank: false,
      allowedRoles: ["USER"],
    },
    {
      url: "/post-venta",
      text: "Ventas",
      blank: false,
      allowedRoles: ["USER"],
    },
    {
      url: "/reports",
      text: "Reporte Diario",
      blank: false,
      allowedRoles: ["USER"],
    },
    ...(user.role === "ADMIN" || user.id === 3
      ? [
          {
            url: "/reports-dias/vendedora",
            text: "Reporte Diario vendedora",
            blank: false,
            allowedRoles: ["ADMIN", "USER"],
          },
        ]
      : []),
    {
      url: "/report-mes",
      text: "Reporte Mes",
      blank: false,
      allowedRoles: ["ADMIN"],
    },
    {
      url: "/report-anual",
      text: "Reporte Anual",
      blank: false,
      allowedRoles: ["ADMIN"],
    },
    {
      url: "/ventas/conosencillo",
      text: "Ver Local",
      blank: true,
      allowedRoles: ["USER"],
    },
    {
      url: "/report-caja",
      text: "Reportes Caja",
      blank: false,
      allowedRoles: ["ADMIN"],
    },
    {
      url: "/profile",
      text: "Perfil",
      blank: false,
      allowedRoles: ["USER", "ADMIN"],
    },
    { url: "/points", text: "Puntos", blank: false, allowedRoles: ["ADMIN"] },
    ...(user.role === "ADMIN" || user.id === 3
      ? [
          {
            url: "/usuarios",
            text: "Usuarios",
            blank: false,
            allowedRoles: ["ADMIN", "USER"],
          },
        ]
      : []),

    {
      url: "/cash-register",
      text: "Caja",
      blank: false,
      allowedRoles: ["USER"],
    },
  ];

  const filteredNavigation = navigation.filter((nav) =>
    nav.allowedRoles.includes(user.role)
  );

  return (
    <aside className="flex flex-col bg-white md:w-72 md:h-screen">
      <div className="flex flex-col items-center flex-none p-5">
        <FotoPerfil />
        <p className="mt-5 font-bold text-center">{user.name}</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        <p className="mt-5 text-sm font-bold text-center text-gray-600 uppercase">
          Navegación
        </p>
        <nav className="flex flex-col">
          {filteredNavigation.map((nav) => (
            <Navegacion key={nav.url} link={nav} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
