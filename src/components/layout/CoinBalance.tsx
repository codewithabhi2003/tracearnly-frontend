"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function CoinBalance({ refreshKey }: { refreshKey?: number }) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<{ balance: number }>("/api/rewards/balance")
      .then((res) => setBalance(res.data.balance))
      .catch(() => setBalance(null));
  }, [refreshKey]);

  return (
    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 text-sm font-medium text-amber-800">
      <span>🪙</span>
      <span>{balance === null ? "—" : balance.toLocaleString("en-IN")} Coins</span>
    </div>
  );
}
