import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ButtonConfirmOrder({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} modal>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full py-5 mt-5 font-bold text-white uppercase bg-indigo-600 rounded cursor-pointer hover:bg-indigo-800 disabled:opacity-50"
          onClick={() => setOpenDialog(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Confirmar Pedido
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Confirmación de Pago
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[calc(100dvh-10rem)] overflow-y-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
