import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPlaceholderData: boolean;
  maxVisiblePages?: number;
};

export default function PaginacionShared({
  currentPage,
  totalPages,
  onPageChange,
  isPlaceholderData,
  maxVisiblePages = 5,
}: PaginationProps) {
  const getVisiblePages = React.useCallback(() => {
    if (totalPages <= 0) return [];
    const pages: number[] = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  const visible = getVisiblePages();
  const firstVisible = visible[0];
  const lastVisible = visible[visible.length - 1];

  const go = (p: number) => {
    if (!isPlaceholderData && p !== currentPage && p >= 1 && p <= totalPages) {
      onPageChange(p);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => go(currentPage - 1)} />
        </PaginationItem>

        {firstVisible && firstVisible > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                isActive={currentPage === 1}
                onClick={() => go(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {firstVisible > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {visible.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={currentPage === p}
              aria-current={currentPage === p ? "page" : undefined}
              onClick={() => go(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {lastVisible && lastVisible < totalPages && (
          <>
            {lastVisible < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                isActive={currentPage === totalPages}
                onClick={() => go(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext onClick={() => go(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
