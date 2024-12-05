import { Link } from "react-router-dom";

export default function HomeNavigation() {
  return (
    <div className="flex justify-center w-full gap-4 md:justify-end">
      <Link
        className="px-4 py-2 text-xs font-black text-white uppercase cursor-pointer hover:bg-[#D4774B] rounded"
        to={"/auth/login"}
      >
        Iniciar Sesión
      </Link>
      <Link
        className="px-4 py-2 text-xs font-black uppercase rounded-lg cursor-pointer bg-[#3e709f] text-white hover:bg-[#345f7f]"
        to={"/auth/register"}
      >
        Registrarme
      </Link>
    </div>
  );
}
