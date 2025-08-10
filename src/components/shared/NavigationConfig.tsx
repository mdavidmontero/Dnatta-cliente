import { User } from "@/types";
import {
  Package,
  History,
  ShoppingCart,
  FileText,
  BarChart3,
  Calendar,
  TrendingUp,
  ExternalLink,
  Archive,
  MapPin,
  Users,
  CreditCard,
  Shield,
  Home,
  User as iconoUser,
} from "lucide-react";

export const navigationConfig = (user: User) => [
  {
    id: "main",
    title: "Principal",
    icon: Home,
    badge: null,
    items: [
      {
        url: "/products",
        text: "Productos",
        icon: Package,
        blank: false,
        allowedRoles: ["USER", "ADMIN"],
        description: "Gestionar inventario",
      },
      {
        url: "/post-venta",
        text: "Punto de Venta",
        icon: ShoppingCart,
        blank: false,
        allowedRoles: ["USER"],
        description: "Realizar ventas",
      },
      {
        url: "/cash-register",
        text: "Caja Registradora",
        icon: CreditCard,
        blank: false,
        allowedRoles: ["USER"],
        description: "Gestionar caja",
      },
    ],
  },
  {
    id: "sales",
    title: "Ventas",
    icon: TrendingUp,
    badge: null,
    items: [
      {
        url: "/history-venta",
        text: "Historial de Ventas",
        icon: History,
        blank: false,
        allowedRoles: ["USER"],
        description: "Ver ventas realizadas",
      },
      ...(user.role === "ADMIN" || user.id === 3
        ? [
            {
              url: "/history-venta-vendedora",
              text: "Ventas por Vendedor",
              icon: Users,
              blank: false,
              allowedRoles: ["USER", "ADMIN"],
              description: "Historial por vendedor",
            },
          ]
        : []),
      {
        url: "/ventas/conosencillo",
        text: "Vista de Local",
        icon: ExternalLink,
        blank: true,
        allowedRoles: ["USER"],
        description: "Ver en nueva ventana",
      },
    ],
  },
  {
    id: "reports",
    title: "Reportes",
    icon: BarChart3,
    badge: "Nuevo",
    items: [
      {
        url: "/reports",
        text: "Reporte Diario",
        icon: FileText,
        blank: false,
        allowedRoles: ["USER"],
        description: "Resumen del día",
      },
      ...(user.role === "ADMIN" || user.id === 3
        ? [
            {
              url: "/reports-dias/vendedora",
              text: "Reporte Diario Vendedor",
              icon: Calendar,
              blank: false,
              allowedRoles: ["ADMIN", "USER"],
              description: "Reportes por vendedor",
            },
          ]
        : []),
      {
        url: "/report-mes",
        text: "Reporte Mensual",
        icon: Calendar,
        blank: false,
        allowedRoles: ["ADMIN"],
        description: "Análisis mensual",
      },
      {
        url: "/report-anual",
        text: "KPI - Reporte Anual",
        icon: TrendingUp,
        blank: false,
        allowedRoles: ["ADMIN", "USER"],
        description: "Indicadores anuales",
      },
      {
        url: "/report-caja",
        text: "Reportes de Caja",
        icon: Archive,
        blank: false,
        allowedRoles: ["ADMIN"],
        description: "Movimientos de caja",
      },
    ],
  },
  {
    id: "admin",
    title: "Administración",
    icon: Shield,
    badge: user.role === "ADMIN" ? null : "Limitado",
    items: [
      {
        url: "/profile",
        text: "Mi Perfil",
        icon: iconoUser,
        blank: false,
        allowedRoles: ["USER", "ADMIN"],
        description: "Configurar perfil",
      },
      {
        url: "/points",
        text: "Puntos de Venta",
        icon: MapPin,
        blank: false,
        allowedRoles: ["ADMIN"],
        description: "Gestionar ubicaciones",
      },
      ...(user.role === "ADMIN" || user.id === 3
        ? [
            {
              url: "/usuarios",
              text: "Gestión de Usuarios",
              icon: Users,
              blank: false,
              allowedRoles: ["ADMIN", "USER"],
              description: "Administrar usuarios",
            },
          ]
        : []),
    ],
  },
];
