"use client";

import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTransactions } from "@/hooks/useTransactions";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { formatCurrency, formatDate, STATUS_COLORS } from "@/lib/formatters";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#0ea5e9", "#f59e0b", "#8b5cf6", "#ef4444", "#10b981", "#6366f1", "#ec4899", "#f97316", "#14b8a6", "#64748b", "#94a3b8"];

export default function DashboardPage() {
  const { categories, monthly, summary, loading } = useAnalytics();
  const { data: recentData } = useTransactions({ limit: 5, sort_by: "timestamp", sort_order: "desc" });

  if (loading || !summary) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  const kpis = [
    { label: "Total Spending", value: formatCurrency(summary.total_spending) },
    { label: "Transactions", value: summary.transaction_count.toLocaleString() },
    { label: "Successful", value: summary.successful_count.toLocaleString() },
    { label: "Failed", value: summary.failed_count.toLocaleString() },
    { label: "Coin Balance", value: `🪙 ${summary.coin_balance.toLocaleString()}` },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-4">
            <p className="text-xs text-slate-500 mb-1">{k.label}</p>
            <p className="text-lg font-semibold">{k.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="font-semibold mb-4">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={(entry) => entry.category}
                onClick={(entry) => {
                  window.location.href = `/transactions?category=${encodeURIComponent(entry.category)}`;
                }}
                cursor="pointer"
              >
                {categories.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold mb-4">Monthly Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Line type="monotone" dataKey="total" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Transactions</h2>
          <Link href="/transactions" className="text-sm text-brand-600 font-medium">
            View all →
          </Link>
        </div>
        <div className="space-y-2">
          {recentData?.data.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100">
              <div>
                <p className="text-sm font-medium">{t.merchant}</p>
                <p className="text-xs text-slate-500">{t.category} · {formatDate(t.timestamp)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={STATUS_COLORS[t.status]}>{t.status}</Badge>
                <span className="text-sm font-medium w-24 text-right">{formatCurrency(t.amount)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
