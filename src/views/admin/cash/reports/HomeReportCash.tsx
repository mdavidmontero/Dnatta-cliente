import { Navigate } from "react-router-dom";
import { reportsCash } from "@/actions/reportsCash.actions";
import { SidebarAdminCash } from "@/components/reporscash/Sidebar";
import LottieAnimation from "@/components/ui/LottieAnimation";
import { useAuth } from "@/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { startOfDay } from "date-fns";
import { useState } from "react";
import Calendar from "react-calendar";
import animationData from "../../../../assets/vaciorojo.json";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function HomeReportCash() {
  const [value, setValue] = useState<Value>(new Date());
  const selectedDate = value instanceof Date ? startOfDay(value) : null;
  const { data: user, isLoading: isLoadingUser } = useAuth();
  const handleChange = (e: Value) => {
    const date = Array.isArray(e) ? e[0] : e;
    setValue(date || null);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reportscash", selectedDate],
    queryFn: () =>
      selectedDate
        ? reportsCash(selectedDate.toISOString())
        : Promise.resolve([]),
    enabled: !!selectedDate,
  });

  if (isLoading && isLoadingUser) return "Cargando...";
  if (user?.role !== "ADMIN") return <Navigate to="/404" />;
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <>
        <Calendar
          value={value}
          onChange={handleChange}
          className="mb-4 rounded-lg"
        />
        {data.length > 0 ? (
          <>
            <SidebarAdminCash data={data} />
          </>
        ) : (
          <div>
            <LottieAnimation animationData={animationData} />
            <p className="text-center text-gray-500">
              No hay datos disponibles para esta fecha.
            </p>
          </div>
        )}
      </>
    );
}
