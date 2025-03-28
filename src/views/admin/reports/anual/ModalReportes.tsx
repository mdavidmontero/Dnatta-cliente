import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { GroupedReports } from "../../../../types/schemas/ventas";
import { AnnualReportPDF } from "./SalesReportMes";

interface ModalReportesProps {
  isOpen: boolean;
  onClose: () => void;
  groupedReports: GroupedReports;
  totalYearlySales: number;
}

export default function ModalReportesAnual({
  isOpen,
  onClose,
  groupedReports,
  totalYearlySales,
}: ModalReportesProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-3/4 p-6 bg-white rounded-lg md:w-1/2">
              <Dialog.Title className="text-2xl font-bold text-center">
                Reporte en PDF
              </Dialog.Title>
              <Dialog.Description className="mt-4 mb-6 text-center text-gray-700">
                Reporte generado en PDF.
              </Dialog.Description>

              {groupedReports && (
                <PDFViewer style={{ width: "100%", height: "500px" }}>
                  <AnnualReportPDF
                    groupedReports={groupedReports}
                    totalYearlySales={totalYearlySales}
                  />
                </PDFViewer>
              )}

              <div className="flex justify-center mt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cerrar
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
