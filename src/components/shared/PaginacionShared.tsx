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
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

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

      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="bg-white text-[#094074] hover:bg-[#f0f0f0] transition-colors duration-300 ease-in-out px-5 py-2 rounded-md ring-2 ring-[#3C6997] ring-opacity-50 text-sm font-medium"
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="text-[#094074]">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
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

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-[#094074]">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="bg-white text-[#094074] hover:bg-[#f0f0f0] transition-colors duration-300 ease-in-out px-5 py-2 rounded-md ring-2 ring-[#3C6997] ring-opacity-50 text-sm font-medium"
          >
            {totalPages}
          </button>
        </>
      )}

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
