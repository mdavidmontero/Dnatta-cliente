import HomeNavigation from "./nav/HomeNavigation";
import { LogoHome } from "./Logo";

export default function Header() {
  return (
    <header className="py-4 shadow-md bg-btn-secondary">
      <div className="container flex flex-col items-center px-4 mx-auto space-y-4 md:flex-row md:justify-between md:space-y-0">
        {/* Logo */}
        <div className="flex justify-center w-full md:w-auto">
          <LogoHome />
        </div>

        {/* Navegación */}
        <nav className="w-full md:w-auto">
          <HomeNavigation />
        </nav>
      </div>
    </header>
  );
}
