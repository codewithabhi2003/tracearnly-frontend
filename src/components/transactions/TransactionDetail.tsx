"use client";

import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Transaction } from "@/types/transaction";
import { formatCurrency, formatDate, STATUS_COLORS, CATEGORY_COLORS } from "@/lib/formatters";

export function TransactionDetail({
  transaction,
  onClose,
}: {
  transaction: Transaction | null;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={!!transaction} onClose={onClose} title="Transaction Detail">
      {transaction && (
        <div className="space-y-3 text-sm">
          <Row label="Merchant" value={transaction.merchant} />
          <Row label="Amount" value={formatCurrency(transaction.amount)} />
          <Row
            label="Category"
            value={<Badge className={CATEGORY_COLORS[transaction.category] || ""}>{transaction.category}</Badge>}
          />
          <Row
            label="Status"
            value={<Badge className={STATUS_COLORS[transaction.status]}>{transaction.status}</Badge>}
          />
          <Row label="Date" value={formatDate(transaction.timestamp)} />
          <Row label="Payment Method" value={transaction.payment_method} />
          <Row label="Coins Earned" value={`🪙 ${transaction.coins_earned}`} />
          <Row label="Transaction ID" value={transaction.external_id} />
        </div>
      )}
    </Modal>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
