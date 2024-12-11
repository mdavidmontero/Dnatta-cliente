import EditMoneyDay from "@/views/admin/cashMoney/EditMoneyDay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MoneyTableProps = {
  money: {
    id: number;
    cashRegisterId: number;
    denomination: string;
    quantity: number;
    totalDenomination: number;
  }[];
};

export default function MoneyTable({ money }: MoneyTableProps) {
  return (
    <div className="px-4 mt-5 sm:px-6 lg:px-8">
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full overflow-hidden bg-white shadow-md sm:rounded-lg">
            <Table className="min-w-full divide-y divide-gray-300">
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="px-6 py-4 text-sm font-medium tracking-wider text-left text-gray-800 border-b-2 border-gray-300">
                    Denominación
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-medium tracking-wider text-left text-gray-800 border-b-2 border-gray-300">
                    Cantidad
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-medium tracking-wider text-left text-gray-800 border-b-2 border-gray-300">
                    Total
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-medium tracking-wider text-left text-gray-800 border-b-2 border-gray-300">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {money.map((item) => (
                  <TableRow
                    key={item.id}
                    className="transition-all duration-300 ease-in-out border-b border-gray-200 hover:bg-gray-50"
                  >
                    <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.denomination}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.totalDenomination}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      <EditMoneyDay moneyId={item.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
