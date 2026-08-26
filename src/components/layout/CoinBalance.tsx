"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function CoinBalance({
  refreshKey,
}: {
  refreshKey?: number;
}) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<{ balance: number }>("/api/rewards/balance")
      .then((res) => setBalance(res.data.balance))
      .catch(() => setBalance(null));
  }, [refreshKey]);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800 shadow-sm">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
        🪙
      </span>

      <div className="leading-tight">
        <p className="text-[10px] font-medium uppercase tracking-wide text-amber-600">
          Balance
        </p>

        <p>
          {balance === null
            ? "—"
            : balance.toLocaleString("en-IN")}{" "}
          <span className="font-medium">Coins</span>
        </p>
      </div>
    </div>
  );
}
