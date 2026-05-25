/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Utensils, MessageSquare, Award } from 'lucide-react';

// Custom Components
import BackgroundPlate from './components/BackgroundPlate';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import MenuPage from './components/MenuPage';
import BotanicalMixer from './components/BotanicalMixer';
import MixerPage from './components/MixerPage';
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';

// Types
import { MenuItem, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentView, setCurrentView] = useState<'home' | 'booking' | 'menu' | 'mixer'>('home');
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  // Load cart from localStorage on mount (optional persistent local state)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('plantify_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
  }, []);

  // Auto-route deep link tokens on initial mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('reservation')) {
        setCurrentView('booking');
        setActiveSection('reservation');
      } else if (params.has('ticket')) {
        setCurrentView('mixer');
        setActiveSection('botanical-mixer');
      }
    } catch (e) {
      console.error('Error auto-routing deep link:', e);
    }
  }, []);

  // Save cart changes
  const updateSavedCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('plantify_cart', JSON.stringify(updatedCart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem, customNotes?: string) => {
    const existingIndex = cart.findIndex(
      (c) => c.menuItem.id === item.id && c.customNotes === customNotes
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      updateSavedCart(updated);
    } else {
      updateSavedCart([...cart, { menuItem: item, quantity: 1, customNotes }]);
    }
  };

  const handleUpdateCartQty = (itemId: string, newQty: number) => {
    const updated = cart.map((item) => {
      if (item.menuItem.id === itemId) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateSavedCart(updated);
  };

  const handleRemoveFromCart = (itemId: string) => {
    const updated = cart.filter((item) => item.menuItem.id !== itemId);
    updateSavedCart(updated);
  };

  const handleCheckout = () => {
    // Clear cart fully
    updateSavedCart([]);
  };

  // When pendingScrollId changes and currentView is homewards, scroll to it
  useEffect(() => {
    if (currentView === 'home' && pendingScrollId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(pendingScrollId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
          setActiveSection(pendingScrollId);
        }
        setPendingScrollId(null);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentView, pendingScrollId]);

  // Intersection Observer to trace which section is in view to update active link
  useEffect(() => {
    if (currentView === 'booking') {
      setActiveSection('reservation');
      return;
    }
    if (currentView === 'menu') {
      setActiveSection('menu');
      return;
    }
    if (currentView === 'mixer') {
      setActiveSection('botanical-mixer');
      return;
    }

    const sections = ['philosophy', 'botanical-mixer'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Center band trigger
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [currentView]);

  // Smooth scroll and routing handler
  const scrollToSection = (id: string) => {
    if (id === 'reservation') {
      setCurrentView('booking');
      setActiveSection('reservation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'menu') {
      setCurrentView('menu');
      setActiveSection('menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'botanical-mixer') {
      setCurrentView('mixer');
      setActiveSection('botanical-mixer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'hero') {
      setCurrentView('home');
      setActiveSection('hero');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      setPendingScrollId(id);
      setCurrentView('home');
    } else {
      const element = document.getElementById(id);
      if (element) {
        // Offset slightly to account for sticky header heights
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setActiveSection(id);
      }
    }
  };

  const handleReserveLink = (mealDescription: string) => {
    try {
      const existingListStr = localStorage.getItem('reserved_dishes_list');
      let existingList: string[] = [];
      if (existingListStr) {
        try {
          existingList = JSON.parse(existingListStr);
          if (!Array.isArray(existingList)) {
            existingList = [];
          }
        } catch (e) {
          existingList = [];
        }
      }
      
      if (mealDescription && !existingList.includes(mealDescription)) {
        existingList.push(mealDescription);
      }
      
      localStorage.setItem('reserved_dishes_list', JSON.stringify(existingList));
      localStorage.setItem('pending_reservation_meal', mealDescription);
    } catch (e) {
      console.error('Error storing pending reservation list:', e);
    }
    setCurrentView('booking');
    setActiveSection('reservation');
    // Scroll smoothly to reservation section
    setTimeout(() => {
      const el = document.getElementById('reservation');
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-bg-main selection:bg-brand/20 typography-primary">
      
      {/* 1. Cinematic Background Zoomable Plate Layer (Always Sticky Underneath) */}
      <BackgroundPlate />

      {/* 2. Interactive Scrolling Elements */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sticky Header Nav Panel */}
        <Header
          cart={cart}
          onUpdateCartQty={handleUpdateCartQty}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={handleCheckout}
          scrollToSection={scrollToSection}
          activeSection={activeSection}
        />

        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="homepage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {/* Hero Section Container */}
              <HeroSection 
                onExploreClick={() => scrollToSection('menu')} 
                onCustomMixClick={() => scrollToSection('botanical-mixer')}
              />

              {/* Philosophy / Story Section */}
              <PhilosophySection />

              {/* Botanical Elixir Laboratory Mixer */}
              <BotanicalMixer 
                onAddCustomElixir={(item) => handleAddToCart(item)} 
                onOpenMixerPage={() => scrollToSection('botanical-mixer')}
              />
            </motion.div>
          ) : currentView === 'menu' ? (
            <motion.div
              key="menupage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              <MenuPage onAddToCart={handleAddToCart} onReserveMeal={handleReserveLink} />
            </motion.div>
          ) : currentView === 'mixer' ? (
            <motion.div
              key="mixerpage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex-1 animate-fadeIn"
            >
              <MixerPage onBackToHome={() => scrollToSection('hero')} onReserveMeal={handleReserveLink} />
            </motion.div>
          ) : (
            <motion.div
              key="bookingpage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex-1 pt-32 pb-16 flex flex-col justify-center items-center relative z-10 w-full"
            >
              {/* Decorative background visual spotlight */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[300px] sm:h-[500px] bg-brand/10 rounded-full blur-[140px] opacity-40 animate-pulse" />
              </div>

              {/* Page header */}
              <div className="text-center max-w-3xl mx-auto px-4 mb-2 relative z-10">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center space-x-2 bg-[#121815]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 mb-6"
                >
                  <Calendar className="w-4 h-4 text-brand animate-pulse" />
                  <span className="font-sans font-semibold text-[11px] text-brand uppercase tracking-widest">
                    Live Reservations Engine
                  </span>
                </motion.span>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-serif text-5xl sm:text-7xl font-semibold tracking-tight leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/4 shadow-sm"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
                >
                  Book <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-warm">your table</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif italic text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
                >
                  "Experience our zero-mile botanical gastronomy live from the Beechwood hearth."
                </motion.p>
              </div>

              {/* Full-bleed Booking Frame */}
              <div className="w-full relative z-10">
                <ReservationSection onNavigateToMenu={() => scrollToSection('menu')} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info coordinates */}
        <Footer />
        
      </div>
    </div>
  );
}
