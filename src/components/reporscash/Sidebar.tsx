import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cashReportSchemaI } from "@/types/schemas/cash";
import MovementViewDay from "../movements/MovementViewDay";
import DetailReportCashOneDay from "./DetailReportCashOneDay";

interface PropsSidebar {
  data: cashReportSchemaI[];
}

export function SidebarAdminCash({ data }: PropsSidebar) {
  const totalTrasferencias = data.map((item) => {
    const totalTransferenciasUsuario = item.point?.sales?.reduce(
      (acc, sale) => {
        if (sale?.paymentType === "transferencia") {
          return acc + (sale?.totalAmount || 0);
        }
        return acc;
      },
      0
    );

    const totalEfectivoUsuario = item.point?.sales?.reduce((acc, sale) => {
      if (sale?.paymentType === "efectivo") {
        return acc + (sale?.totalAmount || 0);
      }
      return acc;
    }, 0);

    const transferPlatformTotals: Record<string, number> = {};

    item.point?.sales?.forEach((sale) => {
      if (sale?.paymentType === "transferencia" && sale?.transferPlatform) {
        const platform = sale.transferPlatform;
        if (!transferPlatformTotals[platform]) {
          transferPlatformTotals[platform] = 0;
        }
        transferPlatformTotals[platform] += sale.totalAmount || 0;
      }
    });

    return {
      totalTransferenciasUsuario,
      totalEfectivoUsuario,
      transferPlatformTotals,
    };
  });

  return (
    <>
      <SidebarProvider>
        <SidebarInset>
          <header className="flex items-center gap-2 px-6 py-4 border-b shadow-md bg-gray-50">
            <SidebarTrigger className="text-lg font-bold text-gray-900" />
            <Separator orientation="vertical" className="h-6 mr-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Reporte de Caja</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="flex flex-col gap-8 p-8 bg-gray-100">
            <div className="grid gap-8 lg:grid-cols-2">
              {data.map((item, index) => (
                <DetailReportCashOneDay
                  key={item.id}
                  item={item}
                  totalTrasferencias={totalTrasferencias}
                  index={index}
                />
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <MovementViewDay />
    </>
  );
}
