import LottieAnimation from "@/components/ui/LottieAnimation";
import animationData from "../../assets/NotFound.json";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="text-4xl font-black text-center text-gray-800">
        Página No Encontrada
      </h1>

      <LottieAnimation animationData={animationData} width={400} height={300} />

      <p className="mt-10 font-semibold text-center text-gray-600">
        Tal vez quieras volver a{" "}
        <Link className=" text-bg-primary" to={"/products"}>
          Ventas
        </Link>
      </p>
    </>
  );
}
