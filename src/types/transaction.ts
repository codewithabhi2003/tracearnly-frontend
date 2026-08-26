export interface Transaction {
  id: number;
  external_id: string;
  timestamp: string;
  merchant: string;
  category: string;
  amount: string;
  currency: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  payment_method: string;
  coins_earned: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface TransactionListResponse {
  data: Transaction[];
  pagination: PaginationMeta;
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  amount_min?: string;
  amount_max?: string;
  sort_by?: "timestamp" | "amount";
  sort_order?: "asc" | "desc";
}

export const CATEGORIES = [
  "Travel",
  "Shopping",
  "Utilities",
  "Food & Dining",
  "Health",
  "Education",
  "Entertainment",
  "Groceries",
  "Fuel",
  "Insurance",
  "Other",
];

export const STATUSES = [
  "SUCCESS",
  "FAILED",
  "PENDING",
] as const;

export interface CategoryBreakdown {
  category: string;
  total: string;
  count: number;
}

export interface MonthlyBreakdown {
  month: string;
  total: string;
  count: number;
}

export interface Summary {
  total_spending: string;
  transaction_count: number;
  successful_count: number;
  failed_count: number;
  pending_count: number;
  coin_balance: number;
  total_coins_earned: number;
  top_category: string | null;
  top_merchant: string | null;
}