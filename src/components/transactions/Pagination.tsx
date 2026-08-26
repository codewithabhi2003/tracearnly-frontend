"use client";

import { Button } from "@/components/ui/Button";
import { PaginationMeta } from "@/types/transaction";

interface Props {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function Pagination({
  pagination,
  onPageChange,
  onLimitChange,
}: Props) {
  const {
    page,
    limit,
    total,
    total_pages,
    has_next,
    has_prev,
  } = pagination;

  const start =
    total === 0 ? 0 : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Results */}
      <div className="text-sm text-slate-500">
        {total === 0 ? (
          <span>No transactions found</span>
        ) : (
          <>
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {start.toLocaleString("en-IN")}
            </span>
            {"–"}
            <span className="font-semibold text-slate-700">
              {end.toLocaleString("en-IN")}
            </span>
            {" of "}
            <span className="font-semibold text-slate-700">
              {total.toLocaleString("en-IN")}
            </span>{" "}
            transactions
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
        <select
          value={limit}
          onChange={(event) =>
            onLimitChange(Number(event.target.value))
          }
          aria-label="Transactions per page"
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        >
          {[25, 50, 100].map((value) => (
            <option key={value} value={value}>
              {value} / page
            </option>
          ))}
        </select>

        <Button
          variant="secondary"
          disabled={!has_prev}
          onClick={() => onPageChange(page - 1)}
          className="h-9 rounded-lg px-3"
        >
          ← Prev
        </Button>

        <div className="flex h-9 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600">
          <span className="text-slate-900">
            {page}
          </span>

          <span className="mx-1 text-slate-400">
            /
          </span>

          <span>
            {total_pages || 1}
          </span>
        </div>

        <Button
          variant="secondary"
          disabled={!has_next}
          onClick={() => onPageChange(page + 1)}
          className="h-9 rounded-lg px-3"
        >
          Next →
        </Button>
      </div>
    </div>
  );
}