"use client";

import { Transaction } from "@/types/transaction";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate, STATUS_COLORS, CATEGORY_COLORS } from "@/lib/formatters";
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
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
          <tr>
            <SortHeader label="Date" sortKey="timestamp" currentSort={sortBy} currentOrder={sortOrder} onSort={onSort} />
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Merchant
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
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
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Coins
            </th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="border-b border-slate-100">
                {Array.from({ length: 7 }).map((__, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 bg-slate-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}

          {!loading && error && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-red-600">
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && transactions.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                No transactions match your filters.
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            transactions.map((t) => (
              <tr
                key={t.id}
                onClick={() => onRowClick(t)}
                className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer focus-within:bg-slate-50"
                tabIndex={0}
              >
                <td className="px-4 py-3 text-sm whitespace-nowrap">{formatDate(t.timestamp)}</td>
                <td className="px-4 py-3 text-sm font-medium">{t.merchant}</td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={CATEGORY_COLORS[t.category] || "bg-slate-100 text-slate-800"}>
                    {t.category}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium whitespace-nowrap">
                  {formatCurrency(t.amount)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={STATUS_COLORS[t.status]}>{t.status}</Badge>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{t.payment_method}</td>
                <td className="px-4 py-3 text-sm text-right whitespace-nowrap">🪙 {t.coins_earned}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
