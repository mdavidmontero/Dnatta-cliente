import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface Props {
  handleBillSelection: (bill: number) => void;
}

export default function CardTotal({ handleBillSelection }: Props) {
  const [value, setValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setValue(newValue);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 200);

    return () => clearTimeout(handler);
  }, [value]);

  useEffect(() => {
    const bill = Number(debouncedValue);
    handleBillSelection(bill);
  }, [debouncedValue, handleBillSelection]);

  return (
    <Card className="w-full max-w-sm p-4 mx-auto text-center">
      <h2 className="p-2 font-bold text-orange-600 text-start">Efectivo</h2>
      <Input
        className="p-5 mb-4 text-2xl font-bold text-center bg-gray-200 rounded-md sm:text-xl md:text-2xl lg:text-2xl"
        value={value}
        onChange={handleChange}
        inputMode="numeric"
        placeholder="0"
        autoFocus
      />
    </Card>
  );
}
