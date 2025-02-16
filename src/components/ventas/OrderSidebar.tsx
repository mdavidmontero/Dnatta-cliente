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
      <aside className="flex flex-col h-screen overflow-hidden bg-white md:w-72">
        <div className="relative items-center flex-none lg:flex-col lg:flex ">
          <FotoPerfil />
        </div>
        <p className="mt-5 font-bold text-center">{user?.name}</p>
        <nav className="flex-1 mt-5 overflow-y-auto">
          {data.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </nav>
      </aside>
    );
}
