export function formatCurrency(amount: string | number): string {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const STATUS_COLORS: Record<string, string> = {
  SUCCESS: "bg-green-100 text-green-800 border border-green-200",
  FAILED: "bg-red-100 text-red-800 border border-red-200",
  PENDING: "bg-amber-100 text-amber-800 border border-amber-200",
};

export const CATEGORY_COLORS: Record<string, string> = {
  Shopping: "bg-purple-100 text-purple-800",
  "Food & Dining": "bg-orange-100 text-orange-800",
  Travel: "bg-blue-100 text-blue-800",
  Health: "bg-pink-100 text-pink-800",
  Education: "bg-indigo-100 text-indigo-800",
  Fuel: "bg-yellow-100 text-yellow-800",
  Entertainment: "bg-red-100 text-red-800",
  Groceries: "bg-green-100 text-green-800",
  Utilities: "bg-gray-100 text-gray-800",
  Insurance: "bg-cyan-100 text-cyan-800",
  Other: "bg-slate-100 text-slate-800",
};
