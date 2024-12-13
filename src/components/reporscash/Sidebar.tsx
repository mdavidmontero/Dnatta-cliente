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
  const totals = data.map((item) => {
    let totalEfectivo = 0;
    let totalTransferencia = 0;
    const transferPlatformTotals: Record<string, number> = {};

    item.point?.sales?.forEach((sale) => {
      sale?.payments?.forEach((payment) => {
        if (payment?.method === "efectivo") {
          totalEfectivo += payment.amount || 0;
        } else if (payment?.method === "transferencia") {
          totalTransferencia += payment.amount || 0;
          const platform = payment.transferPlatform || "otro";
          if (!transferPlatformTotals[platform]) {
            transferPlatformTotals[platform] = 0;
          }
          transferPlatformTotals[platform] += payment.amount || 0;
        }
      });
    });
    console.log(totalEfectivo, totalTransferencia);
    console.log(transferPlatformTotals);

    return {
      totalEfectivo,
      totalTransferencia,
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
                  totals={totals[index]}
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
