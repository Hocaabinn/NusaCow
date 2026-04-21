"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type NusaCowInvestmentCardProps = {
  imageUrl: string;
  breed: string;
  location: string;
  weightKg: number;
  pricePerShareUsd: number;
  estimatedApy: number;
  fundedPercent: number;
  onInvest?: () => void;
  showSuccess?: boolean;
};

type GrainParticle = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  hue: "gold" | "wheat";
};

const confettiParticles: GrainParticle[] = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 17) % 88)}%`,
  top: `${2 + ((index * 11) % 28)}%`,
  size: 9 + (index % 5) * 3,
  duration: 2.4 + (index % 4) * 0.35,
  delay: (index % 6) * 0.08,
  rotate: index % 2 === 0 ? 22 : -28,
  hue: index % 3 === 0 ? "wheat" : "gold",
}));

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function CowMarker() {
  return (
    <div className="relative h-10 w-10">
      <div className="absolute inset-x-1 bottom-1 h-2 rounded-full bg-[#1A4314]/25 blur-sm" />
      <svg
        viewBox="0 0 64 64"
        className="relative h-10 w-10 drop-shadow-[0_8px_18px_rgba(26,67,20,0.28)]"
        aria-hidden="true"
      >
        <path
          d="M15 31c0-10 7-17 17-17h8c10 0 17 7 17 17v8c0 4-3 7-7 7H22c-4 0-7-3-7-7v-8Z"
          fill="#FFFDD0"
        />
        <path d="M18 25c-5-1-8-5-8-10l8 4 4-5 4 8" fill="#F0E68C" />
        <path d="M46 22l4-8 4 5 8-4c0 5-3 9-8 10" fill="#F0E68C" />
        <circle cx="25" cy="33" r="2.5" fill="#1A4314" />
        <circle cx="39" cy="33" r="2.5" fill="#1A4314" />
        <path
          d="M24 44v9M41 44v9M18 44v9M47 44v9"
          stroke="#6F8A4A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path d="M28 37c0 3 2 6 4 6s4-3 4-6v-1H28v1Z" fill="#F4C2C2" />
        <path
          d="M20 23c0-4 3-7 7-7h10c5 0 9 4 9 9"
          stroke="#1A4314"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function RicePaddyProgress({ fundedPercent }: { fundedPercent: number }) {
  const progress = clampPercent(fundedPercent);
  const markerLeft = `calc(${progress}% - 20px)`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-[#1A4314]/65">
        <span>Funding Journey</span>
        <span>{progress.toFixed(0)}%</span>
      </div>
      <div className="relative h-24 overflow-hidden rounded-[24px] border border-white/25 bg-[linear-gradient(135deg,rgba(255,253,208,0.2),rgba(240,230,140,0.12))] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_40%)]" />
        <div className="absolute inset-x-4 top-[30px] h-[12px] rounded-full bg-[#335A2D]/14" />
        <motion.div
          className="absolute left-4 top-[30px] h-[12px] rounded-full bg-[linear-gradient(90deg,#6F8A4A_0%,#A6BF5E_40%,#F0E68C_100%)] shadow-[0_0_18px_rgba(240,230,140,0.35)]"
          initial={{ width: 0 }}
          animate={{ width: `calc(${progress}% - 16px)` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-x-4 top-[18px] flex justify-between opacity-75">
          {[0, 1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="h-10 w-[18%] rounded-[999px] border border-[#FFFDD0]/35 bg-[#FFFDD0]/8"
            />
          ))}
        </div>
        <motion.div
          className="absolute top-[6px]"
          animate={{ left: markerLeft, y: [0, -3, 0] }}
          transition={{
            left: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <CowMarker />
        </motion.div>
      </div>
    </div>
  );
}

function SuccessHarvest({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{ left: particle.left, top: particle.top }}
              initial={{ opacity: 0, y: -8, scale: 0.7, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [0, 26, 76, 128],
                x: [0, particle.id % 2 === 0 ? 16 : -16, 8],
                rotate: [0, particle.rotate, particle.rotate * 2],
                scale: [0.7, 1, 1, 0.9],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            >
              {particle.hue === "gold" ? (
                <div
                  className="rounded-full bg-[#F0E68C] shadow-[0_0_14px_rgba(240,230,140,0.55)]"
                  style={{ width: particle.size, height: particle.size * 0.55 }}
                />
              ) : (
                <div
                  className="rounded-[999px] border border-[#FFFDD0]/70 bg-[#E6D39D]"
                  style={{ width: particle.size * 0.45, height: particle.size * 1.75 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function NusaCowInvestmentCard({
  imageUrl,
  breed,
  location,
  weightKg,
  pricePerShareUsd,
  estimatedApy,
  fundedPercent,
  onInvest,
  showSuccess = false,
}: NusaCowInvestmentCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 18, mass: 0.8 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 18, mass: 0.8 });
  const imageScale = useTransform(rotateY, [-6, 6], [1.02, 1.07]);
  const [successVisible, setSuccessVisible] = useState(showSuccess);

  useEffect(() => {
    setSuccessVisible(showSuccess);
    if (!showSuccess) {
      return;
    }

    const timeout = window.setTimeout(() => setSuccessVisible(false), 2800);
    return () => window.clearTimeout(timeout);
  }, [showSuccess]);

  const cardGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(20, 255, 210, 0.22), transparent 34%)`;

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;

    glowX.set(px * 100);
    glowY.set(py * 100);
    rotateYRaw.set((px - 0.5) * 8);
    rotateXRaw.set((0.5 - py) * 8);
  };

  const resetTilt = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetTilt}
      whileHover={shouldReduceMotion ? {} : { scale: 1.018 }}
      className="relative w-full max-w-[420px] overflow-hidden rounded-[32px] border border-white/20 bg-[linear-gradient(145deg,rgba(255,253,208,0.18),rgba(26,67,20,0.16))] p-4 text-[#143116] shadow-[0_24px_80px_rgba(18,40,24,0.24)] backdrop-blur-2xl"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: cardGlow }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.14),transparent_34%,rgba(20,255,210,0.08)_100%)]" />
      <SuccessHarvest visible={successVisible} />

      <div className="relative space-y-5">
        <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-[#1A4314]/18 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
          <motion.img
            src={imageUrl}
            alt={`${breed} cattle in ${location}`}
            className="h-[236px] w-full rounded-[20px] object-cover"
            style={{ scale: shouldReduceMotion ? 1.02 : imageScale }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-2 rounded-[20px] bg-[radial-gradient(circle_at_center,rgba(255,253,208,0.14),transparent_58%)]"
            animate={shouldReduceMotion ? {} : { opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#1A4314]/55 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[#FFFDD0] backdrop-blur-md">
            Live Growth
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#1A4314]/55">
                NusaCow Asset
              </p>
              <h3 className="font-serif text-[30px] leading-none text-[#143116]">
                {breed} Beef
              </h3>
            </div>
            <div className="rounded-full border border-[#14F9D5]/25 bg-[#14F9D5]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E7565]">
              Est. {estimatedApy.toFixed(1)}% APY
            </div>
          </div>
          <p className="text-sm text-[#1A4314]/70">
            {breed} Beef | {location} | {weightKg}kg
          </p>
        </div>

        <RicePaddyProgress fundedPercent={fundedPercent} />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[22px] border border-white/20 bg-white/18 p-4 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#1A4314]/55">
              Price / Share
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#143116]">
              {formatUsd(pricePerShareUsd)}
            </p>
          </div>
          <div className="rounded-[22px] border border-white/20 bg-white/18 p-4 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#1A4314]/55">
              Growth Signal
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#143116]">
              {fundedPercent >= 100 ? "Funded" : "Raising"}
            </p>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={onInvest}
          whileTap={{ scale: 0.985 }}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  boxShadow: "0 0 0 1px rgba(20, 249, 213, 0.5), 0 18px 36px rgba(20, 249, 213, 0.24)",
                  y: -1,
                }
          }
          className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-[22px] border border-[#14F9D5]/35 bg-[linear-gradient(135deg,#143116_0%,#1A4314_45%,#1B5D57_100%)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#F5FFF7]"
        >
          <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(20,249,213,0.26),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative">Invest in NusaCow</span>
        </motion.button>
      </div>
    </motion.article>
  );
}

export default NusaCowInvestmentCard;
