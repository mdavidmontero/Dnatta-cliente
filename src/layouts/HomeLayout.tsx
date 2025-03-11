import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="bg-bg-primary-bg">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
