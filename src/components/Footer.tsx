/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Compass, Phone, Mail, Clock, ArrowRight, Instagram, Facebook, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative bg-[#070B09] text-white/70 pt-24 pb-12 z-10 overflow-hidden border-t border-white/5">
      {/* Structural background details */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-warm/5 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-rose/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand, hours, details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Column 1: Identity & Newsletter (Grid columns 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-[#0BA486]/20 to-transparent border border-[#0BA486]/35 overflow-hidden shadow-lg">
                {/* Spin runic backdrop circle */}
                <svg className="w-6 h-6 absolute animate-[spin_30s_linear_infinite] text-[#0BA486]/30" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                </svg>
                {/* Dual-petal alchemical seedling */}
                <svg 
                  className="w-4 h-4 text-[#0BA486]"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22V12" />
                  <path d="M12 12c3-3 6-2 8-5-4 .5-6.5 2.5-8 5z" />
                  <path d="M12 12c-3-3-6-2-8-5 4 .5 6.5 2.5 8 5z" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-black tracking-widest text-white uppercase">
                Plantify
              </span>
            </div>
            
            <p className="font-serif italic text-sm text-white/60 max-w-sm leading-relaxed">
              "We synthesize physical nutrition with botanical wisdom. Connecting modern palates to ancient soil memories."
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 pt-4">
              <label className="block text-xs font-mono uppercase tracking-widest text-[#F3C395] font-semibold">
                Receive Seasonal Almanac Logs
              </label>
              <div className="relative max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eli@seedling.co"
                  className="w-full bg-white/5 border border-white/15 rounded-full py-3.5 pl-6 pr-12 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F3C395] focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-2 rounded-full bg-accent-warm text-black hover:bg-[#ffdfbd] transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="block text-xs text-accent-warm font-sans"
                >
                  Coordinates secured. Welcome to the Almanac logs circle!
                </motion.span>
              )}
            </form>
          </div>

          {/* Column 2: Seating and Sourcing times (Grid columns 6-9) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-accent-warm flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Seating Sessions
            </h4>
            
            <div className="space-y-4 text-sm text-white/60 font-serif">
              <div>
                <span className="block font-sans text-xs uppercase font-bold text-white mb-0.5">Wednesday – Sunday</span>
                <span className="block italic">Luncheon Seating: 11:30 – 15:00</span>
                <span className="block italic">Hearth & Ember Dinner: 18:00 – 23:00</span>
              </div>
              <div>
                <span className="block font-sans text-xs uppercase font-bold text-white mb-0.5">Monday & Tuesday</span>
                <span className="block italic text-accent-rose">Closed for forest crop rotation AND ingredient foraging.</span>
              </div>
            </div>
          </div>

          {/* Column 3: Communication & Coordinates (Grid columns 10-12) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-accent-warm flex items-center">
              <Compass className="w-4 h-4 mr-2" />
              Coordinates
            </h4>

            <div className="space-y-3 font-serif text-sm text-white/60">
              <div className="flex items-start space-x-2.5">
                <Compass className="w-4 h-4 text-accent-warm mt-0.5 flex-shrink-0" />
                <span>505 Silver Sap Trail, Forest Ring Reserve</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-accent-warm flex-shrink-0" />
                <span>+1 (888) SEED-ROOT</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-accent-warm flex-shrink-0" />
                <span>stewardship@plantify.co</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center space-x-4 pt-3 text-white/50">
              <a href="#" className="hover:text-[#F3C395] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#F3C395] transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} PLANTIFY CULINARY SYSTEM INC. ALL RIGHTS ALLOCATED FOR SUSTAINABILITY.
          </div>
          <div className="flex items-center space-x-1 font-sans">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-accent-rose text-accent-rose" />
            <span>by high-end botanical stewardship.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
