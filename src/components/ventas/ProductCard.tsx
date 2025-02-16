import { ProductI } from "../../types";
import { formatCurrency, getImagePath } from "../../utils";
import AddProductButton from "./AddProdcutButton";
type ProductCardProps = {
  product: ProductI;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);
  return (
    <div className="overflow-hidden bg-white border">
      <img
        width={400}
        height={400}
        src={imagePath}
        className="object-cover transition-all duration-200 ease-in-out hover:scale-110 "
        alt={`Imagen platillo ${product.name}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-bold text-4xl  text-[#FE9000]">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton product={product} />
      </div>
    </div>
  );
}
