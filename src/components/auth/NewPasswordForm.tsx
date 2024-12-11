import { useMutation } from "@tanstack/react-query";
import { ConfirmToken, NewPasswordForm as NewPasswordType } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";
import { updatePasswordWithToken } from "../../actions/auth.actions";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};
export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordType = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });

  const handleNewPassword = (formData: NewPasswordType) => {
    const data = {
      formData,
      token,
    };
    mutate(data);
  };

  const password = watch("password");
  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="max-w-lg px-6 py-12 mx-auto mt-8 space-y-8 bg-white rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="p-3 border border-gray-300 rounded-md bg-slate-100 placeholder-slate-400 focus:outline-none"
            {...register("password", {
              required: "El Password es obligatorio",
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

        <div className="grid grid-cols-1 space-y-3">
          <label className="text-2xl font-normal">Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="p-3 border border-gray-300 rounded-md bg-slate-100 placeholder-slate-400 focus:outline-none"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Establecer Password"
          className="w-full p-3 mt-6 font-bold text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800"
        />
      </form>
    </>
  );
}
