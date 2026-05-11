import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';

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

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-0 min-h-screen px-4 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start flex-col-reverse lg:grid">

        {/* Left Side: Bento sidebar */}
        <motion.div
          className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4 md:gap-6 order-2 lg:order-1"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="bg-white p-6 rounded-[32px] border border-black/5 flex-1 lg:aspect-square flex flex-col justify-between">
            <div className="bg-sage w-12 h-12 rounded-full mb-4 overflow-hidden">
              <img src="https://picsum.photos/seed/cow-logo/100/100" alt="NusaCow" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-sm font-medium">NusaCow Protocol</p>
              <p className="text-xs text-black/50">Livestock Tokenization Platform</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-sage/40 p-6 rounded-[32px] overflow-hidden relative min-h-[160px] flex-1 flex flex-col justify-between">
            <div className="flex -space-x-4 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-cream overflow-hidden bg-white">
                  <img src={`https://picsum.photos/seed/farmer${i}/100/100`} alt="Farmer" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-cream bg-white flex items-center justify-center text-[10px] font-bold">
                +12
              </div>
            </div>
            <p className="text-lg font-medium leading-tight mb-2">Our Farmers <ArrowUpRight className="inline-block" size={16} /></p>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-sage rounded-full opacity-50 blur-xl"></div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white p-6 rounded-[32px] border border-black/5 flex-1 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-widest text-black/40 mb-2">+ Initiative</p>
            <p className="font-serif italic text-xl">Tokenizing the <br />  Future of Ranching</p>
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
              Empowering Local Ranches <br className="hidden md:block" />
              <span className="font-serif italic text-sage-foreground">Tokenizing</span>  Physical World
            </h1>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative rounded-[32px] md:rounded-[40px] overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[21/9]"
          >
            <img
              src="https://picsum.photos/seed/cow-farm/1600/800"
              alt="Farm"
              className="w-full h-full object-cover grayscale-[0.2]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap gap-2 max-w-[70%] md:max-w-none">
              {['Verified Assets', 'RWA Protocol', 'Sustainable Yield'].map(tag => (
                <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] md:text-xs font-medium text-white border border-white/20">
                  {tag}
                </span>
              ))}
            </div>

            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Play size={16} fill="currentColor" className="md:w-5 md:h-5" />
              </button>
            </div>

            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block absolute bottom-10 left-10 max-w-sm"
            >
              <p className="text-white/90 text-sm leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/10">
                We believe that the future of livestock farming lies in smart, blockchain-based solutions that connect farmers directly to global investors.
              </p>
            </motion.div>

            <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:right-10 md:left-auto flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="w-full justify-center bg-white text-black px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform">
                Explore more <ArrowUpRight size={16} />
              </button>
              <button className="w-full justify-center bg-olive text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                Work with us
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
