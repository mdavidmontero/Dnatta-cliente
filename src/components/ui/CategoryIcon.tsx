import { Link, useParams } from "react-router-dom";
import { Categories } from "../../types";

type CategoryIconProps = {
  category: Categories;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams();
  return (
    <Link to={`/ventas/${category.slug}`} className="text-xl font-bold">
      <div
        className={` ${
          category.slug === params.category ? "bg-[#BBCFC3]" : ""
        } flex items-center gap-4 w-full border-t border-gray-300 p-3 last-of-type:border-b  `}
      >
        <div className="relative w-16 h-16">
          <img
            src={`/categories/icon_${category.slug}.png`}
            alt="Imagen Categoria"
          />
        </div>

        {category.name}
      </div>
    </Link>
  );
}
