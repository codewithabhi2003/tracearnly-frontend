"use client";

import { Button } from "@/components/ui/Button";
import { PaginationMeta } from "@/types/transaction";

interface Props {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function Pagination({ pagination, onPageChange, onLimitChange }: Props) {
  const { page, limit, total, total_pages, has_next, has_prev } = pagination;
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200">
      <p className="text-sm text-slate-600">
        Showing {start}–{end} of {total.toLocaleString()} transactions
      </p>
      <div className="flex items-center gap-2">
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border border-slate-300 rounded-md text-sm px-2 py-1"
        >
          {[25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
        <Button variant="secondary" disabled={!has_prev} onClick={() => onPageChange(page - 1)}>
          ← Prev
        </Button>
        <span className="text-sm text-slate-600 px-2">
          Page {page} of {total_pages || 1}
        </span>
        <Button variant="secondary" disabled={!has_next} onClick={() => onPageChange(page + 1)}>
          Next →
        </Button>
      </div>
    </div>
  );
}
