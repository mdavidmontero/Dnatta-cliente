import { Link, NavLink } from "react-router-dom";

export default function HomeNavigation() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-4 py-2 text-sm font-bold uppercase transition-all rounded-lg  text-orange-600 "
            : "px-4 py-2 text-sm font-bold uppercase transition-all rounded-lg text-slate-700 hover:bg-white/10 focus:bg-white/10"
        }
        to="/"
      >
        Inicio
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-4 py-2 text-sm font-bold uppercase transition-all rounded-lg  text-orange-600 "
            : "px-4 py-2 text-sm font-bold uppercase transition-all rounded-lg text-slate-700 hover:bg-white/10 focus:bg-white/10"
        }
        to="/nosotros"
      >
        Nosotros
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-4 py-2 text-sm font-bold uppercase transition-all rounded-lg  text-orange-600 "
            : "px-4 py-2 text-sm font-bold uppercase transition-all rounded-lg text-slate-700 hover:bg-white/10 focus:bg-white/10"
        }
        to="/productos"
      >
        Productos
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-4 py-2 text-sm font-bold uppercase transition-all rounded-lg  text-orange-600 "
            : "px-4 py-2 text-sm font-bold uppercase transition-all rounded-lg text-slate-700 hover:bg-white/10 focus:bg-white/10"
        }
        to="/contacto"
      >
        Contacto
      </NavLink>

      <Link
        className="px-5 py-2 text-sm font-bold text-white uppercase transition-all rounded-full bg-bg-violeta hover:bg-bg-violeta-hover focus:bg-bg-violeta-hover"
        to="/auth/login"
      >
        Iniciar Sesión
      </Link>
      <Link
        className="px-5 py-2 text-sm font-bold text-white uppercase transition-all rounded-full bg-[#3e709f] hover:bg-[#345f7f] focus:bg-[#345f7f]"
        to="/auth/register"
      >
        Registrarme
      </Link>
    </div>
  );
}
