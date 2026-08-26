"use client";

import { useRouter } from "next/navigation";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { formatCurrency } from "@/lib/formatters";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";

const COLORS = ["#0ea5e9", "#f59e0b", "#8b5cf6", "#ef4444", "#10b981", "#6366f1", "#ec4899", "#f97316", "#14b8a6", "#64748b", "#94a3b8"];

export default function AnalyticsPage() {
  const { categories, monthly, summary, loading } = useAnalytics();
  const router = useRouter();

  if (loading || !summary) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <Card className="p-4">
        <h2 className="font-semibold mb-4">Spending by Category (click a bar to filter transactions)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={categories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" fontSize={11} angle={-30} textAnchor="end" height={80} />
            <YAxis fontSize={12} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} />
            <Bar
              dataKey="total"
              cursor="pointer"
              onClick={(entry: any) => router.push(`/transactions?category=${encodeURIComponent(entry.category)}`)}
            >
              {categories.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h2 className="font-semibold mb-4">Monthly Trend</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} />
            <Line type="monotone" dataKey="total" stroke="#0ea5e9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500">Top Category</p>
          <p className="text-lg font-semibold">{summary.top_category || "—"}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500">Top Merchant</p>
          <p className="text-lg font-semibold">{summary.top_merchant || "—"}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500">Total Transactions Analyzed</p>
          <p className="text-lg font-semibold">{summary.transaction_count.toLocaleString()}</p>
        </Card>
      </div>
    </div>
  );
}
