import { ProductI } from "../../types";
import { formatCurrency, getImagePath } from "../../utils";
import AddProductButton from "./AddProdcutButton";

type ProductCardProps = {
  product: ProductI;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="overflow-hidden bg-white border rounded">
      <img
        src={imagePath}
        className="object-cover w-full transition-transform duration-200 hover:scale-110"
        alt={`Imagen platillo ${product.name}`}
      />

      <div className="p-4">
        <h3 className="text-lg font-bold sm:text-xl md:text-xl xl:text-2xl">
          {product.name}
        </h3>
        <p className="mt-3 text-xl sm:text-2xl md:text-2xl xl:text-3xl font-bold text-[#FE9000]">
          {formatCurrency(product.price)}
        </p>

        <div className="mt-4">
          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
}
