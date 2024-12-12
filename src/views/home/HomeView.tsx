import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

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
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 bg-right-top bg-no-repeat lg:bg-home lg:bg-home-xl ">
        <div className="py-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center space-y-3 lg:w-1/2 lg:items-start lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-[#D4774B] text-center lg:text-start ">
              ¡Descubre el sabor de la felicidad con nuestros helados
              artesanales!
            </h1>
            <p className="text-lg sm:text-xl md:text-xl text-[#BACEC] text-center lg:text-justify">
              Sumérgete en un mundo de sabores exquisitos y frescos, hechos con
              amor y los mejores ingredientes. ¡Déjate seducir por la suavidad y
              cremosidad de nuestros helados y haz de cada momento algo
              delicioso!
            </p>
            <div className="w-full rounded-lg lg:w-11/12">
              <Carousel
                setApi={setApi}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
              >
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index} className="relative">
                      <img
                        src={src}
                        alt={`Imagen ${index + 1}`}
                        className="object-contain w-full h-[250px] sm:h-[200px] md:h-[300px] transition-transform duration-500 hover:scale-105 mb-5"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-[#BACEC]  text-center lg:text-left font-semibold">
              Ven a visitarnos y disfruta de una experiencia única
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
