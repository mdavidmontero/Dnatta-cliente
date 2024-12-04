import { NavLink } from "react-router-dom";

interface Props {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
}
export default function Navegacion({ link }: Props) {
  return (
    <NavLink
      className={({ isActive }) =>
        `font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b ${
          isActive ? "bg-[#BBCFC3]" : ""
        }`
      }
      to={link.url}
    >
      {link.text}
    </NavLink>
  );
}
