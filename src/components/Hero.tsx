import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative pt-40 min-h-screen px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Bento sidebar */}
        <motion.div 
          className="lg:col-span-3 flex flex-col gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="bg-white p-6 rounded-[32px] border border-black/5 aspect-square flex flex-col justify-between">
            <div className="bg-sage w-12 h-12 rounded-full mb-4 overflow-hidden">
               <img src="https://picsum.photos/seed/profile/100/100" alt="Founder" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-sm font-medium">UrbanGreen Tech</p>
              <p className="text-xs text-black/50">Smart City Infrastructure</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-sage/40 p-6 rounded-[32px] overflow-hidden relative min-h-[200px]">
             <div className="flex -space-x-4 mb-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-cream overflow-hidden bg-white">
                   <img src={`https://picsum.photos/seed/team${i}/100/100`} alt="Team Member" referrerPolicy="no-referrer" />
                 </div>
               ))}
               <div className="w-10 h-10 rounded-full border-2 border-cream bg-white flex items-center justify-center text-[10px] font-bold">
                 +12
               </div>
             </div>
             <p className="text-lg font-medium leading-tight mb-2">Our Team <ArrowUpRight className="inline-block" size={16} /></p>
             <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-sage rounded-full opacity-50 blur-xl"></div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white p-6 rounded-[32px] border border-black/5">
            <p className="text-xs uppercase tracking-widest text-black/40 mb-2">+ Initiative</p>
            <p className="font-serif italic text-xl">Cultivating the <br /> Future of Cities</p>
          </motion.div>
        </motion.div>

        {/* Center/Right: Hero Text & Main Image */}
        <div className="lg:col-span-9 flex flex-col">
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.9] mb-4">
              Reimagining Urban Spaces <br />
              <span className="font-serif italic text-sage-foreground">Greening</span> the World
            </h1>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative rounded-[40px] overflow-hidden aspect-[21/9]"
          >
            <img 
              src="https://picsum.photos/seed/urban-nature/1600/800" 
              alt="Urban Forest" 
              className="w-full h-full object-cover grayscale-[0.2]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            
            <div className="absolute top-6 left-6 flex gap-2">
               {['Smart', 'Sustainable', 'Innovative'].map(tag => (
                 <span key={tag} className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="absolute top-6 right-6">
               <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                 <Play size={20} fill="currentColor" />
               </button>
            </div>
            
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-10 max-w-sm"
            >
              <p className="text-white/90 text-sm leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/10">
                We believe that the future of cities lies in smart, eco-friendly solutions that address the pressing challenges of urbanization.
              </p>
            </motion.div>

            <div className="absolute bottom-10 right-10 flex gap-4">
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform">
                Explore more <ArrowUpRight size={16} />
              </button>
              <button className="bg-olive text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                Work with us
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
