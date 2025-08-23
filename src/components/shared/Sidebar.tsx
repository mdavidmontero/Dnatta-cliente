import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Package,
  History,
  ShoppingCart,
  FileText,
  Calendar,
  TrendingUp,
  ExternalLink,
  CreditCard,
  User as UserIcon,
  Award,
  Users,
  Calculator,
  BarChart3,
  Store,
} from "lucide-react";
import { userAuthStore } from "@/store/useAuthStore";

type Role = "USER" | "ADMIN";

type NavItem = {
  url: string;
  text: string;
  blank?: boolean;
  allowedRoles: Role[];
  icon: React.ComponentType<{ className?: string }>;
  category?:
    | "inventory"
    | "sales"
    | "reports"
    | "operations"
    | "account"
    | "admin"
    | "external"
    | "other";
};

const NAV: NavItem[] = [
  {
    url: "/products",
    text: "Productos",
    allowedRoles: ["USER", "ADMIN"],
    icon: Package,
    category: "inventory",
  },
  {
    url: "/history-venta-vendedora",
    text: "Historial Ventas Vendedora",
    allowedRoles: ["ADMIN"],
    icon: History,
    category: "sales",
  },
  {
    url: "/history-venta",
    text: "Detalle Venta",
    allowedRoles: ["USER"],
    icon: FileText,
    category: "sales",
  },
  {
    url: "/post-venta",
    text: "Ventas",
    allowedRoles: ["USER"],
    icon: ShoppingCart,
    category: "sales",
  },
  {
    url: "/reports",
    text: "Reporte Diario",
    allowedRoles: ["USER"],
    icon: Calendar,
    category: "reports",
  },
  {
    url: "/reports-dias/vendedora",
    text: "Reporte Diario Vendedora",
    allowedRoles: ["ADMIN"],
    icon: BarChart3,
    category: "reports",
  },
  {
    url: "/report-mes",
    text: "Reporte Mes",
    allowedRoles: ["ADMIN"],
    icon: TrendingUp,
    category: "reports",
  },
  {
    url: "/report-anual",
    text: "KPI - Reporte Anual",
    allowedRoles: ["ADMIN"],
    icon: TrendingUp,
    category: "reports",
  },
  {
    url: "/ventas/conosencillo",
    text: "Ver Local",
    allowedRoles: ["USER"],
    icon: Store,
    category: "external",
    blank: true,
  },
  {
    url: "/report-caja",
    text: "Reportes Caja",
    allowedRoles: ["ADMIN"],
    icon: CreditCard,
    category: "reports",
  },
  {
    url: "/profile",
    text: "Perfil",
    allowedRoles: ["USER", "ADMIN"],
    icon: UserIcon,
    category: "account",
  },
  {
    url: "/points",
    text: "Puntos",
    allowedRoles: ["ADMIN"],
    icon: Award,
    category: "account",
  },
  {
    url: "/usuarios",
    text: "Usuarios",
    allowedRoles: ["ADMIN"],
    icon: Users,
    category: "admin",
  },
  {
    url: "/cash-register",
    text: "Caja",
    allowedRoles: ["USER"],
    icon: Calculator,
    category: "operations",
  },
];

/** <-- Aquí defines exactamente qué rutas extra (de ADMIN) ves con id=3 */
const SPECIAL_ALLOW: Record<number, string[]> = {
  3: ["/history-venta-vendedora", "/reports-dias/vendedora", "/usuarios"],
};

const CATEGORY_LABELS = {
  inventory: "Inventario",
  sales: "Ventas",
  reports: "Reportes",
  operations: "Operaciones",
  account: "Cuenta",
  admin: "Administración",
  external: "Enlaces",
  other: "Otros",
} as const;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export default function AdminSidebarShared(
  props: React.ComponentProps<typeof Sidebar>
) {
  const location = useLocation();
  const user = userAuthStore((s) => s.user);

  if (!user) {
    return (
      <Sidebar {...props}>
        <SidebarContent className="bg-sidebar">
          <div className="flex items-center justify-center h-20">
            <div className="animate-pulse text-sidebar-foreground">
              Cargando...
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  const extraAllowed = SPECIAL_ALLOW[user.id] ?? [];

  const filtered = NAV.filter((item) => {
    const isAdminOnly =
      item.allowedRoles.includes("ADMIN") &&
      !item.allowedRoles.includes("USER");
    if (isAdminOnly && user.role !== "ADMIN") {
      return extraAllowed.includes(item.url);
    }

    return item.allowedRoles.includes(user.role as Role);
  });

  const grouped = filtered.reduce<Record<string, NavItem[]>>((acc, it) => {
    const cat = it.category ?? "other";
    (acc[cat] ||= []).push(it);
    return acc;
  }, {});

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <Sidebar
      collapsible="icon"
      className="z-50 bg-sidebar data-[state=open]:bg-sidebar"
      {...props}
    >
      <SidebarHeader className="bg-sidebar">
        <div className="flex items-center gap-3 p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback className="text-xs font-semibold bg-sidebar-primary text-sidebar-primary-foreground">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-semibold truncate">{user.name}</span>
            <Badge
              variant={user.role === "ADMIN" ? "default" : "secondary"}
              className="mt-1 text-xs w-fit"
            >
              {user.role === "ADMIN" ? "Administrador" : "Vendedora"}
            </Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator className="bg-sidebar-border/60" />

      <SidebarContent className="bg-sidebar">
        {Object.entries(grouped).map(([cat, items]) => (
          <SidebarGroup key={cat} className="px-2">
            <SidebarGroupLabel className="text-[11px] uppercase tracking-wide text-muted-foreground/80">
              {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] ?? cat}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((nav) => {
                  const Icon = nav.icon;
                  const active = isActive(nav.url);
                  return (
                    <SidebarMenuItem key={nav.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={nav.text}
                        className="h-10 rounded-xl data-[active=true]:bg-primary/10 data-[active=true]:text-primary hover:bg-muted transition-colors"
                      >
                        {nav.blank ? (
                          <a
                            href={nav.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            <span className="truncate">{nav.text}</span>
                            <ExternalLink className="w-4 h-4 ml-auto opacity-70" />
                          </a>
                        ) : (
                          <Link to={nav.url}>
                            <Icon className="w-4 h-4 mr-2" />
                            <span className="truncate">{nav.text}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
