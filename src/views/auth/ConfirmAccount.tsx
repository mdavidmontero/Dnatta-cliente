import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { ConfirmToken } from "../../types";
import { confirmAccount } from "../../actions/auth.actions";
import { toast } from "sonner";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <>
      <h1 className="text-4xl font-black text-center text-gray-800">
        Confirma tu Cuenta
      </h1>
      <p className="mb-6 font-semibold text-gray-600">
        Ingresa el código que te brinda{" "}
        <span className="font-bold"> el administrador</span>
      </p>

      <form className="p-10 mt-10 space-y-8 bg-white rounded-lg">
        <label className="block text-2xl font-normal text-center">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-8 text-center">
        <Link
          to="/auth/request-code"
          className="mt-3 font-bold text-slate-700 text-md hover:text-amber-600 "
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
