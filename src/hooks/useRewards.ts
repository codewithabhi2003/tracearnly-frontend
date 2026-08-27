"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import {
  Reward,
  Redemption,
  RedeemResponse,
} from "@/types/reward";

export function useRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);

    try {
      const [rewardsResponse, balanceResponse, historyResponse] =
        await Promise.all([
          api.get<Reward[]>("/api/rewards"),
          api.get<{ balance: number }>("/api/rewards/balance"),
          api.get<Redemption[]>("/api/rewards/redemptions"),
        ]);

      setRewards(rewardsResponse.data);
      setBalance(balanceResponse.data.balance);
      setRedemptions(historyResponse.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRewards() {
      try {
        const [rewardsResponse, balanceResponse, historyResponse] =
          await Promise.all([
            api.get<Reward[]>("/api/rewards"),
            api.get<{ balance: number }>("/api/rewards/balance"),
            api.get<Redemption[]>("/api/rewards/redemptions"),
          ]);

        if (cancelled) return;

        setRewards(rewardsResponse.data);
        setBalance(balanceResponse.data.balance);
        setRedemptions(historyResponse.data);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRewards();

    return () => {
      cancelled = true;
    };
  }, []);

  async function redeem(
    rewardId: number
  ): Promise<RedeemResponse> {
    const response = await api.post<RedeemResponse>(
      "/api/rewards/redeem",
      {
        reward_id: rewardId,
      }
    );

    setBalance(response.data.new_balance);

    await refetch();

    return response.data;
  }

  return {
    rewards,
    balance,
    redemptions,
    loading,
    redeem,
    refetch,
  };
}
