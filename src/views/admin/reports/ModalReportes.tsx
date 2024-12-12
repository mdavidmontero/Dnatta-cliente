import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { GeneratePdf } from "../../../components/reports/day/Report";
import { ReportArray } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";

interface ModalReportesProps {
  data: ReportArray | undefined;
  totalAmountSold: number;
}

export default function ModalReportes({
  data,
  totalAmountSold,
}: ModalReportesProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalresportcash = queryParams.get("reportcasday");
  const show = modalresportcash ? true : false;
  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
      >
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
                Reporte generado en PDF para el día seleccionado.
              </Dialog.Description>

              {data && (
                <PDFViewer style={{ width: "100%", height: "500px" }}>
                  <GeneratePdf ordenes={data} totalday={totalAmountSold} />
                </PDFViewer>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
