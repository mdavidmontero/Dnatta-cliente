import { getUsers } from "@/actions/auth.actions";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function NosotrosView() {
  const { data } = useQuery({
    queryKey: ["getusersTotal"],
    queryFn: getUsers,
  });

  const usersActive = data?.filter((user) => user.confirmed === true);

  return (
    <div className="container px-4 py-16 mx-auto space-y-16 bg-gradient-to-r from-pink-50 to-purple-50">
      <section className="text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          Nuestra Historia
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 sm:text-xl dark:text-gray-300">
          DnataHelados nació de la pasión por los helados artesanales y el deseo
          de crear un espacio cálido y acogedor para nuestra comunidad. Desde
          2017, hemos estado sirviendo helados de calidad y fomentando
          conexiones, un helado a la vez.
        </p>
      </section>
      <section className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden">
          <img
            src="/helado.png"
            alt="Interior de DnataHelados"
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            Nuestros Valores
          </h2>
          <ul className="space-y-4">
            {["Calidad", "Comunidad", "Sostenibilidad", "Innovación"].map(
              (value) => (
                <li key={value} className="flex items-center">
                  <span className="mr-3 text-2xl text-amber-500">✓</span>
                  <span className="text-lg text-gray-600 dark:text-gray-300">
                    {value}
                  </span>
                </li>
              )
            )}
          </ul>
          <p className="text-gray-500 dark:text-gray-400">
            Estos valores fundamentales guían todo lo que hacemos, desde la
            selección de ingredientes hasta la atención al cliente.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 sm:text-4xl dark:text-white">
          Conoce a Nuestro Equipo
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {usersActive?.map((member) => (
            <Card
              key={member.name}
              className="overflow-hidden transition-shadow bg-white rounded-lg hover:shadow-xl dark:bg-gray-800"
            >
              <div className="relative w-full h-72">
                <img
                  src={member.image ? member.image : "/no-image.png"}
                  alt={member.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 capitalize dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {member.role === "ADMIN" ? "Dueña" : "Vendedora"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Visítanos */}
      <section className="p-8 text-center rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
          Visítanos
        </h2>
        <p className="mb-2 text-lg text-gray-600 sm:text-xl dark:text-gray-300">
          📍 Mi Futuro - Galeria Popular, Valledupar - 🕙 Abierto todos los dias
          de 10 AM a 8 PM
        </p>
        <p className="mb-2 text-lg text-gray-600 sm:text-xl dark:text-gray-300">
          📍 Universidad Popular del Cesar, Valledupar - Lunes a Viernes de 7 AM
          a 7 PM
        </p>
      </section>
    </div>
  );
}
