interface Props {
  setPoint: (point: number) => void;
  pointselect: number;
  pointsData:
    | {
        name: string;
        id: number;
        ubicacion: string;
      }[]
    | undefined;
}

export default function SelectPoint({
  pointselect,
  pointsData,
  setPoint,
}: Props) {
  return (
    <select
      name="local"
      id="local"
      onChange={(e) => setPoint(parseInt(e.target.value))}
      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={pointselect}
    >
      <option value={0}>Seleccione</option>
      {pointsData?.map((point) => (
        <option key={point.id} value={point.id}>
          {point.name}
        </option>
      ))}
    </select>
  );
}
