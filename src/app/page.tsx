import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-b from-brand-50 to-white">
      <div className="text-5xl mb-4">🏦</div>
      <h1 className="text-4xl font-bold mb-2">TracEarnly</h1>
      <p className="text-xl text-brand-700 font-medium mb-4">Track. Earn. Redeem.</p>
      <p className="text-slate-600 max-w-md mb-8">
        Your smart spending companion — track transactions, earn coins, and redeem rewards.
      </p>
      <div className="flex gap-3">
        <Link href="/login" className="px-5 py-2.5 rounded-md border border-slate-300 bg-white font-medium">
          Login
        </Link>
        <Link href="/register" className="px-5 py-2.5 rounded-md bg-brand-600 text-white font-medium">
          Get Started →
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mt-16 max-w-3xl">
        <div className="p-4">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold mb-1">Track Spending</h3>
          <p className="text-sm text-slate-600">See all transactions in one place</p>
        </div>
        <div className="p-4">
          <div className="text-2xl mb-2">🪙</div>
          <h3 className="font-semibold mb-1">Earn Coins</h3>
          <p className="text-sm text-slate-600">Get 1 coin per ₹100 on successful payments</p>
        </div>
        <div className="p-4">
          <div className="text-2xl mb-2">🎁</div>
          <h3 className="font-semibold mb-1">Redeem Rewards</h3>
          <p className="text-sm text-slate-600">Exchange coins for vouchers and cashback</p>
        </div>
      </div>
    </div>
  );
}
