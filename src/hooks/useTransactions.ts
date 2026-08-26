"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { TransactionFilters, TransactionListResponse } from "@/types/transaction";

export function useTransactions(filters: TransactionFilters) {
  const [data, setData] = useState<TransactionListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string | number> = {};
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") params[k] = v;
      });
      const res = await api.get<TransactionListResponse>("/api/transactions", { params });
      setData(res.data);
    } catch (err) {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
