"use client";

import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Transaction } from "@/types/transaction";
import {
  formatCurrency,
  formatDate,
  STATUS_COLORS,
  CATEGORY_COLORS,
} from "@/lib/formatters";

export function TransactionDetail({
  transaction,
  onClose,
}: {
  transaction: Transaction | null;
  onClose: () => void;
}) {
  return (
    <Modal
      isOpen={!!transaction}
      onClose={onClose}
      title="Transaction Details"
    >
      {transaction && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Merchant
                </p>

                <h3 className="mt-1 truncate text-lg font-bold text-slate-900">
                  {transaction.merchant}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {transaction.external_id}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-xs text-slate-400">
                  Amount
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={
                STATUS_COLORS[transaction.status]
              }
            >
              {transaction.status}
            </Badge>

            <Badge
              className={
                CATEGORY_COLORS[transaction.category] || ""
              }
            >
              {transaction.category}
            </Badge>
          </div>

          {/* Details */}
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <Row
              label="Date"
              value={formatDate(transaction.timestamp)}
            />

            <Row
              label="Payment Method"
              value={transaction.payment_method}
            />

            <Row
              label="Coins Earned"
              value={
                <span className="font-semibold text-amber-700">
                  🪙{" "}
                  {transaction.coins_earned.toLocaleString(
                    "en-IN"
                  )}
                </span>
              }
            />

            <Row
              label="Transaction ID"
              value={
                <span className="max-w-[220px] truncate text-right">
                  {transaction.external_id}
                </span>
              }
              last
            />
          </div>

          {/* Coins highlight */}
          {transaction.coins_earned > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                🪙
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-900">
                  Coins earned from this transaction
                </p>

                <p className="mt-0.5 text-xs text-amber-700">
                  {transaction.coins_earned.toLocaleString(
                    "en-IN"
                  )} coins added to your rewards balance.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

function Row({
  label,
  value,
  last = false,
}: {
  label: string;
  value: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      <span className="shrink-0 text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-800">
        {value}
      </span>
    </div>
  );
}