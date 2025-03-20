import { NewspaperIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { name: "Gestión de Caja", href: "/cash-register", icon: NewspaperIcon },
  {
    name: "Registro Movimientos",
    href: "/register-movements",
    icon: NewspaperIcon,
  },
  {
    name: "Registrar Dinero en Caja",
    href: "/register-money-quantity",
    icon: CurrencyDollarIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab =
    tabs.find((tab) => tab.href === location.pathname)?.href || tabs[0].href;

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full border-gray-300 rounded-md focus:border-bg-primary focus:text-bg-primary"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            navigate(e.target.value)
          }
          value={currentTab}
        >
          {tabs.map((tab) => {
            return (
              <option value={tab.href} key={tab.name}>
                {tab.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  location.pathname === tab.href
                    ? "border-bg-primary text-bg-primary"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                )}
              >
                <tab.icon
                  className={classNames(
                    location.pathname === tab.href
                      ? "text-bg-primary"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
