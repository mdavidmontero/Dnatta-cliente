import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="text-4xl font-black text-center text-white">
        Página No Encontrada
      </h1>
      <p className="mt-10 text-center text-white">
        Tal vez quieras volver a{" "}
        <Link className=" text-bg-primary" to={"/products"}>
          Ventas
        </Link>
      </p>
    </>
  );
}
