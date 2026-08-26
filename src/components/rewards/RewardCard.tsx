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
  const remainingBalance = balance - reward.coin_cost;

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-slate-200/80 bg-white p-0 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Reward header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-blue-50 p-6">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-200/30 blur-2xl" />

        <div className="relative flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
            🎁
          </div>

          <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-700 shadow-sm">
            Reward
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-900">
            {reward.name}
          </h3>

          <p className="mt-2 min-h-[40px] text-sm leading-5 text-slate-500">
            {reward.description || "A valuable reward for your earned coins."}
          </p>

          {/* Cost */}
          <div className="mt-5 flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-3">
            <span className="text-xs font-medium text-amber-700">
              Redemption cost
            </span>

            <span className="font-bold text-amber-800">
              🪙 {reward.coin_cost.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Balance info */}
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Your balance
            </span>

            <span
              className={
                canAfford
                  ? "font-semibold text-slate-700"
                  : "font-semibold text-red-600"
              }
            >
              {balance.toLocaleString("en-IN")} coins
            </span>
          </div>
        </div>

        {/* Action */}
        <Button
          className="mt-5 w-full"
          disabled={!canAfford}
          onClick={() => onRedeem(reward)}
        >
          {canAfford ? (
            <>
              Redeem Reward
              <span className="ml-1">→</span>
            </>
          ) : (
            "Insufficient Balance"
          )}
        </Button>

        {canAfford && (
          <p className="mt-2 text-center text-[11px] text-slate-400">
            Balance after redemption:{" "}
            {remainingBalance.toLocaleString("en-IN")} coins
          </p>
        )}
      </div>
    </Card>
  );
}