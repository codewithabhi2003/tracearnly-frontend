"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  CATEGORIES,
  STATUSES,
  TransactionFilters as TransactionFiltersType,
} from "@/types/transaction";

interface Props {
  filters: TransactionFiltersType;
  onChange: (filters: TransactionFiltersType) => void;
}

export function TransactionFiltersBar({
  filters,
  onChange,
}: Props) {
  function update(patch: Partial<TransactionFiltersType>) {
    onChange({
      ...filters,
      ...patch,
      page: 1,
    });
  }

  function clearAll() {
    onChange({
      page: 1,
      limit: filters.limit,
      sort_by: "timestamp",
      sort_order: "desc",
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Filter Transactions
          </h2>

          <p className="mt-1 hidden text-xs text-slate-500 sm:block">
            Search and narrow down your transaction history.
          </p>
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="shrink-0 text-xs font-semibold text-brand-600 transition hover:text-brand-700 sm:text-sm"
        >
          Reset filters
        </button>
      </div>

      {/* Filters */}
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-5 lg:grid-cols-4">
        {/* Search */}
        <div className="sm:col-span-2">
          <Input
            label="Search merchant"
            placeholder="Search by merchant name..."
            value={filters.search || ""}
            onChange={(e) =>
              update({
                search: e.target.value,
              })
            }
          />
        </div>

        {/* Category */}
        <Select
          label="Category"
          value={filters.category || ""}
          onChange={(e) =>
            update({
              category: e.target.value || undefined,
            })
          }
        >
          <option value="">All categories</option>

          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        {/* Status */}
        <Select
          label="Status"
          value={filters.status || ""}
          onChange={(e) =>
            update({
              status: e.target.value || undefined,
            })
          }
        >
          <option value="">All statuses</option>

          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>

        {/* Dates */}
        <Input
          label="Date from"
          type="date"
          value={filters.date_from || ""}
          onChange={(e) =>
            update({
              date_from: e.target.value || undefined,
            })
          }
        />

        <Input
          label="Date to"
          type="date"
          value={filters.date_to || ""}
          onChange={(e) =>
            update({
              date_to: e.target.value || undefined,
            })
          }
        />

        {/* Amount */}
        <div className="sm:col-span-2">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Minimum amount"
              type="number"
              min="0"
              placeholder="₹0"
              value={filters.amount_min || ""}
              onChange={(e) =>
                update({
                  amount_min: e.target.value || undefined,
                })
              }
            />

            <Input
              label="Maximum amount"
              type="number"
              min="0"
              placeholder="₹0"
              value={filters.amount_max || ""}
              onChange={(e) =>
                update({
                  amount_max: e.target.value || undefined,
                })
              }
            />
          </div>
        </div>

        {/* Clear */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Button
            variant="secondary"
            onClick={clearAll}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
}