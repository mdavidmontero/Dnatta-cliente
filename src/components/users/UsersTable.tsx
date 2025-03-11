import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersAllSchema } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "@/actions/auth.actions";
import { toast } from "sonner";

type UsersTableProps = {
  users: UsersAllSchema[];
};

export default function UsersTable({ users }: UsersTableProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      userId,
      status,
    }: {
      userId: number;
      status: boolean;
    }) => {
      return updateUserStatus(+userId, status);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["usersAll"] });
      toast.success(data);
    },
  });
  return (
    <div className="px-4 mt-20 sm:px-6 lg:px-8">
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full overflow-hidden align-middle bg-white rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="py-4 pl-6 text-sm font-semibold tracking-wider text-left text-gray-800 uppercase border-b-2">
                    Nombre
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-800 uppercase border-b-2">
                    Correo
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-800 uppercase border-b-2">
                    Rol
                  </TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold tracking-wider text-left text-gray-800 uppercase border-b-2">
                    Imagen
                  </TableHead>
                  <TableHead className="py-4 pr-6 text-sm font-semibold tracking-wider text-center text-gray-800 uppercase border-b-2">
                    Estado
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="transition-all duration-200 ease-in-out hover:bg-gray-50"
                  >
                    <TableCell className="py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {user.name}
                    </TableCell>
                    <TableCell className="py-4 pl-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {user.email}
                    </TableCell>

                    <TableCell className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {user.role === "USER" ? "Vendedor" : "Administrador"}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {user.image ? (
                        <img
                          src={user.image}
                          className="object-cover rounded w-14 h-14"
                          alt="imagen user"
                        />
                      ) : (
                        <img
                          src="/no-image.png"
                          className="object-cover rounded w-14 h-14"
                          alt="No imagen"
                        />
                      )}
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-sm font-medium text-center whitespace-nowrap">
                      <Select
                        onValueChange={(value) =>
                          mutation.mutate({
                            userId: +user.id,
                            status: value === "activo",
                          })
                        }
                        defaultValue={user.confirmed ? "activo" : "inactivo"}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Estado del Usuario" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="activo">Activo</SelectItem>
                            <SelectItem value="inactivo">Inactivo</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
