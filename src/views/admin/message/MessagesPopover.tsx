import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface Props {
  tokens:
    | {
        token?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
      }[]
    | undefined;
}

export function MessagesPopover({ tokens }: Props) {
  return (
    <Popover>
      <PopoverTrigger className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-gray-200">
        <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-gray-700" />
        {tokens && tokens.length > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full">
            {tokens.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-80 ">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-700 ">
            Usuarios sin Acceso
          </h3>

          <div className="space-y-4">
            {tokens?.length ? (
              tokens.map((token) => (
                <div
                  key={token.token}
                  className="p-3 transition duration-200 border rounded-lg hover:bg-gray-50"
                >
                  <span className="my-2 text-sm">
                    Compartele el token al usuario para que pueda ingresar
                  </span>
                  <p className="text-sm font-medium text-gray-900">
                    {token.name || "Nombre no disponible"}
                  </p>
                  <p className="text-sm text-gray-500">{token.email}</p>
                  <p className="mt-1 text-sm font-bold text-gray-600 truncate">
                    Token: <span className="font-normal">{token.token}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No hay usuarios sin Acceso.
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
