import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationsProps {
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

export function Paginations({
  page = 0,
  pageSize = 5,
  total = 0,
  onPageChange,
}: PaginationsProps) {
  const totalPages = Math.ceil(total / pageSize);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageChange = (newPage: number) => {
    if (onPageChange && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  if (!page) return null;
  return (
    <Pagination className="flex items-center justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
            aria-disabled={page === 1}
          />
        </PaginationItem>
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              className="cursor-pointer"
              isActive={p === page}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 5 && page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
            aria-disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
