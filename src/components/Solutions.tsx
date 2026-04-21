import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const solutions = [
  {
    id: '01',
    title: '90% Water Savings',
    description: 'The smart irrigation systems implemented by UrbanGreen Tech have proven to reduce water consumption by up to 90% when compared to conventional farming practices.',
    quote: 'We are willing to build a future that sustains both the needs of the present and the health of generations to come',
    author: 'Peter Hoff',
    role: 'founder',
    image: 'https://picsum.photos/seed/irrigation/800/600',
    profile: 'https://picsum.photos/seed/peter/100/100'
  },
  {
    id: '02',
    title: '80% Energy Efficiency',
    description: 'UrbanGreen Tech LED lighting solutions have demonstrated energy efficiency gains of up to 80% compared to traditional lighting systems.',
    quote: 'Our mission is to empower communities, inspire innovation, and create an eco-friendly world.',
    author: 'Camilla Hoff',
    role: 'co-founder',
    image: 'https://picsum.photos/seed/energy/800/600',
    profile: 'https://picsum.photos/seed/camilla/100/100'
  }
];

export default function Solutions() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % solutions.length);
  const prev = () => setIndex((prev) => (prev - 1 + solutions.length) % solutions.length);

  const current = solutions[index];

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-black/40 mb-4 block">Our impact</span>
          <h2 className="text-5xl md:text-7xl font-sans tracking-tight leading-none">
            Explore our <br /> <span className="font-serif italic">solutions</span>
          </h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={prev}
            className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all transform active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all transform active:scale-95"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Large Image Column */}
        <div className="lg:col-span-5">
          <div className="relative rounded-[40px] overflow-hidden aspect-[3/4] group">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.title}
                initial={{ filter: 'grayscale(1) blur(10px)', scale: 1.1 }}
                animate={{ filter: 'grayscale(0) blur(0px)', scale: 1 }}
                exit={{ filter: 'grayscale(1) blur(10px)', scale: 1.1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex flex-col items-center justify-center text-white p-2 text-center group-hover:bg-olive group-hover:scale-110 transition-all">
               <span className="text-[10px] uppercase font-bold tracking-tighter leading-none">Smart</span>
               <span className="text-[10px] uppercase font-bold tracking-tighter leading-none">Green</span>
               <span className="text-[10px] uppercase font-bold tracking-tighter leading-none">Status</span>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          <div className="flex items-center gap-4 mb-4">
            {solutions.map((s, idx) => (
              <div 
                key={s.id}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${idx === index ? 'bg-olive' : 'bg-black/5'}`}
              />
            ))}
            <span className="text-sm font-mono opacity-40">{current.id}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              <h3 className="text-6xl md:text-8xl font-sans tracking-tighter leading-tight text-black/10">
                {current.title}
              </h3>
              <p className="text-xl md:text-2xl text-black/60 max-w-2xl leading-relaxed">
                {current.description}
              </p>

              <div className="bg-sage/20 p-10 rounded-[32px] border border-sage/30 relative mt-8">
                <Quote className="absolute -top-6 left-10 text-olive opacity-20" size={60} fill="currentColor" />
                <p className="text-2xl font-serif italic mb-8 leading-snug">
                  "{current.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xl">
                    <img src={current.profile} alt={current.author} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-bold text-sm tracking-tight">{current.author}</p>
                    <p className="text-xs text-black/40 uppercase tracking-widest">{current.role}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-auto w-12 h-12 rounded-full bg-olive text-white flex items-center justify-center hover:bg-moss transition-colors"
                  >
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
