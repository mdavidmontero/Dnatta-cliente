import { Link, useParams } from "react-router-dom";
import { Categories } from "../../types";

type CategoryIconProps = {
  category: Categories;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams();

  return (
    <Link
      to={`/ventas/${category.slug}`}
      className="block text-gray-700 transition-colors duration-300 hover:bg-[#EDF3FB]"
    >
      <div
        className={`flex items-center gap-4 p-4 ${
          category.slug === params.slug
            ? "bg-[#EDF3FB] border-l-4 border-[#3182CE]"
            : "border-l-4 border-transparent"
        }`}
      >
        <div className="w-12 h-12">
          <img
            src={`/categories/icon_${category.slug}.png`}
            alt={`Icono de ${category.name}`}
            className="object-cover w-full h-full"
          />
        </div>

        <span className="text-sm font-medium sm:text-base">
          {category.name}
        </span>
      </div>
    </Link>
  );
}
