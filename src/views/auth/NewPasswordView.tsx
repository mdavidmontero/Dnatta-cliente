import { useState } from "react";
import { ConfirmToken } from "../../types";
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <h1 className="text-4xl font-black text-center text-gray-800">
        Reestablecer Password
      </h1>
      <p className="mb-6 font-semibold text-center text-gray-600">
        Ingresa el código que te compartio {""}
        <span className="font-bold text-amber-600"> el administrador</span>
      </p>

      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
