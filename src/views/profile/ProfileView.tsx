import { useForm } from "react-hook-form";
import { User, UserProfileForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, uploadImage } from "../../actions/auth.actions";
import { toast } from "sonner";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/shared/spinner/Spinner";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["userauthenticated"])!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileForm>({
    defaultValues: {
      name: data.name,
      email: data.email,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["userauthenticated"],
      });
    },
  });
  const updateImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userauthenticated"], (prevData: User) => {
        return {
          ...prevData,
          image: data,
        };
      });
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateImageMutation.mutate(e.target.files[0]);
    }
  };
  const handleUserProfileForm = (formData: UserProfileForm) => {
    const user: User = queryClient.getQueryData(["userauthenticated"])!;
    user.name = formData.name;
    user.email = formData.email;
    updateProfileMutation.mutate(user);
  };
  return (
    <form
      className="max-w-3xl px-5 py-10 mx-auto mt-10 bg-white rounded-md shadow-md"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl font-bold text-center text-slate-800">
        Editar Perfil
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="p-2 border-none rounded-lg bg-slate-100"
          placeholder="handle o Nombre de Usuario"
          {...register("name", {
            required: "El nombre de usuario es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="p-2 border-none rounded-lg bg-slate-100"
          placeholder="Tu Descripción"
          {...register("email", {
            required: "El email  esobligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail no válido",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="p-2 border-none rounded-lg bg-slate-100"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      {updateImageMutation.isPending ? (
        <div className="flex justify-center my-3">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center my-3">
          <img
            src={data.image}
            alt="Imagen de perfil"
            className="object-cover w-56 h-56 rounded-lg"
          />
        </div>
      )}

      <input
        type="submit"
        className="w-full p-2 text-lg font-bold text-white uppercase transition-colors bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-800 "
        value="Guardar Cambios"
      />
    </form>
  );
}
