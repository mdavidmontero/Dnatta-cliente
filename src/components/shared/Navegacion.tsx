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
      target={link.blank ? "_blank" : "_self"}
      className={({ isActive }) =>
        `block w-full px-4 py-3 text-gray-700 transition-all duration-300 ease-in-out ${
          isActive
            ? "bg-[#EDF3FB] border-l-4 border-[#3182CE] font-semibold text-[#3182CE]"
            : "hover:bg-[#EDF3FB] hover:border-l-4 hover:border-[#CBD5E0] hover:text-[#3182CE]"
        }`
      }
      to={link.url}
    >
      {link.text}
    </NavLink>
  );
}
