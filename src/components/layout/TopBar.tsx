"use client";

import Link from "next/link";
import { CoinBalance } from "./CoinBalance";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Mobile logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 sm:hidden"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-lg shadow-sm">
          🪙
        </div>

        <span className="font-bold tracking-tight text-slate-900">
          Trac<span className="text-brand-600">Earnly</span>
        </span>
      </Link>

      {/* Desktop spacing */}
      <div className="hidden flex-1 sm:block" />

      {/* Right side */}
      <div className="flex items-center gap-3">
        <CoinBalance />

        <div className="hidden h-8 w-px bg-slate-200 md:block" />

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
            D
          </div>

          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-800">
              Demo User
            </p>
            <p className="text-[11px] text-slate-400">
              Account
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}