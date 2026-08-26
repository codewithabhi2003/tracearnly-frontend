"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { TransactionFiltersBar } from "@/components/transactions/TransactionFilters";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Pagination } from "@/components/transactions/Pagination";
import { TransactionDetail } from "@/components/transactions/TransactionDetail";
import { useTransactions } from "@/hooks/useTransactions";
import { Transaction, TransactionFilters } from "@/types/transaction";

function TransactionsInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || undefined;

  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    limit: 25,
    sort_by: "timestamp",
    sort_order: "desc",
    category: initialCategory,
  });
  const [selected, setSelected] = useState<Transaction | null>(null);

  const { data, loading, error } = useTransactions(filters);

  function handleSort(key: "timestamp" | "amount") {
    setFilters((f) => ({
      ...f,
      sort_by: key,
      sort_order: f.sort_by === key && f.sort_order === "desc" ? "asc" : "desc",
    }));
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Transactions</h1>

      <Card className="p-4">
        <TransactionFiltersBar filters={filters} onChange={setFilters} />
      </Card>

      <Card>
        <TransactionTable
          transactions={data?.data || []}
          loading={loading}
          error={error}
          sortBy={filters.sort_by || "timestamp"}
          sortOrder={filters.sort_order || "desc"}
          onSort={handleSort}
          onRowClick={setSelected}
        />
        {data && (
          <Pagination
            pagination={data.pagination}
            onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
            onLimitChange={(limit) => setFilters((f) => ({ ...f, limit, page: 1 }))}
          />
        )}
      </Card>

      <TransactionDetail transaction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={null}>
      <TransactionsInner />
    </Suspense>
  );
}
