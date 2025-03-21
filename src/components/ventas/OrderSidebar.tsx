import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../actions/categories.actions";
import CategoryIcon from "../ui/CategoryIcon";
import FotoPerfil from "../shared/FotoPerfil";
import { userAuthStore } from "../../store/useAuthStore";

export default function OrderSidebar() {
  const user = userAuthStore((state) => state.user);
  const { data } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
    refetchOnWindowFocus: false,
  });

  if (data)
    return (
      <aside className="flex flex-col h-screen bg-white border-r border-[#CBD5E0] shadow-sm md:w-72">
        {/* Foto de perfil y nombre */}
        <div className="flex flex-col items-center p-6">
          <FotoPerfil />
          <p className="mt-4 text-lg font-bold text-gray-800">{user?.name}</p>
        </div>

        {/* Lista de categorías */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#CBD5E0] scrollbar-track-[#EDF3FB]">
          {data.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </nav>
      </aside>
    );
}
