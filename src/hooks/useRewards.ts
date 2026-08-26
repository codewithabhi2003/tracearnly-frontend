"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { Reward, Redemption, RedeemResponse } from "@/types/reward";

export function useRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const [r, b, h] = await Promise.all([
        api.get<Reward[]>("/api/rewards"),
        api.get<{ balance: number }>("/api/rewards/balance"),
        api.get<Redemption[]>("/api/rewards/redemptions"),
      ]);
      setRewards(r.data);
      setBalance(b.data.balance);
      setRedemptions(h.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function redeem(rewardId: number): Promise<RedeemResponse> {
    // No optimistic update — balance only updates after a confirmed response.
    const res = await api.post<RedeemResponse>("/api/rewards/redeem", { reward_id: rewardId });
    setBalance(res.data.new_balance);
    await refetch();
    return res.data;
  }

  return { rewards, balance, redemptions, loading, redeem, refetch };
}
