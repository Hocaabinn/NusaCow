import { NusaCowInvestmentCard } from "@/components/NusaCowInvestmentCard";

const cows = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80",
    breed: "Limousin",
    location: "Sumbawa",
    weightKg: 301,
    pricePerShareUsd: 28,
    estimatedApy: 15.2,
    fundedPercent: 81,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?auto=format&fit=crop&w=1200&q=80",
    breed: "Brahman Cross",
    location: "Kupang",
    weightKg: 334,
    pricePerShareUsd: 30,
    estimatedApy: 13.7,
    fundedPercent: 54,
  },
];

export default function ListingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-paddy/55">Marketplace</p>
          <h1 className="mt-3 text-4xl font-display text-paddy">Active Cow Listings</h1>
        </div>
        <p className="max-w-xl text-right text-paddy/70">
          Each card represents a fundraising livestock asset ready to receive fractional investment.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {cows.map((cow) => (
          <NusaCowInvestmentCard key={`${cow.breed}-${cow.location}`} {...cow} />
        ))}
      </div>
    </main>
  );
}
