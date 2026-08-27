"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTransactions } from "@/hooks/useTransactions";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import {
  formatCurrency,
  formatDate,
  STATUS_COLORS,
} from "@/lib/formatters";

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

export default function DashboardPage() {
  const router = useRouter();

  const {
    categories,
    monthly,
    summary,
    loading,
  } = useAnalytics();

  const { data: recentData } = useTransactions({
    limit: 5,
    sort_by: "timestamp",
    sort_order: "desc",
  });

  if (loading || !summary) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="h-8 w-8" />

          <p className="text-sm text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  /*
   * The backend returns Decimal values as strings.
   * Recharts needs numeric values, so convert them here.
   */
  const categoryChartData = categories.map((item) => ({
    ...item,
    total: Number(item.total),
  }));

  const monthlyChartData = monthly.map((item) => ({
    ...item,
    total: Number(item.total),
  }));

  const kpis = [
    {
      label: "Total Spending",
      value: formatCurrency(summary.total_spending),
      icon: "₹",
      description: "Across all transactions",
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      label: "Transactions",
      value: summary.transaction_count.toLocaleString("en-IN"),
      icon: "↗",
      description: "Total recorded",
      iconClass: "bg-violet-50 text-violet-600",
    },
    {
      label: "Successful",
      value: summary.successful_count.toLocaleString("en-IN"),
      icon: "✓",
      description: "Completed payments",
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Failed",
      value: summary.failed_count.toLocaleString("en-IN"),
      icon: "!",
      description: "Failed payments",
      iconClass: "bg-red-50 text-red-600",
    },
    {
      label: "Coin Balance",
      value: summary.coin_balance.toLocaleString("en-IN"),
      icon: "🪙",
      description: "Available to redeem",
      iconClass: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-brand-600">
            Overview
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s a quick look at your spending and rewards.
          </p>
        </div>

        <Link
          href="/transactions"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          View transactions
          <span>→</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi) => (
          <Card
            key={kpi.label}
            className="group relative overflow-hidden border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${kpi.iconClass}`}
              >
                {kpi.icon}
              </div>

              {kpi.label === "Coin Balance" && (
                <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                  Rewards
                </span>
              )}
            </div>

            <p className="mt-5 text-xs font-medium text-slate-500">
              {kpi.label}
            </p>

            <p className="mt-1 truncate text-xl font-bold tracking-tight text-slate-900">
              {kpi.value}

              {kpi.label === "Coin Balance" && (
                <span className="ml-1 text-sm font-medium text-amber-600">
                  coins
                </span>
              )}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {kpi.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Spending by Category */}
        <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Spending by Category
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Where your money is going
              </p>
            </div>

            <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
              All time
            </span>
          </div>

          <div className="p-5">
            {categoryChartData.length === 0 ? (
              <div className="flex h-[280px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                    📊
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No category data available
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Spending data will appear here once available.
                  </p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={92}
                    paddingAngle={2}
                    labelLine={false}
                    onClick={(entry) => {
                      if (entry?.category) {
                        router.push(
                          `/transactions?category=${encodeURIComponent(
                            entry.category
                          )}`
                        );
                      }
                    }}
                    cursor="pointer"
                  >
                    {categoryChartData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>

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
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* Monthly Spending */}
        <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Monthly Spending
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your spending trend over time
              </p>
            </div>

            <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
              Trend
            </span>
          </div>

          <div className="p-5">
            {monthlyChartData.length === 0 ? (
              <div className="flex h-[280px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                    📈
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No monthly data available
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Your spending trend will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={monthlyChartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
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
                      `₹${(Number(value) / 1000).toFixed(0)}k`
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
      </div>

      {/* Reward Highlight */}
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 p-0 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">🪙</span>

              <span className="text-xs font-semibold uppercase tracking-wider text-brand-200">
                Rewards balance
              </span>
            </div>

            <p className="text-3xl font-bold tracking-tight">
              {summary.coin_balance.toLocaleString("en-IN")}

              <span className="ml-2 text-base font-medium text-slate-300">
                coins
              </span>
            </p>

            <p className="mt-1 text-sm text-slate-400">
              You have coins ready to redeem for rewards.
            </p>
          </div>

          <Link
            href="/rewards"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
          >
            Explore Rewards
            <span>→</span>
          </Link>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Transactions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your latest payment activity
            </p>
          </div>

          <Link
            href="/transactions"
            className="text-sm font-semibold text-brand-600 transition hover:text-brand-700"
          >
            View all →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {!recentData?.data.length ? (
            <div className="px-5 py-10 text-center text-sm text-slate-500">
              No transactions found.
            </div>
          ) : (
            recentData.data.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                    {transaction.merchant
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {transaction.merchant}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {transaction.category} ·{" "}
                      {formatDate(transaction.timestamp)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <Badge
                    className={
                      STATUS_COLORS[transaction.status]
                    }
                  >
                    {transaction.status}
                  </Badge>

                  <span className="w-24 text-right text-sm font-bold text-slate-900">
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}