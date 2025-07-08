import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GroupedReports } from "@/types/schemas/ventas";
import { formatCurrency } from "@/utils";

export const description = "A linear area chart";

const monthOrder = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const chartConfig = {
  mes: {
    label: "Mes",
    color: "#4f46e5",
  },
} satisfies ChartConfig;

interface Props {
  reports: GroupedReports;
}

export function ChartAreaLinear({ reports }: Props) {
  const meses = Object.keys(reports);

  const totalAmountMes = meses.map((month) => {
    const monthlyReport = reports[month];
    return {
      mes: month,
      totalAmount: monthlyReport.totalAmount,
    };
  });

  const orderedData = totalAmountMes.sort(
    (a, b) =>
      monthOrder.indexOf(a.mes.toLowerCase()) -
      monthOrder.indexOf(b.mes.toLowerCase())
  );

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          Indicador de Rendimiento - Ventas por Mes
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Evolución mensual de las ventas acumuladas.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={orderedData}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.toUpperCase()}
              stroke="#6b7280"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={-15}
              stroke="#6b7280"
              tickFormatter={(value) => `${formatCurrency(value)}`}
            />
            <ChartTooltip
              cursor={{ stroke: "#c7d2fe", strokeWidth: 1 }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="totalAmount"
              type="monotone"
              stroke="#4f46e5"
              strokeWidth={2}
              fill="#6366f1"
              fillOpacity={0.2}
              label={{ value: formatCurrency(totalAmountMes[0]?.totalAmount) }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex items-start w-full gap-2 text-sm">
          <div className="grid gap-1">
            <div className="font-semibold text-gray-800">Meses con ventas</div>
            <div className="text-gray-500">
              {monthOrder.filter((m) => meses.includes(m)).join(" - ")}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
