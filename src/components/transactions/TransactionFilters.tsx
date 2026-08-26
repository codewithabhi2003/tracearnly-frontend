"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CATEGORIES, STATUSES, TransactionFilters } from "@/types/transaction";

interface Props {
  filters: TransactionFilters;
  onChange: (filters: TransactionFilters) => void;
}

export function TransactionFiltersBar({ filters, onChange }: Props) {
  function update(patch: Partial<TransactionFilters>) {
    onChange({ ...filters, ...patch, page: 1 });
  }

  function clearAll() {
    onChange({ page: 1, limit: filters.limit, sort_by: "timestamp", sort_order: "desc" });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-end">
      <div className="col-span-2 lg:col-span-2">
        <Input
          label="Search"
          placeholder="Search merchant..."
          value={filters.search || ""}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>
      <Select
        label="Category"
        value={filters.category || ""}
        onChange={(e) => update({ category: e.target.value || undefined })}
      >
        <option value="">All</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Select
        label="Status"
        value={filters.status || ""}
        onChange={(e) => update({ status: e.target.value || undefined })}
      >
        <option value="">All</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>
      <Input
        label="Date From"
        type="date"
        value={filters.date_from || ""}
        onChange={(e) => update({ date_from: e.target.value || undefined })}
      />
      <Input
        label="Date To"
        type="date"
        value={filters.date_to || ""}
        onChange={(e) => update({ date_to: e.target.value || undefined })}
      />
      <div className="flex gap-2">
        <Input
          label="Min ₹"
          type="number"
          value={filters.amount_min || ""}
          onChange={(e) => update({ amount_min: e.target.value || undefined })}
        />
        <Input
          label="Max ₹"
          type="number"
          value={filters.amount_max || ""}
          onChange={(e) => update({ amount_max: e.target.value || undefined })}
        />
      </div>
      <Button variant="secondary" onClick={clearAll}>
        Clear All
      </Button>
    </div>
  );
}
