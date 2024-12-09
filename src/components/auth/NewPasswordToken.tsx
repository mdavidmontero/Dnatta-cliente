import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { ConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { validateToken } from "../../actions/auth.actions";

type NewPasswordTokenProps = {
  token: ConfirmToken["token"];
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) {
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsValidToken(true);
    },
  });
  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };
  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <>
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
    </>
  );
}
