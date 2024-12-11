import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserRegisterForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../actions/auth.actions";

export default function RegisterView() {
  const navigate = useNavigate();
  const initialValues: UserRegisterForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/confirm-account");
      reset();
    },
  });

  const password = watch("password");

  const handleRegister = async (formData: UserRegisterForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-4xl font-black text-center text-gray-800">
        Crear Cuenta
      </h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-lg px-6 py-12 mx-auto mt-8 space-y-8 bg-white rounded-lg"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="p-3 border border-gray-300 rounded-md bg-slate-100 placeholder-slate-400 focus:outline-none"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="p-3 border border-gray-300 rounded-md bg-slate-100 placeholder-slate-400 focus:outline-none"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="p-3 border border-gray-300 rounded-md bg-slate-100 placeholder-slate-400 focus:outline-none"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="p-3 border border-gray-300 rounded-md bg-slate-100 placeholder-slate-400 focus:outline-none"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los passwords no son iguales",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full p-3 mt-5 font-bold text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800"
          value="Crear Cuenta"
        />
      </form>

      <nav className="mt-10">
        <Link
          className="block text-lg text-center text-slate-700"
          to="/auth/login"
        >
          ¿Ya tienes una cuenta?{" "}
          <span className="italic text-amber-600">Inicia Sesión</span>
        </Link>
      </nav>
    </>
  );
}
