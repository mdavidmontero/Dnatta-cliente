import { Outlet } from "react-router-dom";
import Tabs from "../components/products/Tabs";

export default function Gestionlayout() {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
}
