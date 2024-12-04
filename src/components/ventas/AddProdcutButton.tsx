import { useStore } from "../../store/store";
import { ProductI } from "../../types";
type AddProductButtonProps = {
  product: ProductI;
};
export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder);
  return (
    <button
      type="button"
      className="bg-[#3C6997] hover:bg-[#284868] text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer transition-colors"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </button>
  );
}
