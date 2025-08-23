import { userAuthStore } from "../../store/useAuthStore";

export default function FotoPerfil() {
  const user = userAuthStore((state) => state.user);
  const imagen = user?.image;

  return (
    <div className="flex justify-center">
      <div className="relative w-24 h-24 ">
        {imagen ? (
          <img
            alt="Foto de perfil"
            src={imagen || "/placeholder.svg"}
            className="object-cover w-full h-full transition-all duration-300 border-4 rounded-full shadow-xl border-sidebar-primary/30 hover:shadow-2xl hover:border-sidebar-primary/50 hover:scale-105"
          />
        ) : (
          <img
            alt="Foto de perfil predeterminada"
            src="/logonata2.jpg"
            className="object-cover w-full h-full transition-all duration-300 border-4 rounded-full shadow-xl border-sidebar-primary/30 hover:shadow-2xl hover:border-sidebar-primary/50 hover:scale-105"
          />
        )}
        {/* Status indicator */}
        <div className="absolute w-6 h-6 bg-green-500 rounded-full shadow-lg bottom-1 right-1 border-3 border-sidebar"></div>
      </div>
    </div>
  );
}
