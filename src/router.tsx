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
import ConfirmAccountView from "./views/auth/ConfirmAccount";
import PointsViews from "./views/admin/point/PointsView";
import PointsView from "./views/admin/point/PointView";
import ReportDay from "./views/admin/reports/ReportDay";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/products" element={<ProductView />} />
          <Route path="/new-product" element={<NewProductForm />} />
          <Route path="/edit-product/:id" element={<NewProductForm />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/points" element={<PointsViews />} />
          <Route path="/points/:id" element={<ProductView />} />
          <Route path="/new-point" element={<PointsView />} />
          <Route path="/edit-point/:id" element={<PointsView />} />
          <Route path="/reports" element={<ReportDay />} />
        </Route>
        <Route element={<VentasLayout />}>
          <Route path="/ventas/:slug" element={<HomeVentasScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
