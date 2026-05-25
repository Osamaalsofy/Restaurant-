/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, X, Trash2, Plus, Minus, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { useLanguage } from '../utils/LanguageContext';

interface HeaderProps {
  cart: CartItem[];
  onUpdateCartQty: (itemId: string, newQty: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onCheckout: () => void;
  scrollToSection: (id: string) => void;
  activeSection: string;
}

export default function Header({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onCheckout,
  scrollToSection,
  activeSection,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const { language, toggleLanguage, t, isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);

  const handleSimulateCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onCheckout();
      setIsCartOpen(false);
      setCheckoutSuccess(false);
    }, 2500);
  };

  const navItems = [
    { label: t('philosophy'), id: 'philosophy' },
    { label: t('menu'), id: 'menu' },
    { label: t('fruitSmoothie'), id: 'botanical-mixer' },
    { label: t('bookTable'), id: 'reservation' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-[#070B09]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo Identity */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-3 text-left group cursor-pointer"
          >
            <div className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${
              isScrolled 
                ? 'bg-brand/10 border border-brand/25' 
                : 'bg-gradient-to-br from-[#0BA486] to-[#047857] shadow-[0_4px_12px_rgba(11,164,134,0.3)]'
            }`}>
              {/* Spin runic backdrop circle */}
              <svg className={`w-6 h-6 absolute animate-[spin_25s_linear_infinite] transition-colors duration-300 ${isScrolled ? 'text-brand/35' : 'text-emerald-350/50'}`} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              {/* Elegant dual-petal alchemical seedling */}
              <svg 
                className={`w-4.5 h-4.5 relative z-10 transition-transform duration-500 group-hover:scale-110 ${isScrolled ? 'text-brand' : 'text-white'}`}
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
            <span
              className="font-serif text-2xl font-black tracking-widest text-white group-hover:text-brand transition-colors duration-300 uppercase"
            >
              Plantify
            </span>
          </button>

          {/* Desktop Navigation Links (Cinematic Style) */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-sans font-bold text-xs tracking-widest uppercase relative py-1.5 border-b border-transparent transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? 'text-brand'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Interactive Actions Panel */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-2 bg-white/5 border border-white/15 text-white font-sans text-[11px] font-medium rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-300"
            >
              <Globe className="w-3.5 h-3.5 text-[#F3C395]" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </motion.button>

            {/* Quick RSVP CTA button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(11, 164, 134, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('reservation')}
              className="flex items-center space-x-2 rtl:space-x-reverse px-5 py-2.5 bg-brand text-black font-sans text-xs font-black tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('tableRsvp')}</span>
            </motion.button>
          </div>
        </div>
      </header>
    </>
  );
}
