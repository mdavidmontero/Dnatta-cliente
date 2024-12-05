import { useNavigate } from "react-router-dom";
export default function GoBackButton() {
  const navigation = useNavigate();
  return (
    <button
      onClick={() => navigation(-1)}
      className="bg-[#3C6997] text-white w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
    >
      Volver
    </button>
  );
}
