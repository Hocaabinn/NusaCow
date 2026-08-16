import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Compass, FileText, Layers, Ticket } from 'lucide-react';
import profileCow from '../image/Profile_cow.png';

const getSrc = (img: any): string => (typeof img === 'string' ? img : img?.src || (img as string));

export default function Navbar({ onNavigate }: { onNavigate?: (page: 'home' | 'waitlist') => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-4 md:px-12 md:py-8 bg-white/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none font-serif"
      >
        <div className="flex items-center gap-2 group cursor-pointer z-50">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12 overflow-hidden">
            <img src={getSrc(profileCow)} alt="NusaCow Logo" className="w-full h-full object-cover" />
          </div>

          <span className="font-semibold text-base md:text-lg tracking-tight">Nusa Cow</span>
        </div>

        <div className="hidden md:flex items-center bg-white/50 backdrop-blur-md px-2 py-1 rounded-full border border-black/5 gap-1">
          {[
            { name: 'Home', icon: Home },
            { name: 'Explore', icon: Compass },
            { name: 'Docs', icon: FileText },
            { name: 'Vaults', icon: Layers },
          ].map((item, i) => (
            <a
              key={item.name}
              href={`#${item.name.toLowerCase()}`}
              onClick={(e) => {
                if (item.name === 'Home') {
                  e.preventDefault();
                  onNavigate?.('home');
                }
              }}
              className={`px-5 py-2 flex items-center gap-2 rounded-full text-sm font-medium transition-all hover:bg-[#6E8C68] hover:text-white overflow-hidden relative group`}
            >
              <item.icon size={16} className="relative z-10 opacity-70 group-hover:opacity-100" />
              <span className="relative z-10">{item.name}</span>
              <span className="inline-block ml-1 text-[10px] opacity-40 group-hover:translate-x-1 transition-transform">0{i + 1}</span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button 
            onClick={() => onNavigate?.('waitlist')}
            className="flex items-center gap-2 bg-[#6E8C68] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#5C7757] transition-colors shadow-sm"
          >
            <Ticket size={16} />
            <span>Waitlist</span>
          </button>
        </div>

        <button
          className="md:hidden z-50 p-2 rounded-full bg-black/5 text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col md:hidden font-serif"
          >
            <div className="flex flex-col gap-4">
              {[
                { name: 'Home', icon: Home },
                { name: 'Explore', icon: Compass },
                { name: 'Docs', icon: FileText },
                { name: 'Vaults', icon: Layers },
              ].map((item, i) => (
                <a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  onClick={(e) => {
                    if (item.name === 'Home') {
                      e.preventDefault();
                      onNavigate?.('home');
                    }
                    setIsOpen(false);
                  }}
                  className="text-2xl font-semibold py-4 border-b border-black/5 flex justify-between items-center group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={24} className="text-black/50 group-hover:text-olive transition-colors" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-sm opacity-40">0{i + 1}</span>
                </a>
              ))}
              <button 
                onClick={() => {
                  onNavigate?.('waitlist');
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#6E8C68] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#5C7757] transition-colors mt-8 shadow-sm"
              >
                <Ticket size={20} />
                <span>Waitlist</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
