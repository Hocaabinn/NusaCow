import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Solutions from './components/Solutions';
import Timeline from './components/Timeline';
import HowItsWork from './components/How-its-work';
import Faq from './components/Faq';
import Waitlist from './components/waitlist';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Instagram } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'waitlist'>('home');

  return (
    <div className="min-h-screen bg-cream selection:bg-olive selection:text-white">
      <Navbar onNavigate={setCurrentPage} />

      {currentPage === 'home' ? (
        <main>
          <Hero onNavigate={setCurrentPage} />

          <div className="mt-20">
            <Ticker />
          </div>

          <Solutions />

          <Timeline />

          <HowItsWork />

          <Faq />
        </main>
      ) : (
        <Waitlist onBack={() => setCurrentPage('home')} />
      )}

      {/* Simple Footer */}
        <footer className="py-20 px-6 md:px-12 border-t border-black/5 bg-white font-serif">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src="/src/image/Profile_cow.png" alt="NusaCow Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-xl font-serif">Nusa Cow</span>
              </div>
              <p className="text-black/50 max-w-sm mb-8">
                Democratizing cattle livestock investment in Indonesia through Solana Real World Asset (RWA) tokenization.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-black/60 hover:text-[#6E8C68] transition-colors" aria-label="X (formerly Twitter)">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-black/60 hover:text-[#6E8C68] transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Explore</h4>
              <ul className="flex flex-col gap-4 text-black/60 text-sm">
                <li><a href="#home" className="hover:text-black transition-colors">Home</a></li>
                <li><a href="#explore" className="hover:text-black transition-colors">Explore</a></li>
                <li><a href="#docs" className="hover:text-black transition-colors">Docs</a></li>
                <li><a href="#vaults" className="hover:text-black transition-colors">Vault</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Contact</h4>
              <ul className="flex flex-col gap-4 text-black/60 text-sm">
                <li><a href="mailto:[EMAIL_ADDRESS]" className="hover:text-black transition-colors">Nusacow@gmail.com</a></li>
                <li>12 Agro Innovation Blvd.
                  <br />Nusantara Eco-Valley, ID</li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-black/40 uppercase tracking-widest font-medium">
            <p>© 2026 Nusa Cow. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-black">Privacy Policy</a>
              <a href="#" className="hover:text-black">Terms of Service</a>
            </div>
          </div>
        </footer>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square bg-sage/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square bg-olive/5 rounded-full blur-[100px]"
        />
      </div>
    </div>
  );
}
