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

const COLORS = [
  "#0ea5e9",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#6366f1",
  "#ec4899",
  "#f97316",
  "#14b8a6",
  "#64748b",
  "#94a3b8",
];

export default function AnalyticsPage() {
  const { categories, monthly, summary, loading } = useAnalytics();
  const router = useRouter();

  if (loading || !summary) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="h-8 w-8" />
          <p className="text-sm text-slate-500">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Top Category",
      value: summary.top_category || "—",
      icon: "📊",
      description: "Highest spending category",
      className: "bg-blue-50 text-blue-600",
    },
    {
      label: "Top Merchant",
      value: summary.top_merchant || "—",
      icon: "🏪",
      description: "Most frequent merchant",
      className: "bg-violet-50 text-violet-600",
    },
    {
      label: "Transactions Analyzed",
      value: summary.transaction_count.toLocaleString(),
      icon: "↗",
      description: "Across all recorded activity",
      className: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="mb-1 text-sm font-medium text-brand-600">
          Insights
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Analytics
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Understand where your money goes and discover patterns
          across your spending activity.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className="border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${stat.className}`}
              >
                {stat.icon}
              </div>
            </div>

            <p className="mt-5 text-xs font-medium text-slate-500">
              {stat.label}
            </p>

            <p className="mt-1 truncate text-xl font-bold text-slate-900">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {stat.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Category analysis */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Spending by Category
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Click a bar to view transactions from that category.
            </p>
          </div>

          <span className="w-fit rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
            {categories.length} categories
          </span>
        </div>

        <div className="p-5">
          {categories.length === 0 ? (
            <div className="flex h-[320px] items-center justify-center text-sm text-slate-500">
              No category data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={340}>
              <BarChart
                data={categories}
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 45,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />

                <XAxis
                  dataKey="category"
                  fontSize={11}
                  angle={-30}
                  textAnchor="end"
                  height={70}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b" }}
                />

                <YAxis
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b" }}
                  tickFormatter={(value) =>
                    `₹${Number(value) / 1000}k`
                  }
                />

                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  formatter={(value) =>
                    formatCurrency(String(value))
                  }
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 10px 30px rgba(15, 23, 42, 0.08)",
                  }}
                />

                <Bar
                  dataKey="total"
                  radius={[6, 6, 0, 0]}
                  cursor="pointer"
                  onClick={(entry) => {
                    router.push(
                      `/transactions?category=${encodeURIComponent(
                        entry.category
                      )}`
                    );
                  }}
                >
                  {categories.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Monthly trend */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Monthly Spending Trend
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Track how your spending changes over time.
            </p>
          </div>

          <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
            Monthly
          </span>
        </div>

        <div className="p-5">
          {monthly.length === 0 ? (
            <div className="flex h-[340px] items-center justify-center text-sm text-slate-500">
              No monthly data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={340}>
              <LineChart
                data={monthly}
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b" }}
                />

                <YAxis
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b" }}
                  tickFormatter={(value) =>
                    `₹${Number(value) / 1000}k`
                  }
                />

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(String(value))
                  }
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 10px 30px rgba(15, 23, 42, 0.08)",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    strokeWidth: 2,
                    fill: "#ffffff",
                  }}
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Spending overview */}
      <Card className="border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-200">
              Spending overview
            </p>

            <p className="mt-2 text-3xl font-bold">
              {formatCurrency(summary.total_spending)}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Total spending across{" "}
              {summary.transaction_count.toLocaleString()} transactions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <p className="text-xs text-slate-400">
                Successful
              </p>
              <p className="mt-1 text-lg font-bold">
                {summary.successful_count.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-3">
              <p className="text-xs text-slate-400">
                Failed
              </p>
              <p className="mt-1 text-lg font-bold">
                {summary.failed_count.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}