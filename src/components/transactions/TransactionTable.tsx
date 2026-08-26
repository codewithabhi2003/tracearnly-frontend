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
      <div className="overflow-x-auto">
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
                    <td
                      key={cellIndex}
                      className="px-4 py-4"
                    >
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
                <td
                  colSpan={7}
                  className="px-6 py-14 text-center"
                >
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
                  <td
                    colSpan={7}
                    className="px-6 py-14 text-center"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                        📄
                      </div>

                      <p className="mt-3 font-semibold text-slate-900">
                        No transactions found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        No transactions match your current
                        filters. Try changing your search or
                        filters.
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
                  {/* Date */}
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                    {formatDate(transaction.timestamp)}
                  </td>

                  {/* Merchant */}
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

                  {/* Category */}
                  <td className="px-4 py-4">
                    <Badge
                      className={
                        CATEGORY_COLORS[
                          transaction.category
                        ] ||
                        "bg-slate-100 text-slate-800"
                      }
                    >
                      {transaction.category}
                    </Badge>
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    <span className="text-sm font-bold text-slate-900">
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <Badge
                      className={
                        STATUS_COLORS[transaction.status]
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </td>

                  {/* Payment Method */}
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                    {transaction.payment_method}
                  </td>

                  {/* Coins */}
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