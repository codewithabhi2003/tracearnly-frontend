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
  onRedeem: (rewardId: number) => Promise<{ new_balance: number }>;
}) {
  const [step, setStep] = useState<Step>("confirm");
  const [errorMsg, setErrorMsg] = useState("");
  const [newBalance, setNewBalance] = useState<number | null>(null);

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
      setErrorMsg(err.response?.data?.detail || "Something went wrong. Please try again.");
      setStep("error");
    }
  }

  return (
    <Modal isOpen={!!reward} onClose={handleClose} title="Redeem Reward">
      {reward && (
        <div className="space-y-4">
          {step === "confirm" && (
            <>
              <p>
                Redeem <strong>{reward.name}</strong> for <strong>{reward.coin_cost} coins</strong>?
              </p>
              <p className="text-sm text-slate-500">
                Current balance: {balance.toLocaleString()} coins → After: {(balance - reward.coin_cost).toLocaleString()} coins
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm}>Confirm Redeem</Button>
              </div>
            </>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center py-6 gap-3">
              <Spinner className="h-6 w-6" />
              <p className="text-sm text-slate-500">Processing your redemption...</p>
            </div>
          )}

          {step === "success" && (
            <>
              <p className="text-green-700">
                ✅ Redeemed! Your new balance: {newBalance?.toLocaleString()} 🪙
              </p>
              <div className="flex justify-end">
                <Button onClick={handleClose}>Close</Button>
              </div>
            </>
          )}

          {step === "error" && (
            <>
              <p className="text-red-600">❌ {errorMsg}</p>
              <p className="text-sm text-slate-500">Your balance has not changed.</p>
              <div className="flex gap-2 justify-end">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={() => setStep("confirm")}>Try Again</Button>
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
