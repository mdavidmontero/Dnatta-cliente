import Calendar from "react-calendar";

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
interface Props {
  value: Value;
  handleChange: (e: Value) => void;
}
export default function CalendarShared({ value, handleChange }: Props) {
  return (
    <div className="flex justify-center p-5 bg-white border rounded-lg shadow-sm md:w-1/2 lg:w-1/3 lg:sticky lg:top-20">
      <Calendar
        value={value}
        onChange={handleChange}
        className="rounded-xl"
        locale="es"
      />
    </div>
  );
}
