import ContactInfoCard from "@/components/home/ContactInfoCard";

export default function Contact() {
  return (
    <div className="container px-4 py-16 mx-auto space-y-16 bg-gradient-to-r from-pink-50 to-purple-50">
      <section className="text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          Contáctanos
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 sm:text-xl dark:text-gray-300">
          ¡Nos encantaría saber de ti! Ya sea que tengas una pregunta sobre
          nuestros helados, quieras pedir a domicilio o simplemente quieras
          saludarnos, no dudes en contactarnos.
        </p>
      </section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ContactInfoCard />
      </div>

      <section className="p-8 text-center rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
          Visítanos
        </h2>
        <p className="mb-2 text-lg text-gray-600 sm:text-xl dark:text-gray-300">
          Abierto todos los días de 10 AM a 8 PM
        </p>
        <p className="text-lg text-gray-600 sm:text-xl dark:text-gray-300">
          ¡Esperamos servirte el mejor helado!
        </p>
      </section>
    </div>
  );
}
