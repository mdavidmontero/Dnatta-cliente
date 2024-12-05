import Header from "../../components/Header";

export default function HomeView() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 bg-right-top bg-no-repeat lg:bg-home lg:bg-home-xl">
        <div className="px-6 py-10 mx-auto max-w-7xl">
          <div className="flex flex-col items-center space-y-6 lg:w-1/2 lg:items-start lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#D4774B] text-center lg:text-left">
              ¡Descubre el sabor de la felicidad con nuestros helados
              artesanales!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#BACEC] text-center lg:text-left">
              Sumérgete en un mundo de sabores exquisitos y frescos, hechos con
              amor y los mejores ingredientes. ¡Déjate seducir por la suavidad y
              cremosidad de nuestros helados y haz de cada momento algo
              delicioso!
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-[#BACEC] mt-4 text-center lg:text-left font-semibold">
              Ven a visitarnos y disfruta de una experiencia única
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
