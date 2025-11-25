"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous */}
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center"
      >
        <ChevronLeft size={16} />
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((num) => {
        const isActive = num === currentPage;

        return (
          <Button
            key={num}
            size="sm"
            variant={isActive ? "primary" : "secondary"}
            onClick={() => onPageChange(num)}
            className={
              isActive
                ? "font-semibold"
                : "bg-card text-foreground border border-border hover:bg-muted"
            }
          >
            {num}
          </Button>
        );
      })}

      {/* Next */}
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
