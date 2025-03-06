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
import ReportDayVendedora from "./views/admin/reports/day/ReportDayVendedora";
import ReportMonth from "./views/admin/reports/mes/ReportMes";
import ReportYear from "./views/admin/reports/anual/ReportYear";
import HomeCashView from "./views/admin/cash/HomeCashView";
import CashRegisterView from "./views/admin/cash/CashView";
import CashEditView from "./views/admin/cash/CashEditView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import NotFound from "./views/404/NotFound";
import ProfileLayout from "./layouts/ProfileLayout";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import Gestionlayout from "./layouts/GestionLayout";
import CategoriesView from "./views/admin/categories/CategoriesView";
import NewCategories from "./views/admin/categories/NewCategories";
import CajaLayout from "./layouts/CajaLayout";
import HomeMovementsView from "./views/admin/movements/HomeMovementsView";
import MoneyQuantityCashView from "./views/admin/cashMoney/MoneQuantityCash";
import HomeReportCash from "./views/admin/cash/reports/HomeReportCash";
import CashDetail from "./views/admin/cash/reports/CashDetail";
import NotFoundLayout from "./layouts/NotFound404";
import PostVentaView from "./views/admin/ventas/PostVentaView";
import HistoryVentasView from "./views/admin/ventas/HistoryVentasView";

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
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route element={<Gestionlayout />}>
            <Route path="/products" element={<ProductView />} />
            <Route path="/new-product" element={<NewProductForm />} />
            <Route path="/edit-product/:id" element={<NewProductForm />} />
            <Route path="/categories" element={<CategoriesView />} />
            <Route path="/new-categories" element={<NewCategories />} />
            <Route path="/edit-categories/:id" element={<NewCategories />} />
          </Route>
          {/* Ventas */}
          <Route path="/post-venta" element={<PostVentaView />} />
          <Route path="/history-venta" element={<HistoryVentasView />} />
          <Route element={<CajaLayout />}>
            <Route path="/cash-register" element={<HomeCashView />} />
            <Route path="/cash-new" element={<CashRegisterView />} />
            <Route path="/cash-edit/:id/edit" element={<CashEditView />} />
            {/* Movements */}
            <Route path="/register-movements" element={<HomeMovementsView />} />
            <Route
              path="/register-money-quantity"
              element={<MoneyQuantityCashView />}
            />
          </Route>
          {/* Reportes generales de caja */}
          <Route path="/report-caja" element={<HomeReportCash />} />
          <Route path="/cash-detail/:id" element={<CashDetail />} />
          {/* <Route path="/profile" element={<ProfileView />} /> */}
          <Route path="/points" element={<PointsViews />} />
          {/* <Route path="/points/:id" element={<ProductView />} /> */}
          <Route path="/new-point" element={<PointsView />} />
          <Route path="/edit-point/:id" element={<PointsView />} />
          <Route path="/reports" element={<ReportDay />} />
          <Route path="/report-mes" element={<ReportMonth />} />
          <Route path="/report-anual" element={<ReportYear />} />
          <Route
            path="/reports-dias/vendedora"
            element={<ReportDayVendedora />}
          />

          {/* Profile */}
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>
        <Route element={<VentasLayout />}>
          <Route path="/ventas/:slug" element={<HomeVentasScreen />} />
        </Route>

        <Route element={<NotFoundLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
