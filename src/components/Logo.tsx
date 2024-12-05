import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img src="/nata.jpg" className="w-full rounded-xl " alt="logotipo" />
    </Link>
  );
}

export const LogoHome = () => {
  return (
    <Link to={"/"}>
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <img
          src="/nata.jpg"
          className="object-cover w-full h-full transition-shadow duration-300 rounded-full hover:shadow-lg"
          alt="logotipo"
        />
      </div>
    </Link>
  );
};
