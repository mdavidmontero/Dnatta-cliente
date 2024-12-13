// import { Transition, Dialog } from "@headlessui/react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Fragment } from "react";
// import { cashReportSchemaI } from "@/types/schemas/cash";
// import ReportDetail from "./ReportDetail";
// import { PDFViewer } from "@react-pdf/renderer";

// interface Props {
//   item: cashReportSchemaI;
//   totalTrasferencias: {
//     totalTransferenciasUsuario: number | undefined;
//     totalEfectivoUsuario: number | undefined;
//     transferPlatformTotals: Record<string, number>;
//   }[];
//   index: number;
// }
// export default function ModalReportView({ item, totalTrasferencias }: Props) {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const modalMovement = queryParams.get("reportcashone");
//   const show = modalMovement ? true : false;
//   const navigate = useNavigate();

//   return (
//     <Transition appear show={show} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-10"
//         onClose={() => navigate(location.pathname, { replace: true })}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/60" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-full p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-4xl p-16 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//                 <Dialog.Title as="h3" className="my-2 text-2xl font-black">
//                   Detalle del Gasto
//                 </Dialog.Title>
//                 <div>
//                   <PDFViewer style={{ width: "100%", height: "500px" }}>
//                     <ReportDetail
//                       data={item}
//                       totalTrasferencias={totalTrasferencias}
//                     />
//                   </PDFViewer>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }
