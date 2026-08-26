"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reward } from "@/types/reward";

export function RewardCard({
  reward,
  balance,
  onRedeem,
}: {
  reward: Reward;
  balance: number;
  onRedeem: (reward: Reward) => void;
}) {
  const canAfford = balance >= reward.coin_cost;
  return (
    <Card className="p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-semibold">{reward.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{reward.description}</p>
        <p className="text-coin font-medium mt-3">🪙 {reward.coin_cost.toLocaleString()} coins</p>
      </div>
      <Button
        className="mt-4 w-full"
        disabled={!canAfford}
        onClick={() => onRedeem(reward)}
      >
        {canAfford ? "Redeem" : "Insufficient Balance"}
      </Button>
    </Card>
  );
}
