"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CoinBalance } from "./CoinBalance";

const LINKS = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "▦",
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: "↗",
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: "◔",
  },
  {
    href: "/rewards",
    label: "Rewards",
    icon: "🎁",
  },
];

export function TopBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
        {/* Mobile left side */}
        <div className="flex items-center gap-3 sm:hidden">
          {/* Menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
          >
            <span className="text-xl leading-none">☰</span>
          </button>

          {/* Mobile logo */}
          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-lg shadow-sm">
              🪙
            </div>

            <span className="font-bold tracking-tight text-slate-900">
              Trac<span className="text-brand-600">Earnly</span>
            </span>
          </Link>
        </div>

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

      {/* Mobile navigation drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <aside className="relative flex h-full w-[280px] max-w-[85vw] flex-col bg-white shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-xl shadow-lg shadow-brand-600/20">
                  🪙
                </div>

                <div>
                  <p className="text-lg font-bold tracking-tight text-slate-900">
                    Trac<span className="text-brand-600">Earnly</span>
                  </p>

                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Track · Earn · Redeem
                  </p>
                </div>
              </Link>

              {/* Close */}
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* Navigation */}
            <div className="p-4">
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Menu
              </p>

              <nav className="space-y-1">
                {LINKS.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-brand-50 text-brand-700 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition ${
                          isActive
                            ? "bg-white text-brand-600 shadow-sm"
                            : "bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-slate-700"
                        }`}
                      >
                        {link.icon}
                      </span>

                      <span>{link.label}</span>

                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-600" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom card */}
            <div className="mt-auto p-4">
              <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-blue-50 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                  🪙
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  Earn while you spend
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Track successful payments and turn your coins into rewards.
                </p>

                <Link
                  href="/rewards"
                  onClick={closeMenu}
                  className="mt-3 inline-flex text-xs font-semibold text-brand-600 hover:text-brand-700"
                >
                  Explore rewards →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}