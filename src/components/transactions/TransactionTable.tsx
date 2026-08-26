"use client";

import { Transaction } from "@/types/transaction";
import { Badge } from "@/components/ui/Badge";
import {
  formatCurrency,
  formatDate,
  STATUS_COLORS,
  CATEGORY_COLORS,
} from "@/lib/formatters";
import { SortHeader } from "./SortHeader";

interface Props {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  sortBy: string;
  sortOrder: string;
  onSort: (key: "timestamp" | "amount") => void;
  onRowClick: (t: Transaction) => void;
}

export function TransactionTable({
  transactions,
  loading,
  error,
  sortBy,
  sortOrder,
  onSort,
  onRowClick,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* =========================================================
          MOBILE VIEW
      ========================================================== */}
      <div className="block sm:hidden">
        {/* Mobile header */}
        <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Transactions
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Tap a transaction for details
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSort("timestamp")}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
            >
              Date{" "}
              {sortBy === "timestamp"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="p-4">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-100" />

                      <div className="space-y-2">
                        <div className="h-3 w-28 rounded bg-slate-100" />
                        <div className="h-2.5 w-20 rounded bg-slate-100" />
                      </div>
                    </div>

                    <div className="h-4 w-20 rounded bg-slate-100" />
                  </div>

                  <div className="mt-4 h-8 rounded-lg bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              !
            </div>

            <p className="mt-3 font-semibold text-slate-900">
              Unable to load transactions
            </p>

            <p className="mt-1 text-sm text-slate-500">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && transactions.length === 0 && (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
              📄
            </div>

            <p className="mt-3 font-semibold text-slate-900">
              No transactions found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your filters or search.
            </p>
          </div>
        )}

        {/* Mobile transaction cards */}
        {!loading &&
          !error &&
          transactions.length > 0 && (
            <div className="divide-y divide-slate-100">
              {transactions.map((transaction) => (
                <button
                  key={transaction.id}
                  type="button"
                  onClick={() => onRowClick(transaction)}
                  className="block w-full text-left transition hover:bg-slate-50 active:bg-slate-100"
                >
                  <div className="p-4">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                          {transaction.merchant
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {transaction.merchant}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {formatDate(transaction.timestamp)}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-slate-900">
                          {formatCurrency(transaction.amount)}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          #{transaction.id}
                        </p>
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge
                        className={
                          CATEGORY_COLORS[transaction.category] ||
                          "bg-slate-100 text-slate-800"
                        }
                      >
                        {transaction.category}
                      </Badge>

                      <Badge
                        className={STATUS_COLORS[transaction.status]}
                      >
                        {transaction.status}
                      </Badge>

                      <span className="ml-auto inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                        🪙{" "}
                        {transaction.coins_earned.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    {/* Payment method */}
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-xs text-slate-400">
                        Payment method
                      </span>

                      <span className="text-xs font-medium text-slate-600">
                        {transaction.payment_method}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
      </div>

      {/* =========================================================
          DESKTOP VIEW
      ========================================================== */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              <SortHeader
                label="Date"
                sortKey="timestamp"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={onSort}
              />

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Merchant
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <SortHeader
                label="Amount"
                sortKey="amount"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={onSort}
                align="right"
              />

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Payment Method
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Coins
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* Loading */}
            {loading &&
              Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 7 }).map((__, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-4">
                      <div
                        className={`h-4 animate-pulse rounded-md bg-slate-100 ${
                          cellIndex === 1
                            ? "w-32"
                            : cellIndex === 2
                              ? "w-24"
                              : "w-20"
                        }`}
                      />
                    </td>
                  ))}
                </tr>
              ))}

            {/* Error */}
            {!loading && error && (
              <tr>
                <td colSpan={7} className="px-6 py-14 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-lg text-red-600">
                      !
                    </div>

                    <p className="mt-3 font-semibold text-slate-900">
                      Unable to load transactions
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {error}
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading &&
              !error &&
              transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                        📄
                      </div>

                      <p className="mt-3 font-semibold text-slate-900">
                        No transactions found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        No transactions match your current filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            {/* Transactions */}
            {!loading &&
              !error &&
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => onRowClick(transaction)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      onRowClick(transaction);
                    }
                  }}
                  tabIndex={0}
                  className="group cursor-pointer transition-colors hover:bg-slate-50 focus:bg-brand-50/50 focus:outline-none"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                    {formatDate(transaction.timestamp)}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600 transition group-hover:bg-white group-hover:shadow-sm">
                        {transaction.merchant
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {transaction.merchant}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          #{transaction.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <Badge
                      className={
                        CATEGORY_COLORS[transaction.category] ||
                        "bg-slate-100 text-slate-800"
                      }
                    >
                      {transaction.category}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    <span className="text-sm font-bold text-slate-900">
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <Badge
                      className={STATUS_COLORS[transaction.status]}
                    >
                      {transaction.status}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                    {transaction.payment_method}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700">
                      🪙{" "}
                      {transaction.coins_earned.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}