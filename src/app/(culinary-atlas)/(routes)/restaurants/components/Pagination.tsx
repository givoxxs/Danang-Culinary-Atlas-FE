import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

const Pagination = memo(function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxVisible = 5 
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const leftSide = Math.max(2, currentPage - 1);
    const rightSide = Math.min(totalPages - 1, currentPage + 1);
    
    if (leftSide > 2) pages.push("...");
    
    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }
    
    if (rightSide < totalPages - 1) pages.push("...");
    
    // Always show last page
    if (totalPages > 1) pages.push(totalPages);
    
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        typeof page === "number" ? (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`
              px-4 py-2 rounded-lg transition
              ${currentPage === page 
                ? "bg-[#44BACA] text-white" 
                : "hover:bg-gray-100"
              }
            `}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page.toString().padStart(2, "0")}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            {page}
          </span>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </nav>
  );
});

export default Pagination;