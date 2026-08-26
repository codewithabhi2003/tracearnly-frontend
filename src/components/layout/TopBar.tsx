"use client";

import { useAuth } from "@/context/AuthContext";
import { CoinBalance } from "./CoinBalance";
import { Button } from "@/components/ui/Button";

export function TopBar() {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <div className="sm:hidden font-bold">🏦 TracEarnly</div>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <CoinBalance />
        <span className="text-sm text-slate-600 hidden md:inline">{user?.name}</span>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
