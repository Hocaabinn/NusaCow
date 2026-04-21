import Link from "next/link";

import { NusaCowInvestmentCard } from "@/components/NusaCowInvestmentCard";

const featuredCow = {
  imageUrl:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
  breed: "Bali",
  location: "Lombok Timur",
  weightKg: 286,
  pricePerShareUsd: 25,
  estimatedApy: 14.5,
  fundedPercent: 72,
};

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-white/40 bg-white/45 px-4 py-2 text-xs uppercase tracking-[0.3em] text-paddy/70">
            Real asset. Shared ownership. Onchain transparency.
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] text-paddy md:text-7xl">
              Invest in Indonesia&apos;s cattle economy, one verified cow at a time.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-paddy/75">
              NusaCow tokenizes livestock financing into transparent shares, pairing farmers,
              investors, and profit distribution flows through a Solana smart contract.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/listing"
              className="rounded-full bg-paddy px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-cream transition hover:bg-[#1B5D57]"
            >
              Explore Listing
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-paddy/15 bg-white/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-paddy"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <NusaCowInvestmentCard {...featuredCow} />
        </div>
      </section>

      <section className="grid gap-4 rounded-[32px] border border-white/30 bg-white/35 p-8 backdrop-blur-xl md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-paddy/55">Farmers</p>
          <h2 className="mt-3 text-3xl font-semibold text-paddy">Raise capital faster</h2>
          <p className="mt-2 text-paddy/70">
            Create cow listings, define share price, and monitor vault funding progress onchain.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-paddy/55">Investors</p>
          <h2 className="mt-3 text-3xl font-semibold text-paddy">Own fractional shares</h2>
          <p className="mt-2 text-paddy/70">
            Back real cattle assets with transparent allocation, funding milestones, and profit flows.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-paddy/55">Judges</p>
          <h2 className="mt-3 text-3xl font-semibold text-paddy">Understand the full stack</h2>
          <p className="mt-2 text-paddy/70">
            Anchor program, IDL sync, and Next.js UI are organized to demo product and protocol clearly.
          </p>
        </div>
      </section>
    </main>
  );
}
