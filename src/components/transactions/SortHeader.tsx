"use client";

interface Props {
  label: string;
  sortKey: "timestamp" | "amount";
  currentSort: string;
  currentOrder: string;
  onSort: (key: "timestamp" | "amount") => void;
  align?: "left" | "right";
}

export function SortHeader({ label, sortKey, currentSort, currentOrder, onSort, align = "left" }: Props) {
  const active = currentSort === sortKey;
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none whitespace-nowrap ${
        align === "right" ? "text-right" : "text-left"
      }`}
      onClick={() => onSort(sortKey)}
    >
      {label} {active ? (currentOrder === "asc" ? "↑" : "↓") : ""}
    </th>
  );
}
