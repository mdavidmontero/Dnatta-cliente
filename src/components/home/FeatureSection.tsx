import { Award, IceCream, Smile, Heart } from "lucide-react";

const FEATURES = [
  {
    name: "Ingredientes Premium",
    Icon: IceCream,
    description: "Utilizamos ingredientes de la más alta calidad.",
  },
  {
    name: "Calidad Garantizada",
    Icon: Award,
    description: "Nuestros helados son sinónimo de excelencia.",
  },
  {
    name: "Sabores Únicos",
    Icon: Smile,
    description: "Disfruta de sabores que no encontrarás en otro lugar.",
  },
  {
    name: "Precios Accesibles",
    Icon: Heart,
    description: "Helados artesanales a precios que todos pueden disfrutar.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl ">
            ¿Por qué somos diferentes?
          </h2>
          <p className="text-lg text-gray-600 sm:text-xl">
            No solo hacemos helados, ¡hacemos tu día más dulce!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.name}
              className="p-8 text-center transition-shadow duration-300 bg-white rounded-lg shadow-lg dark:bg-gray-700 hover:shadow-xl"
            >
              <div className="flex justify-center">
                <feature.Icon className="w-12 h-12 mb-4 text-amber-500 dark:text-amber-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
