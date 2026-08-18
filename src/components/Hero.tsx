import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import profileCow from '../image/Profile_cow.png';
import cow1 from '../image/Cow1.png';
import cow2 from '../image/Cow2.png';
import cow3 from '../image/Cow3.png';
import cow4 from '../image/Cow4.png';
import cow5 from '../image/Cow5.png';
import cow6 from '../image/Cow6.png';
import cow7 from '../image/Cow7.png';

const getSrc = (img: any): string => (typeof img === 'string' ? img : img?.src || (img as string));

const heroSlides = [
  {
    id: 1,
    image: cow6,
    tags: ['Verified Assets', 'RWA Protocol', 'Sustainable Yield'],
    description: 'We believe that the future of livestock farming lies in smart, blockchain-based solutions connecting farmers directly to global investors.'
  },
  {
    id: 2,
    image: cow7,
    tags: ['Program Registry', 'On-Chain Identity', 'On-Chain Certificate'],
    description: 'Every cattle asset is registered on Solana via PDAs and on-chain records, recording verified origin, breed, weight, and attestation history.'
  },
  {
    id: 3,
    image: cow1,
    tags: ['Compliance & KYC', 'Token-2022', 'Transfer Hook'],
    description: 'Ensuring strict legal & regulatory compliance with OJK/Bappebti standards through automated Token-2022 Transfer Hook whitelist verification.'
  },
  {
    id: 4,
    image: cow2,
    tags: ['Vault Fractionalization', 'Yield Distribution', 'Pro-Rata Payout'],
    description: 'Investors purchase fractional cattle vault tokens with automated pro-rata yield distribution from farm sales directly on-chain.'
  }
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const fadeInUp = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const
    }
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function Hero({ onNavigate }: { onNavigate?: (page: 'home' | 'waitlist') => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-0 min-h-screen px-4 md:px-12">
      {/* Hidden Image Preloader for instant smooth sliding */}
      <div className="hidden">
        {heroSlides.map((slide) => (
          <img key={slide.id} src={getSrc(slide.image)} alt="" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start flex-col-reverse lg:grid">

        {/* Left Side: Bento sidebar */}
        <motion.div
          className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4 md:gap-6 order-2 lg:order-1"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          {/* Card 1: Rich Protocol Overview */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative bg-gradient-to-br from-white via-[#F9F8F3] to-white p-6 rounded-[32px] border border-black/10 shadow-sm hover:shadow-md transition-all flex-1 lg:aspect-square flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Row: Logo & Status Tag */}
            <div className="flex items-center justify-between z-10">
              <div className="w-13 h-13 rounded-2xl bg-white p-1 shadow-sm border border-black/5 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                <img src={getSrc(profileCow)} alt="NusaCow" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#234A2C]/10 rounded-full border border-[#234A2C]/20 text-[11px] font-semibold text-[#234A2C]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Solana Devnet
              </div>
            </div>

            {/* Middle Visual Chip / Stat Card */}
            <div className="my-3 p-3.5 bg-[#234A2C]/5 rounded-2xl border border-[#234A2C]/10 backdrop-blur-sm z-10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-black/60 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#6E8C68]" /> RWA Vault TVL
                </span>
                <span className="text-[9px] font-medium text-[#234A2C]/80 bg-[#6E8C68]/15 px-2 py-0.5 rounded-md">Simulasi hasil*</span>
              </div>
              <p className="text-base md:text-lg font-bold font-serif text-[#234A2C]">Target TVL: akan diumumkan</p>
              <div className="w-full bg-black/5 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#6E8C68] h-full w-[45%] rounded-full"></div>
              </div>
              <p className="text-[9px] text-black/50 mt-2 leading-tight">
                *Simulasi, bukan jaminan hasil. Investasi ternak memiliki risiko termasuk kemungkinan kerugian modal.
              </p>
            </div>

            {/* Bottom Info */}
            <div className="z-10">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-black tracking-tight">NusaCow Protocol</h3>
                <Sparkles size={14} className="text-[#6E8C68]" />
              </div>
              <p className="text-xs text-black/60 mt-0.5 leading-snug">Livestock Tokenization Platform</p>
            </div>

            {/* Ambient Background Blur Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#6E8C68]/15 rounded-full blur-2xl pointer-events-none"></div>
          </motion.div>

          {/* Card 2: Farmers & Registered Cattle */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-sage/40 p-6 rounded-[32px] overflow-hidden relative min-h-[160px] flex-1 flex flex-col justify-between border border-black/5 shadow-sm"
          >
            <div className="flex -space-x-3 mb-4 z-10">
              {[cow2, cow3, cow4, cow5].map((img, i) => (
                <div key={i} className="w-11 h-11 rounded-full border-2 border-cream overflow-hidden bg-white shadow-sm">
                  <img src={getSrc(img)} alt={`Farmer asset ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-11 h-11 rounded-full border-2 border-cream bg-[#234A2C] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                +124
              </div>
            </div>
            <div className="z-10">
              <div className="flex items-start justify-between gap-2">
                <p className="text-lg font-bold leading-tight text-[#234A2C]">Our Farmers <ArrowUpRight className="inline-block ml-1" size={18} /></p>
                <div className="flex flex-col items-end text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-[#234A2C] border border-black/5">Verified</span>
                  <span className="text-[9px] text-[#234A2C]/70 mt-1 max-w-[130px] leading-tight">Diverifikasi oleh tim kurasi & attestor independen</span>
                </div>
              </div>
              <p className="text-xs text-[#234A2C]/80 mt-2 font-medium">Target: 1.000+ sapi terdaftar di fase awal</p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-[#6E8C68] rounded-full opacity-40 blur-xl"></div>
          </motion.div>

          {/* Card 3: Initiative */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-[32px] border border-black/5 flex-1 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-black/40 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6E8C68]"></span> Initiative
              </p>
              <span className="text-[10px] font-bold text-[#234A2C] bg-[#F4F0E7] px-2 py-0.5 rounded-full">Solana RWA</span>
            </div>
            <div className="mt-4">
              <p className="font-serif italic text-xl text-[#234A2C] leading-snug">
                Tokenizing the <br /> Future of Ranching
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Center/Right: Hero Text & Main Image */}
        <div className="lg:col-span-9 flex flex-col order-1 lg:order-2">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[1] md:leading-[0.9] mb-4">
              Memberdayakan Peternak Lokal <br className="hidden md:block" />
              <span className="font-serif italic text-sage-foreground">Menokenisasi</span> Dunia Nyata
            </h1>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative rounded-[32px] md:rounded-[40px] overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[21/9] bg-black/10 shadow-lg group"
          >
            {/* Seamless Sliding Image Carousel */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={getSrc(heroSlides[currentIndex].image)}
                alt="Indonesian Cattle Ranch"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 260, damping: 28 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>


            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

            {/* Top Left Dynamic Tags for Each Slide */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 max-w-[70%] md:max-w-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {heroSlides[currentIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] md:text-xs font-medium text-white border border-white/20 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Top Right: Slide Navigation Controls */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-20">
              <div className="px-3 py-1.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-mono font-medium">
                0{currentIndex + 1} / 0{heroSlides.length}
              </div>
              <button
                onClick={handlePrev}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 cursor-pointer active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 cursor-pointer active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Bottom Left Dynamic Description Box */}
            <div className="hidden md:block absolute bottom-10 left-10 max-w-sm z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white/95 text-sm leading-relaxed backdrop-blur-md bg-black/30 p-4.5 rounded-2xl border border-white/15 shadow-xl">
                    {heroSlides[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Center Slide Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 z-20 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Bottom Right Interactive Action Buttons */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:right-10 md:left-auto flex flex-col sm:flex-row gap-3 md:gap-4 z-20">
              <button
                onClick={() => {
                  const targetSection = document.getElementById('timeline') || document.getElementById('solutions');
                  if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group w-full justify-center bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-cream hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/40 shadow-sm"
              >
                <span>Explore more</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate?.('waitlist')}
                className="w-full justify-center bg-[#234A2C] text-white px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-[#6E8C68] hover:shadow-lg hover:shadow-[#234A2C]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 shadow-sm"
              >
                <span>Work with us</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Compliance Disclaimer Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 md:mt-14 w-full rounded-2xl border border-black/5 bg-black/[0.03] backdrop-blur-sm px-4 py-3 md:px-6 md:py-3.5 text-center"
      >
        <p className="text-[11px] md:text-xs text-black/50 leading-relaxed">
          <span className="font-semibold text-black/60">Pemberitahuan:</span> NusaCow adalah platform tokenisasi aset ternak. Bukan produk perbankan atau efek yang diawasi OJK. Sedang dalam tahap pengembangan (devnet). Baca risiko lengkap di Docs sebelum bergabung waitlist.
        </p>
      </motion.div>
    </section>
  );
}

