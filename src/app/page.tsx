import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background: ledger grid + coin-glow lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black_35%,transparent_100%)]" />
        <div className="absolute left-1/4 top-[-6rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[120px] animate-pulse [animation-duration:6s]" />
        <div className="absolute right-[-4rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-[120px] animate-pulse [animation-duration:8s]" />
        <div className="absolute bottom-[-8rem] left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold tracking-tight"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-xl shadow-lg shadow-brand-600/40">
              🪙
            </div>
            <span className="text-xl text-white">
              Trac<span className="text-brand-400">Earnly</span>
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
          >
            Open Dashboard
          </Link>
        </header>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-center justify-center py-20 text-center lg:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 shadow-sm backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Smart spending, smarter rewards
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Track your spending.
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent">
              Earn more from it.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            TracEarnly helps you understand your spending, earn coins from
            successful transactions, and turn those coins into meaningful
            rewards.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:-translate-y-0.5 hover:bg-brand-500"
            >
              Explore Dashboard
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/transactions"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur transition hover:border-white/25 hover:bg-white/10"
            >
              View Transactions
            </Link>
          </div>

          {/* Dashboard preview */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Your rewards balance
                    </p>
                    <p className="mt-1 text-left text-3xl font-bold text-white">
                      602,945
                      <span className="ml-2 text-base font-medium text-brand-400">
                        coins
                      </span>
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-2xl ring-1 ring-brand-500/20">
                    🪙
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
                    <div className="mb-3 text-xl">📊</div>
                    <p className="text-xs text-slate-500">Transactions</p>
                    <p className="mt-1 text-lg font-bold text-white">
                      10,000
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
                    <div className="mb-3 text-xl">💰</div>
                    <p className="text-xs text-slate-500">Total Spending</p>
                    <p className="mt-1 text-lg font-bold text-white">
                      ₹12.4L
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
                    <div className="mb-3 text-xl">🎁</div>
                    <p className="text-xs text-slate-500">Rewards</p>
                    <p className="mt-1 text-lg font-bold text-white">
                      Ready to redeem
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/10 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              icon="📊"
              title="Track Spending"
              description="Explore transactions with powerful filtering, sorting, and spending insights."
            />

            <Feature
              icon="🪙"
              title="Earn Coins"
              description="Earn coins automatically from successful payments and watch your balance grow."
            />

            <Feature
              icon="🎁"
              title="Redeem Rewards"
              description="Turn your earned coins into vouchers and other useful rewards."
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-slate-500 sm:flex-row">
          <p>© 2026 TracEarnly</p>
          <p>Track. Earn. Redeem.</p>
        </footer>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-sm transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/40">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-xl ring-1 ring-brand-500/20 transition group-hover:scale-105">
        {icon}
      </div>

      <h2 className="text-base font-bold text-white">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}