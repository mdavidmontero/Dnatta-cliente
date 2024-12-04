import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../actions/categories.actions";
import CategoryIcon from "../ui/CategoryIcon";
import FotoPerfil from "../shared/FotoPerfil";

export default function OrderSidebar() {
  const { data } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
    refetchOnWindowFocus: false,
  });
  if (data)
    return (
      <aside className="flex flex-col overflow-hidden bg-white md:w-72 md:h-screen">
        <div className="relative flex flex-col items-center flex-none">
          <FotoPerfil />
          {/* <span className="mt-5 font-bold text-center">{session?.user.name}</span> */}
        </div>
        <nav className="flex-1 mt-5 overflow-y-auto">
          {data.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </nav>
        {/* <Logout /> */}
      </aside>
    );
}
