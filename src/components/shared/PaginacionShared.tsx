type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPlaceholderData: boolean;
};

export default function PaginacionShared({
  currentPage,
  totalPages,
  onPageChange,
  isPlaceholderData,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-3 py-6">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPlaceholderData}
          className={`${
            isPlaceholderData
              ? "cursor-not-allowed text-gray-400"
              : "bg-[#3C6997] hover:bg-[#2e5277]"
          } transition-colors duration-300 ease-in-out px-5 py-2 rounded-full text-white font-semibold text-sm`}
        >
          &laquo; Anterior
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${
            currentPage === page
              ? "bg-[#094074] text-white font-semibold"
              : "bg-white text-[#094074] hover:bg-[#f0f0f0]"
          } transition-colors duration-300 ease-in-out px-5 py-2 rounded-md ring-2 ring-[#3C6997] ring-opacity-50 text-sm font-medium`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isPlaceholderData}
          className={`${
            isPlaceholderData
              ? "cursor-not-allowed text-gray-400"
              : "bg-[#3C6997] hover:bg-[#2e5277]"
          } transition-colors duration-300 ease-in-out px-5 py-2 rounded-md text-white font-semibold text-sm`}
        >
          Siguiente &raquo;
        </button>
      )}
    </nav>
  );
}
