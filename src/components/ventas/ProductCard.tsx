import { ProductI } from "../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatCurrency, getImagePath } from "../../utils";
import { Card } from "../ui/card";
import AddProductButton from "./AddProdcutButton";

type ProductCardProps = { product: ProductI };

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <Card className="flex flex-col h-full transition border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      {/* Imagen pegada arriba */}
      <div className="w-full aspect-[3/4] bg-white flex items-center justify-center overflow-hidden rounded-t-lg">
        <LazyLoadImage
          src={imagePath}
          alt={`Imagen platillo ${product.name}`}
          effect="blur"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="image-overlay" />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-3">
        <h3 className="mb-1 text-base font-semibold leading-tight md:text-lg line-clamp-2">
          {product.name}
        </h3>
        <p className="text-lg md:text-xl font-bold text-[#FE9000] mb-3">
          {formatCurrency(product.price)}
        </p>

        {/* Botón abajo */}
        <div className="mt-auto">
          <AddProductButton product={product} />
        </div>
      </div>
    </Card>
  );
}
