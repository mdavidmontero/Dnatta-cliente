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
        className={`${
          category.slug === params.slug ? "bg-[#BBCFC3]" : ""
        } flex items-center gap-4 w-full border-t border-gray-300 p-3 last-of-type:border-b`}
      >
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-10 lg:h-10 xl:w-16 xl:h-16">
          <img
            src={`/categories/icon_${category.slug}.png`}
            alt="Imagen Categoria"
            className="object-cover w-full h-full"
          />
        </div>

        <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl">
          {category.name}
        </span>
      </div>
    </Link>
  );
}
