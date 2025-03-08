import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { cashReportSchemaI } from "@/types/schemas/cash";
import MovementViewDay from "../movements/MovementViewDay";
import DetailReportCashOneDay from "./DetailReportCashOneDay";
import { calculateDataCashDay } from "@/utils";

interface PropsSidebar {
  data: cashReportSchemaI[];
}

export function SidebarAdminCash({ data }: PropsSidebar) {
  const totals = calculateDataCashDay(data);

  return (
    <>
      <header className="flex items-center gap-2 px-6 py-4 border-b shadow-md bg-gray-50">
        <Separator orientation="vertical" className="h-6 mr-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Reporte de Caja</BreadcrumbItem>
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

      <MovementViewDay />
    </>
  );
}
