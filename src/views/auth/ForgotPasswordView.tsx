import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { ForgotPasswordForm } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../actions/auth.actions";
import { toast } from "sonner";

export default function ForgotPasswordView() {
  const navigate = useNavigate();
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);

      navigate("/auth/new-password");
      reset();
    },
  });
  const handleForgotPassword = async (formData: ForgotPasswordForm) => {
    mutate(formData);
  };

  return (
    <div>
      <h1 className="text-4xl font-black text-center text-gray-700">
        Restablecer Password
      </h1>
      <p className="mb-6 font-semibold text-gray-600">
        ¿Olvidaste tu password? Coloca tu email{" "}
        <span> y restablece tu contraseña</span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="px-5 py-10 mt-10 space-y-10 bg-white rounded-lg"
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal" htmlFor="email">
            Email
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
        <input
          type="submit"
          className="w-full p-3 mt-5 font-bold text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800"
          value="Restablecer Contraseña"
        />
      </form>
      <nav className="mt-8 text-center">
        <Link to="/auth/login" className="block text-lg text-slate-700">
          ¿Ya tienes cuenta?{" "}
          <span className="italic text-amber-600">Iniciar Sesión</span>
        </Link>

        <Link
          to="/auth/confirm-account"
          className="block mt-3 text-slate-700 text-md"
        >
          ¿Cuenta sin confirmar?{" "}
          <span className="italic text-amber-600">Confirmala Aqui</span>
        </Link>
      </nav>
    </div>
  );
}
