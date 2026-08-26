import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold tracking-tight"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-xl shadow-lg shadow-brand-600/20">
              🪙
            </div>
            <span className="text-xl text-slate-900">
              Trac<span className="text-brand-600">Earnly</span>
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Open Dashboard
          </Link>
        </header>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-center justify-center py-20 text-center lg:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-sm font-medium text-brand-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Smart spending, smarter rewards
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Track your spending.
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
              Earn more from it.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            TracEarnly helps you understand your spending, earn coins from
            successful transactions, and turn those coins into meaningful
            rewards.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Explore Dashboard
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/transactions"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              View Transactions
            </Link>
          </div>

          {/* Dashboard preview */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                      Your rewards balance
                    </p>
                    <p className="mt-1 text-left text-3xl font-bold text-slate-900">
                      602,945
                      <span className="ml-2 text-base font-medium text-brand-600">
                        coins
                      </span>
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-2xl">
                    🪙
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-100 bg-white p-4 text-left">
                    <div className="mb-3 text-xl">📊</div>
                    <p className="text-xs text-slate-400">Transactions</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      10,000
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-4 text-left">
                    <div className="mb-3 text-xl">💰</div>
                    <p className="text-xs text-slate-400">Total Spending</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      ₹12.4L
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-4 text-left">
                    <div className="mb-3 text-xl">🎁</div>
                    <p className="text-xs text-slate-400">Rewards</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      Ready to redeem
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-slate-200/80 py-12">
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
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 py-6 text-sm text-slate-500 sm:flex-row">
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
    <div className="group rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl transition group-hover:scale-105">
        {icon}
      </div>

      <h2 className="text-base font-bold text-slate-900">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}