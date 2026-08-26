"use client";

import { useState } from "react";
import { useRewards } from "@/hooks/useRewards";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { RewardCard } from "@/components/rewards/RewardCard";
import { RedeemModal } from "@/components/rewards/RedeemModal";
import { Reward } from "@/types/reward";
import { formatDate } from "@/lib/formatters";

export default function RewardsPage() {
  const { rewards, balance, redemptions, loading, redeem } = useRewards();
  const [selected, setSelected] = useState<Reward | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rewards</h1>
        <div className="text-lg font-semibold text-amber-700">🪙 {balance.toLocaleString()} Coins</div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((r) => (
          <RewardCard key={r.id} reward={r} balance={balance} onRedeem={setSelected} />
        ))}
      </div>

      <Card className="p-4">
        <h2 className="font-semibold mb-4">Redemption History</h2>
        {redemptions.length === 0 ? (
          <p className="text-sm text-slate-500">No redemptions yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase border-b border-slate-200">
                <th className="py-2">Reward</th>
                <th className="py-2">Coins Spent</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {redemptions.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-2">{r.reward_name}</td>
                  <td className="py-2">🪙 {r.coins_spent}</td>
                  <td className="py-2">{formatDate(r.created_at)}</td>
                  <td className="py-2">
                    <Badge className="bg-green-100 text-green-800">{r.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <RedeemModal
        reward={selected}
        balance={balance}
        onClose={() => setSelected(null)}
        onRedeem={redeem}
      />
    </div>
  );
}
