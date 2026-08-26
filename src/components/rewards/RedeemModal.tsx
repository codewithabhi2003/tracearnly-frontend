"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Reward } from "@/types/reward";

type Step = "confirm" | "loading" | "success" | "error";

export function RedeemModal({
  reward,
  balance,
  onClose,
  onRedeem,
}: {
  reward: Reward | null;
  balance: number;
  onClose: () => void;
  onRedeem: (
    rewardId: number
  ) => Promise<{ new_balance: number }>;
}) {
  const [step, setStep] = useState<Step>("confirm");
  const [errorMsg, setErrorMsg] = useState("");
  const [newBalance, setNewBalance] =
    useState<number | null>(null);

  function handleClose() {
    setStep("confirm");
    setErrorMsg("");
    setNewBalance(null);
    onClose();
  }

  async function handleConfirm() {
    if (!reward) return;

    setStep("loading");

    try {
      const result = await onRedeem(reward.id);

      setNewBalance(result.new_balance);
      setStep("success");
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.detail ||
          "Something went wrong. Please try again."
      );

      setStep("error");
    }
  }

  const remainingBalance = balance - (reward?.coin_cost ?? 0);

  return (
    <Modal
      isOpen={!!reward}
      onClose={handleClose}
      title={
        step === "success"
          ? "Reward Redeemed"
          : step === "error"
            ? "Redemption Failed"
            : "Redeem Reward"
      }
    >
      {reward && (
        <div className="space-y-5">
          {/* Confirmation */}
          {step === "confirm" && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    🎁
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Reward
                    </p>

                    <h3 className="mt-1 font-semibold text-slate-900">
                      {reward.name}
                    </h3>

                    {reward.description && (
                      <p className="mt-1 text-sm text-slate-500">
                        {reward.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-800">
                    Cost
                  </span>

                  <span className="font-bold text-amber-900">
                    🪙{" "}
                    {reward.coin_cost.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="my-3 border-t border-amber-200" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-800">
                    Current balance
                  </span>

                  <span className="font-semibold text-amber-900">
                    {balance.toLocaleString("en-IN")} coins
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-amber-800">
                    Balance after redemption
                  </span>

                  <span className="font-semibold text-amber-900">
                    {Math.max(
                      0,
                      remainingBalance
                    ).toLocaleString("en-IN")}{" "}
                    coins
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-500">
                Are you sure you want to redeem this reward?
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button onClick={handleConfirm}>
                  Confirm Redeem
                </Button>
              </div>
            </>
          )}

          {/* Loading */}
          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                <Spinner className="h-7 w-7" />
              </div>

              <h3 className="mt-5 font-semibold text-slate-900">
                Processing redemption
              </h3>

              <p className="mt-1 text-center text-sm text-slate-500">
                Please wait while we process your reward.
              </p>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">
                ✓
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Reward redeemed!
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Your reward has been successfully redeemed.
              </p>

              <div className="mt-5 w-full rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                  New coin balance
                </p>

                <p className="mt-1 text-2xl font-bold text-emerald-800">
                  🪙{" "}
                  {newBalance?.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mt-5 flex w-full justify-end">
                <Button onClick={handleClose}>
                  Done
                </Button>
              </div>
            </div>
          )}

          {/* Error */}
          {step === "error" && (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
                !
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Redemption failed
              </h3>

              <p className="mt-2 text-sm text-red-600">
                {errorMsg}
              </p>

              <div className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Your coin balance has not changed.
                </p>
              </div>

              <div className="mt-5 flex w-full justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={handleClose}
                >
                  Close
                </Button>

                <Button
                  onClick={() => {
                    setErrorMsg("");
                    setStep("confirm");
                  }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}