import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import AppLayout from "./layouts/AppLayout";
import HomeView from "./views/home/HomeView";
import ProductView from "./views/admin/products/ProductView";
import NewProductForm from "./views/admin/products/NewProductForm";
import VentasLayout from "./layouts/VentasLayout";
import HomeVentasScreen from "./views/admin/ventas/HomeVentasScreen";
import ProfileView from "./views/profile/ProfileView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/products" element={<ProductView />} />
          <Route path="/new-product" element={<NewProductForm />} />
          <Route path="/edit-product/:id" element={<NewProductForm />} />
          <Route path="/profile" element={<ProfileView />} />
        </Route>
        <Route element={<VentasLayout />}>
          <Route path="/ventas/:slug" element={<HomeVentasScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
