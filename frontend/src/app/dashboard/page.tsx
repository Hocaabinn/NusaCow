import { formatCurrency, formatPercent } from "@/utils/formatters";

const stats = [
  { label: "Total Raised", value: formatCurrency(12400) },
  { label: "Shares Sold", value: "496 / 700" },
  { label: "Average APY", value: formatPercent(14.2) },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[32px] border border-white/30 bg-white/40 p-8 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-paddy/55">Farmer Console</p>
          <h1 className="mt-3 text-4xl font-display text-paddy">Campaign Overview</h1>
          <p className="mt-4 text-paddy/70">
            This page is the staging area for wallet-aware actions such as initializing cattle,
            monitoring funding progress, and pushing profit distribution to investors.
          </p>
          <div className="mt-8 space-y-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[24px] border border-[#143116]/10 bg-[#FFFDD0]/55 p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-paddy/55">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-paddy">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/30 bg-[#143116] p-8 text-cream shadow-[0_20px_60px_rgba(20,49,22,0.22)]">
          <p className="text-xs uppercase tracking-[0.3em] text-cream/60">Program Flow</p>
          <ol className="mt-6 space-y-6">
            <li>
              <h2 className="text-2xl font-semibold">1. Initialize Cow</h2>
              <p className="mt-2 text-cream/75">
                Farmer creates the cow account, vault, and asset metadata seed values.
              </p>
            </li>
            <li>
              <h2 className="text-2xl font-semibold">2. Invest in Cow</h2>
              <p className="mt-2 text-cream/75">
                Investor purchases shares and USDC moves into the campaign vault.
              </p>
            </li>
            <li>
              <h2 className="text-2xl font-semibold">3. Distribute Profit</h2>
              <p className="mt-2 text-cream/75">
                Farmer deposits realized profit back to the vault for downstream investor claims.
              </p>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
