interface Props {
  handleGenerateReport: () => void;
  small?: boolean;
  title: string;
}
export default function ButtonGenerateExcel({
  handleGenerateReport,
  small = false,
  title,
}: Props) {
  return (
    <button
      onClick={handleGenerateReport}
      className={`flex items-center justify-center gap-2 ${
        small ? "px-4 py-2" : "px-6 py-3"
      } text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 hover:scale-105`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {title}
    </button>
  );
}
