import { userAuthStore } from "../../store/useAuthStore";

export default function FotoPerfil() {
  const user = userAuthStore((state) => state.user);
  const imagen = user?.image;

  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-20 h-20 sm:w-10 sm:h-10 lg:w-16 lg:h-16 xl:w-36 xl:h-36">
        {imagen ? (
          <img
            alt="Foto de perfil"
            src={imagen}
            className="object-cover w-full h-full transition-shadow duration-300 border-4 border-gray-200 rounded-full shadow-md hover:shadow-lg"
          />
        ) : (
          <img
            alt="Foto de perfil predeterminada"
            src="/logonata2.jpg"
            className="object-cover w-full h-full transition-shadow duration-300 border-4 border-gray-200 rounded-full shadow-md hover:shadow-lg"
          />
        )}
      </div>
    </div>
  );
}
