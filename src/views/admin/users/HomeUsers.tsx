import { getUsersAll } from "@/actions/auth.actions";
import Heading from "@/components/shared/Heading";
import UsersTable from "@/components/users/UsersTable";
import { useQuery } from "@tanstack/react-query";

export default function HomeUsers() {
  const { data } = useQuery({
    queryKey: ["usersAll"],
    queryFn: getUsersAll,
  });
  console.log(data);

  return (
    <div className="container px-4 py-4 mx-auto">
      <Heading>Administrar Usuarios</Heading>

      <UsersTable users={data || []} />
    </div>
  );
}
