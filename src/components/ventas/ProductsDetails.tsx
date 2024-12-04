import { useMemo } from "react";
import { useStore } from "../../store/store";
import { OrderItem } from "../../types";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "../../utils";
type ProductDetailsProps = {
  item: OrderItem;
};
const MIN_ITEMS = 1;
const MAX_ITEMS = 10;
export default function ProductsDetails({ item }: ProductDetailsProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeItem = useStore((state) => state.removeItem);
  const disabledDecreaseButton = useMemo(
    () => item.quantity === MIN_ITEMS,
    [item]
  );
  const disabledIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item]
  );
  return (
    <div className="p-4 space-y-1 bg-white border-t border-gray-200 shadow ">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="w-8 h-8 text-red-600" />
          </button>
        </div>
        <p className="text-2xl font-black text-amber-500">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 rounded-lg w-fit">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={disabledDecreaseButton}
            className="disabled:opacity-50"
          >
            <MinusIcon className="w-6 h-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={disabledIncreaseButton}
            className="disabled:opacity-50"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
