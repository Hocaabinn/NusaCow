import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Solutions from './components/Solutions';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-cream selection:bg-olive selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="mt-20">
          <Ticker />
        </div>

        <Solutions />
        
        {/* Simple Footer */}
        <footer className="py-20 px-6 md:px-12 border-t border-black/5 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 bg-olive rounded-full" />
                 <span className="font-bold text-xl">UrbanGreen Tech</span>
               </div>
               <p className="text-black/50 max-w-sm mb-8">
                 Leading the way in sustainable urban development. We create smart solutions for a greener, healthier future in our cities.
               </p>
               <div className="flex gap-4">
                 {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                   <a key={social} href="#" className="text-sm font-medium hover:text-olive transition-colors underline decoration-black/10 underline-offset-4">{social}</a>
                 ))}
               </div>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Explore</h4>
              <ul className="flex flex-col gap-4 text-black/60 text-sm">
                <li><a href="#" className="hover:text-black transition-colors">Project Gallery</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Technologies</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Whitepapers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Contact</h4>
              <ul className="flex flex-col gap-4 text-black/60 text-sm">
                <li><a href="mailto:hello@urbangreen.tech" className="hover:text-black transition-colors">hello@urbangreen.tech</a></li>
                <li>+1 (555) 000-GREEN</li>
                <li>Vibrant Street 12, <br />Eco-Valley, SV</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-black/40 uppercase tracking-widest font-medium">
             <p>© 2026 UrbanGreen Tech. All rights reserved.</p>
             <div className="flex gap-8">
               <a href="#" className="hover:text-black">Privacy Policy</a>
               <a href="#" className="hover:text-black">Terms of Service</a>
             </div>
          </div>
        </footer>
      </main>

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
