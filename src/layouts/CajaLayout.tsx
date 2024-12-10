import { Outlet } from "react-router-dom";
import Tabs from "../components/cash/Tabs";

export default function CajaLayout() {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
}
