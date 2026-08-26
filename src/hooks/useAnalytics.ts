"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CategoryBreakdown, MonthlyBreakdown, Summary } from "@/types/transaction";

export function useAnalytics() {
  const [categories, setCategories] = useState<CategoryBreakdown[]>([]);
  const [monthly, setMonthly] = useState<MonthlyBreakdown[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [c, m, s] = await Promise.all([
          api.get<CategoryBreakdown[]>("/api/analytics/categories"),
          api.get<MonthlyBreakdown[]>("/api/analytics/monthly"),
          api.get<Summary>("/api/analytics/summary"),
        ]);
        setCategories(c.data);
        setMonthly(m.data);
        setSummary(s.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { categories, monthly, summary, loading };
}
