import { useNavigate } from "react-router-dom";
import { Button } from "./button";
export default function GoBackButton() {
  const navigation = useNavigate();
  return (
    <Button
      onClick={() => navigation(-1)}
      className="w-full px-10 py-2 mt-2 text-xl font-bold text-center text-white cursor-pointer bg-bg-violeta hover:bg-bg-violeta-hover lg:w-auto"
    >
      Volver
    </Button>
  );
}
