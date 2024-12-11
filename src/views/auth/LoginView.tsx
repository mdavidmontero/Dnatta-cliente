import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "../../actions/auth.actions";
import { toast } from "sonner";
import SelectPoint from "../../components/SelectPoint";
import { getPoints } from "../../actions/point.actions";
import { useState } from "react";
import { useStorePoint } from "../../store/userStore";

export default function LoginView() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("admin");
  const setPoint = useStorePoint((state) => state.setPoint);
  const point = useStorePoint((state) => state.point);
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
    role: "",
  };

  const useLoginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate("/products");
    },
  });

  const { data: pointsData } = useQuery({
    queryFn: getPoints,
    queryKey: ["points"],
  });

  const handleLogin = async (formData: UserLoginForm) => {
    const data = {
      ...formData,
      role: userType === "admin" ? "ADMIN" : "USER",
    };
    useLoginMutation.mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  return (
    <>
      <h1 className="text-4xl font-black text-center text-gray-800">
        Iniciar Sesión
      </h1>
      <p className="mb-6 font-semibold text-gray-600">
        Para registrar ventas debes Iniciar sesión
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="max-w-lg px-6 py-12 mx-auto mt-8 space-y-8 bg-white rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold text-slate-500">
            Tipo de Usuario
          </label>
          <select
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="admin">Administrador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>

        {userType === "vendedor" && (
          <div className="grid grid-cols-1 space-y-3">
            <label
              htmlFor="local"
              className="text-xl font-semibold text-slate-500"
            >
              Seleccionar Punto:
            </label>
            <SelectPoint
              pointsData={pointsData}
              setPoint={setPoint}
              pointselect={point}
            />
          </div>
        )}

        <div className="grid grid-cols-1 space-y-3">
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

        <div className="grid grid-cols-1 space-y-3">
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
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full p-3 mt-6 font-bold text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800"
          value="Iniciar Sesión"
        />
      </form>

      <nav className="mt-8 text-center">
        <Link className="block text-lg text-slate-700" to="/auth/register">
          ¿No tienes una cuenta?{" "}
          <span className="italic text-amber-600">Crea una aquí</span>
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="block mt-3 font-normal text-slate-700 text-md"
        >
          ¿Olvidaste tu contraseña?{" "}
          <span className="italic text-amber-600">Reestablecer</span>
        </Link>
      </nav>
    </>
  );
}
