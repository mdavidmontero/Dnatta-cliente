import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import FeaturesSection from "@/components/home/FeatureSection";
import { MessageCircleDashed } from "lucide-react";

export default function HomeView() {
  const images = [
    "/categories/icon_bananasplit.png",
    "/categories/icon_browniehelado.png",
    "/categories/icon_chococono.png",
    "/categories/icon_conosencillo.png",
    "/categories/icon_conotopping.png",
    "/categories/icon_jetsupreme.png",
    "/categories/icon_megahelado.png",
    "/categories/icon_oreosupreme.png",
    "/categories/icon_supreme.png",
    "/categories/icon_tarrina.png",
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);
  const [, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const openWhatsApp = () => {
    const phoneNumber = "+573236397055";
    const defaultMessage = "Hola, quiero hacer un pedido ";
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 bg-right-top bg-no-repeat lg:bg-home lg:bg-home-xl">
        <div className="justify-center px-4 py-10 mx-auto max-w-7xl sm:px-6 ">
          <div className="flex flex-col items-center space-y-6 lg:w-1/2 lg:items-start lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#D4774B] text-center lg:text-start">
              ¡Descubre el sabor de la felicidad con nuestros helados
              artesanales!
            </h1>
            <p className="text-lg text-center text-gray-600 sm:text-xl md:text-xl lg:text-justify">
              Sumérgete en un mundo de sabores exquisitos y frescos, hechos con
              amor y los mejores ingredientes. ¡Déjate seducir por la suavidad y
              cremosidad de nuestros helados y haz de cada momento algo
              delicioso!
            </p>

            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center px-6 py-3 font-semibold text-white transition-colors duration-300 bg-green-500 rounded-lg hover:bg-green-600"
            >
              <MessageCircleDashed className="w-5 h-5 mr-2" />
              Hacer pedido por WhatsApp
            </button>

            <div className="w-full rounded-lg lg:w-11/12">
              <Carousel
                setApi={setApi}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="overflow-hidden"
              >
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index} className="relative">
                      <img
                        src={src}
                        alt={`Imagen ${index + 1}`}
                        className="object-contain w-full h-[250px] sm:h-[300px] md:h-[350px] transition-transform duration-500 hover:scale-105"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Texto final */}
            <p className="text-lg font-semibold text-center text-gray-600 sm:text-xl md:text-2xl lg:text-left">
              Ven a visitarnos y disfruta de una experiencia única
            </p>
          </div>
        </div>
      </main>
      <FeaturesSection />
    </>
  );
}
