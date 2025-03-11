import { Link } from "react-router-dom";

const NAVIGATION_LINKS = [
  {
    name: "Inicio",
    link: "/",
  },

  {
    name: "Sobre Nosotros",
    link: "/about-us",
  },
  {
    name: "Contáctanos",
    link: "/contact-us",
  },
];
export default function Footer() {
  return (
    <footer className="w-full text-white bg-gray-700">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid items-center grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex justify-center sm:justify-start">
            <img
              src={"/categories/icon_oreosupreme.png"}
              width={150}
              height={150}
              alt="Helado artesanal"
              className="object-cover rounded-lg w-30 h-30 md:w-48 md:h-48"
            />
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-4xl font-bold font-clickerScript text-amber-400">
              DnataHelados
            </h3>
            <p className="text-base text-gray-300">
              Somos una empresa dedicada a ofrecer helados artesanales de la más
              alta calidad.
            </p>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-yellow-400">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="text-gray-300 transition duration-300 hover:text-yellow-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-yellow-400">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Valledupar - Cesar, Colombia</li>
              <li>(+57) 3236397055</li>
              <li>dnataheladosirresistible@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-2 text-sm text-center text-gray-400 border-t border-gray-700">
          <p>
            © {new Date().getFullYear()} DnataHelados. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
