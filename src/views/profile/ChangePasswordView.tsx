import { useForm } from "react-hook-form";
import { UpdateCurrentUserPasswordForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../actions/auth.actions";
import { toast } from "sonner";
import ErrorMessage from "../../components/ErrorMessage";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data),
  });

  const password = watch("password");
  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) =>
    mutate(formData);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="p-10 space-y-5 bg-white rounded-lg shadow-lg mt-14"
          noValidate
        >
          <legend className="text-2xl font-bold text-center text-slate-800">
            Modificar Contraseña
          </legend>
          <p className="mt-5 text-xl font-light text-gray-500">
            Realiza el cambio de tu Contraseña
          </p>

          <div className="grid grid-cols-1 gap-2">
            <label
              className="text-sm font-bold uppercase"
              htmlFor="current_password"
            >
              Password Actual
            </label>
            <input
              id="current_password"
              type="password"
              placeholder="Password Actual"
              className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
              {...register("current_password", {
                required: "El password actual es obligatorio",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm font-bold uppercase" htmlFor="password">
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
              {...register("password", {
                required: "El Nuevo Password es obligatorio",
                minLength: {
                  value: 8,
                  message: "El Password debe ser mínimo de 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label
              htmlFor="password_confirmation"
              className="text-sm font-bold uppercase"
            >
              Repetir Password
            </label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === password || "Los Passwords no son iguales",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Cambiar Password"
            className="w-full p-2 text-lg font-bold text-white uppercase transition-colors bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-800"
          />
        </form>
      </div>
    </>
  );
}
