import { Link } from "react-router-dom";
interface Props {
  label: string;
  toUrl: string;
}
export default function ButtonNavigate({ label, toUrl }: Props) {
  return (
    <Link
      to={toUrl}
      className="w-full px-6 py-3 text-xl font-bold text-center text-white transition-all duration-300 bg-indigo-600 rounded-md hover:bg-indigo-700 lg:w-auto"
    >
      {label}
    </Link>
  );
}
