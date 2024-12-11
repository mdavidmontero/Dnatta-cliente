import HomeNavigation from "./nav/HomeNavigation";
import { LogoHome } from "./Logo";

export default function Header() {
  return (
    <header className="py-4  lg:py-0 bg-btn-secondary">
      <div className="flex flex-col items-center px-4 mx-auto space-y-4 max-w-7xl md:flex-row md:justify-between md:space-y-0">
        <div className="flex justify-center w-full md:w-1/4">
          <LogoHome />
        </div>
        <nav className="flex items-center justify-center w-full md:w-3/4 md:justify-end">
          <HomeNavigation />
        </nav>
      </div>
    </header>
  );
}
