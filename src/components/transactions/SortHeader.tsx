"use client";

interface Props {
  label: string;
  sortKey: "timestamp" | "amount";
  currentSort: string;
  currentOrder: string;
  onSort: (key: "timestamp" | "amount") => void;
  align?: "left" | "right";
}

export function SortHeader({
  label,
  sortKey,
  currentSort,
  currentOrder,
  onSort,
  align = "left",
}: Props) {
  const active = currentSort === sortKey;

  return (
    <th
      scope="col"
      className={`group cursor-pointer select-none whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 ${
        align === "right" ? "text-right" : "text-left"
      }`}
      onClick={() => onSort(sortKey)}
      aria-sort={
        active
          ? currentOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      <span
        className={`inline-flex items-center gap-1.5 ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        {label}

        <span
          className={`text-sm transition ${
            active
              ? "font-bold text-brand-600"
              : "text-slate-300 group-hover:text-slate-500"
          }`}
        >
          {active
            ? currentOrder === "asc"
              ? "↑"
              : "↓"
            : "↕"}
        </span>
      </span>
    </th>
  );
}