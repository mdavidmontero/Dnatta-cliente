import FotoPerfil from "./FotoPerfil";
import Navegacion from "./Navegacion";

export default function AdminSidebar() {
  const navigation = [
    { url: "/admin/orders", text: "Ordenes", blank: false },
    { url: "/products", text: "Productos", blank: false },
    { url: "/admin/reports", text: "Reporte Día", blank: false },
    { url: "/ventas/conosencillo", text: "Ver Local", blank: true },
    { url: "/profile", text: "Perfil", blank: false },
    { url: "/admin/cash", text: "Caja", blank: false },
  ];

  return (
    <>
      <FotoPerfil />
      <div className="space-y-3">
        <p className="mt-10 text-sm font-bold text-center text-gray-600 uppercase">
          Navegación
        </p>
        <nav className="flex flex-col">
          {navigation.map((nav) => (
            <Navegacion key={nav.url} link={nav} />
          ))}
        </nav>
      </div>
    </>
  );
}
