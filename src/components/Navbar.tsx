import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-8 md:px-12"
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12">
          <Leaf size={20} />
        </div>
        <span className="font-semibold text-lg tracking-tight">UrbanGreen Tech</span>
      </div>

      <div className="hidden md:flex items-center bg-white/50 backdrop-blur-md px-2 py-1 rounded-full border border-black/5 gap-1">
        {['Home', 'protocol', 'docs'].map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all hover:bg-white overflow-hidden relative group`}
          >
            <span className="relative z-10">{item}</span>
            <span className="inline-block ml-1 text-[10px] opacity-40 group-hover:translate-x-1 transition-transform">0{i+1}</span>
          </a>
        ))}
      </div>

      <button className="bg-olive text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-moss transition-colors">
        Connect Wallet
      </button>
    </motion.nav>
  );
}
