import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img src="/nata.jpg" className="w-full rounded-xl " alt="logotipo" />
    </Link>
  );
}
