import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const services = [
  'Green Infrastructure Design',
  'Smart Irrigation Systems',
  'Urban Agriculture Consulting',
  'Vertical Farming Solutions',
  'Eco-Friendly Pest Control',
  'Smart Urban Automation',
];

export default function Ticker() {
  return (
    <div className="py-20 overflow-hidden border-y border-black/5 bg-cream/50 relative">
      <motion.div 
        className="flex whitespace-nowrap gap-12 items-center"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...services, ...services].map((service, i) => (
          <div key={i} className="flex items-center gap-8 group cursor-default">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-black/80 transition-colors group-hover:text-olive">
              {service}
            </h2>
            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-olive group-hover:text-white transition-all transform group-hover:rotate-45">
              <Sparkles size={24} />
            </div>
            {i % 2 === 0 && (
               <img 
                 src={`https://picsum.photos/seed/leaf${i}/100/100`} 
                 alt="accent" 
                 className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all"
                 referrerPolicy="no-referrer"
               />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
