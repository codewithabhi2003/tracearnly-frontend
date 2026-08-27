"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import {
  TransactionFilters,
  TransactionListResponse,
} from "@/types/transaction";

export function useTransactions(filters: TransactionFilters) {
  const [data, setData] =
    useState<TransactionListResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    page,
    limit,
    search,
    category,
    status,
    date_from,
    date_to,
    amount_min,
    amount_max,
    sort_by,
    sort_order,
  } = filters;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string | number> = {};

      const filterValues = {
        page,
        limit,
        search,
        category,
        status,
        date_from,
        date_to,
        amount_min,
        amount_max,
        sort_by,
        sort_order,
      };

      Object.entries(filterValues).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          params[key] = value;
        }
      });

      const response = await api.get<TransactionListResponse>(
        "/api/transactions",
        {
          params,
        }
      );

      setData(response.data);
    } catch {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [
    page,
    limit,
    search,
    category,
    status,
    date_from,
    date_to,
    amount_min,
    amount_max,
    sort_by,
    sort_order,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}