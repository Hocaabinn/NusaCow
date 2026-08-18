import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { Vault, Component, TrendingUp, Users } from "lucide-react";

/* ─── Animated Number Counter ─────────────────────────────────────── */
function Counter({
  from,
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 2.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = `${prefix}${value.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, prefix, suffix, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {from.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ─── Stats Data ───────────────────────────────────────────────────── */
type StatItem = {
  id: number;
  label: string;
  displayValue?: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  isSimulatedYield?: boolean;
  icon: any;
};

const stats: StatItem[] = [
  {
    id: 1,
    label: "Target Modal ke Peternakan",
    displayValue: "Coming Soon",
    icon: Vault,
  },
  {
    id: 2,
    label: "Sapi Terverifikasi On-Chain",
    displayValue: "Coming Soon",
    icon: Component,
  },
  {
    id: 3,
    label: "Simulasi Hasil Tahunan*",
    numericValue: 12.5,
    prefix: "",
    suffix: "%",
    decimals: 1,
    isSimulatedYield: true,
    icon: TrendingUp,
  },
  {
    id: 4,
    label: "Target Mitra Peternakan",
    displayValue: "Coming Soon",
    icon: Users,
  },
];

/* ─── Main Component ───────────────────────────────────────────────── */
export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);

  /* scroll progress bound to this section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  /* parallax transforms */
  const badgeY  = useTransform(smoothProgress, [0, 1], ["-30px", "30px"]);
  const headingY = useTransform(smoothProgress, [0, 1], ["-20px", "20px"]);
  const bgCircle1Y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const bgCircle2Y = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 md:px-12 bg-[#F4F0E7] overflow-hidden"
    >
      {/* ── Decorative blobs (parallax) ─────────────────────────── */}
      <motion.div
        style={{ y: bgCircle1Y }}
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#6E8C68]/10 blur-[100px]"
      />
      <motion.div
        style={{ y: bgCircle2Y }}
        className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#D8CFBE]/40 blur-[80px]"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ── Section Header ────────────────────────────────────── */}
        <div className="text-center mb-16 overflow-hidden">
          <motion.span
            style={{ y: badgeY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs uppercase tracking-[0.25em] text-[#234A2C] mb-5 font-semibold
                       border border-[#234A2C]/25 rounded-full px-4 py-1.5 bg-[#234A2C]/5"
          >
            Protocol Overview
          </motion.span>

          <motion.h2
            style={{ y: headingY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-sans tracking-tight text-[#222222] leading-none"
          >
            Target{" "}
            <span className="font-serif italic text-[#234A2C]">Protokol</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-[#222222]/60 text-base max-w-lg mx-auto leading-relaxed"
          >
            Angka di bawah adalah target kami menuju peluncuran mainnet. Setelah live, akan diperbarui otomatis dari data on-chain.
          </motion.p>
        </div>

        {/* ── Stats Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -10,
                boxShadow: "0 24px 48px 0 rgba(35,74,44,0.12)",
                transition: { duration: 0.3 },
              }}
              className="group relative bg-white/60 backdrop-blur-xl border border-[#D8CFBE]
                         rounded-[28px] p-7 shadow-[0_6px_24px_0_rgba(35,74,44,0.05)]
                         flex flex-col items-center text-center overflow-hidden cursor-default"
            >
              {/* card glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                           bg-gradient-to-b from-[#6E8C68]/8 via-transparent to-transparent"
              />

              {/* icon */}
              <motion.div
                whileHover={{ rotate: 6, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative z-10 w-14 h-14 rounded-2xl bg-[#F4F0E7] border border-[#D8CFBE]/60
                           flex items-center justify-center mb-7 text-[#234A2C]"
              >
                <stat.icon size={24} strokeWidth={1.5} />
              </motion.div>

              {/* number / text */}
              <div className="relative z-10 mb-3 tracking-tight flex items-center justify-center min-h-[48px]">
                {stat.isSimulatedYield ? (
                  <span className="text-xl md:text-2xl font-semibold font-sans text-[#234A2C] bg-[#234A2C]/10 px-3.5 py-1 rounded-full border border-[#234A2C]/15">
                    {stat.numericValue !== undefined ? (
                      <Counter
                        from={0}
                        to={stat.numericValue}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    ) : (
                      stat.displayValue
                    )}
                  </span>
                ) : (
                  <span className="text-2xl md:text-3xl font-serif text-[#222222]">
                    {stat.displayValue}
                  </span>
                )}
              </div>

              {/* divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 + 0.4 }}
                className="w-8 h-px bg-[#D8CFBE] mb-4 origin-left"
              />

              {/* label */}
              <p className="relative z-10 text-sm font-medium text-[#222222]/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center text-xs text-[#222222]/50 italic">
          *Simulasi, bukan jaminan hasil investasi.
        </p>
      </div>
    </section>
  );
}
