import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img
        src="/nata.png"
        alt="logotipo"
        className="object-contain rounded w-52 h-w-52"
      />
    </Link>
  );
}

export const LogoAuthentication = () => {
  return (
    <Link to={"/"}>
      <div className="relative w-64 mx-auto h-36 sm:w-64 sm:h-48 md:w-96 md:h-56">
        <img
          src="/logotipohome.png"
          className="object-cover w-full h-full rounded-full"
          alt="logotipo"
        />
      </div>
    </Link>
  );
};

export const LogoHome = () => {
  return (
    <Link to={"/"}>
      <div className="relative w-56 sm:h-32 sm:w-52 ">
        <img
          src="/nata.png"
          className="object-cover w-full h-full transition-shadow duration-300 rounded-full "
          alt="logotipo"
        />
      </div>
    </Link>
  );
};
