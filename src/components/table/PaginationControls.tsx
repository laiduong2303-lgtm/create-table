"use client";

import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  pageIndex: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ pageIndex, totalPages, isLoading, onPageChange }: PaginationControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={pageIndex === 0 || isLoading}
        onClick={() => onPageChange(pageIndex - 1)}
      >
        Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            variant={pageIndex === i ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(i)}
            disabled={isLoading}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        disabled={pageIndex >= totalPages - 1 || isLoading}
        onClick={() => onPageChange(pageIndex + 1)}
      >
        Next
      </Button>
    </div>
  );
}