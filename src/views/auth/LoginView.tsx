import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../actions/auth.actions";
import { toast } from "sonner";
export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const useLoginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleLogin = async (formData: UserLoginForm) => {
    useLoginMutation.mutate(formData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  return (
    <>
      <h1 className="text-4xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-white">
        Para registrar un pedido debes iniciar sesión
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="px-5 py-10 mt-10 space-y-10 bg-white rounded-lg"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
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
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full p-3 mt-5 font-bold text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800"
          value="Iniciar Sesión"
        />
      </form>
      <nav className="mt-10">
        <Link
          className="block text-lg text-center text-amber-500"
          to="/auth/register"
        >
          ¿No tienes una cuenta? Crea una aquí
        </Link>
      </nav>
    </>
  );
}
