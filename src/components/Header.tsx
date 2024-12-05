import HomeNavigation from "./nav/HomeNavigation";
import { LogoHome } from "./Logo";

export default function Header() {
  return (
    <header className="py-4 bg-slate-800">
      <div className="flex flex-col items-center px-6 mx-auto max-w-7xl md:flex-row md:justify-between">
        <div className="w-full p-5 lg:p-0 md:w-1/4">
          <LogoHome />
        </div>
        <nav className="flex items-center justify-center w-full gap-4 md:w-1/2 md:justify-end">
          <HomeNavigation />
        </nav>
      </div>
    </header>
  );
}
