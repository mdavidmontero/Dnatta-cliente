import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../actions/categories.actions";
import CategoryIcon from "../ui/CategoryIcon";
import FotoPerfil from "../shared/FotoPerfil";
import { userAuthStore } from "../../store/useAuthStore";

type Props = {
  onItemSelected?: () => void;
};

export default function OrderSidebar({ onItemSelected }: Props) {
  const user = userAuthStore((state) => state.user);
  const { data } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (!data) return null;

  return (
    <aside
      className="
        flex flex-col flex-shrink-0
        h-[100dvh] w-64
        bg-sidebar border-r border-sidebar-border shadow-sm
      "
    >
      {/* Header compacto */}
      <div className="flex flex-col items-center p-4 border-b bg-sidebar/95 border-sidebar-border/50">
        <FotoPerfil />
        <h2 className="mt-3 text-sm font-semibold tracking-wide text-sidebar-foreground truncate max-w-[10rem]">
          {user?.name}
        </h2>
        <div className="w-10 h-0.5 mt-2 bg-sidebar-primary rounded-full" />
      </div>

      {/* Lista con scroll */}
      <nav className="flex-1 py-3 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border/50 scrollbar-track-transparent hover:scrollbar-thumb-sidebar-border">
        <div className="px-4 mb-2">
          <h3 className="text-[11px] font-semibold tracking-wider uppercase text-sidebar-foreground/60">
            Categorías
          </h3>
        </div>

        <ul className="px-2 space-y-1">
          {data.map((category) => (
            <li key={category.id}>
              {/* Basta con envolver para capturar el click y cerrar en móvil */}
              <div onClick={onItemSelected}>
                <CategoryIcon category={category} />
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer compacto */}
      <div className="p-3 border-t border-sidebar-border/50 bg-sidebar/60">
        <p className="text-[11px] text-center text-sidebar-foreground/60">
          Sistema POS v2.0
        </p>
      </div>
    </aside>
  );
}
