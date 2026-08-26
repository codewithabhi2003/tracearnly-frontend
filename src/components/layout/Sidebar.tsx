"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white sm:block">
      <div className="sticky top-0 flex h-screen flex-col p-4">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="mb-8 flex items-center gap-3 rounded-xl px-2 py-2"
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

        {/* Navigation */}
        <div className="mb-3 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
        </div>

        <nav className="space-y-1">
          {LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-50 text-brand-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
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

        {/* Bottom card */}
        <div className="mt-auto">
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
              className="mt-3 inline-flex text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              Explore rewards →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}