import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const services = [
  'Platform RWA Ternak Terkurasi',
  'Kepemilikan Ternak Terfraksi',
  'Verifikasi Aset On-Chain',
  'Distribusi Yield Otomatis',
  'Ekosistem Peternakan Transparan',
  'Infrastruktur Berbasis Solana',
  'Escrow Vault PDA Aman',
  'Sertifikat On-Chain',
];

export default function Ticker() {
  return (
    <div className="py-10 md:py-14 overflow-hidden border-y border-black/5 bg-cream/50 relative">
      <motion.div
        className="flex whitespace-nowrap gap-6 md:gap-12 items-center"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...services, ...services].map((service, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-8 group cursor-default">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black/80 transition-colors group-hover:text-olive">
              {service}
            </h2>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-olive group-hover:text-white transition-all transform group-hover:rotate-45">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            {i % 2 === 0 && (
              <img
              // src={`https://picsum.photos/seed/leaf${i}/100/100`}
              // alt="accent"
              // className="w-12 h-12 md:w-16 md:h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all"
              // referrerPolicy="no-referrer"
              />)
            }
          </div>
        ))}
      </motion.div>
    </div>
  );
}
