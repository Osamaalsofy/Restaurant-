/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Sparkles, 
  Plus, 
  Check, 
  MessageSquare, 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Flame 
} from 'lucide-react';
import { MenuItem, DishCategory } from '../types';
import { MENU_ITEMS } from '../data/menu';
import { useLanguage } from '../utils/LanguageContext';

interface MenuPageProps {
  onAddToCart: (item: MenuItem, customNotes?: string) => void;
  onReserveMeal?: (mealDescription: string) => void;
}

// Letter mask image targets - high quality culinary photos matching the HAVEN theme
const LETTER_IMAGES = {
  H: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', // Appetizer/salad
  A: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80', // Platter with blossom petals
  V: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', // Dessert sphere/cakes
  E: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', // Salad greens/bowl
  N: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'  // Amber cordial coaster/drink
};

export default function MenuPage({ onAddToCart, onReserveMeal }: MenuPageProps) {
  const { language, t, translateItemName, translateDescription, translateTag } = useLanguage();

  const [activeTab, setActiveTab] = useState<DishCategory>('Appetizers');
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [addedItemStates, setAddedItemStates] = useState<Record<string, boolean>>({});
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  const categories: DishCategory[] = ['Appetizers', 'Mains', 'Desserts', 'Elixirs'];
  
  const getTabLabel = (cat: DishCategory) => {
    switch (cat) {
      case 'Appetizers': return t('appetizersTab');
      case 'Mains': return t('mainsTab');
      case 'Desserts': return t('dessertsTab');
      case 'Elixirs': return t('elixirsTab');
      default: return cat;
    }
  };

  // Filter menu items by active category
  const activeItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  const handleAddItem = (item: MenuItem) => {
    onAddToCart(item, customNote.trim() || undefined);
    setAddedItemStates((prev) => ({ ...prev, [item.id]: true }));
    setCustomNote('');
    setSelectedItemForDetail(null);

    setTimeout(() => {
      setAddedItemStates((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  // 1. SLIDER PHYSICS AND TRANSLATION LOGIC
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isHoveredOnSlider, setIsHoveredOnSlider] = useState(false);
  const [mousePercent, setMousePercent] = useState(0.5);

  const updateDimensions = () => {
    if (viewportRef.current && trackRef.current) {
      const vWidth = viewportRef.current.clientWidth;
      const tWidth = trackRef.current.scrollWidth;
      const calculatedMax = Math.max(0, tWidth - vWidth);
      setMaxScroll(calculatedMax);
      // Reset position to center or start on tab toggle
      setCurrentTranslate(0);
    }
  };

  // Sync dimensions
  useEffect(() => {
    updateDimensions();
    // Allow brief render delay for browser styling
    const timer = setTimeout(updateDimensions, 200);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [activeTab]);

  // Handle active mouse move
  const handleMouseMoveSlider = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maxScroll <= 0 || !viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setMousePercent(percentage);

    // Dynamic scale translation
    const targetTranslate = -percentage * maxScroll;
    setCurrentTranslate(targetTranslate);
  };

  // Navigations buttons for precision touch
  const handleSlideLeft = () => {
    setCurrentTranslate((prev) => Math.min(0, prev + 340));
  };

  const handleSlideRight = () => {
    setCurrentTranslate((prev) => Math.max(-maxScroll, prev - 340));
  };

  // Scroll ratio for indicator fill
  const scrollRatio = maxScroll > 0 ? (Math.abs(currentTranslate) / maxScroll) * 100 : 0;

  return (
    <div className="relative min-h-screen bg-[#070b09] text-white overflow-hidden pb-12">
      
      {/* Background radial glows mapping michelin premium space */}
      <div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-24 right-1/4 w-[400px] h-[400px] bg-accent-warm/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative fine-grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 relative z-10 w-full">

        {/* 1. TYPOGRAPHY MASKING HAVEN SECTION */}
        <div className="relative w-full py-12 sm:py-20 flex flex-col items-center justify-center select-none overflow-visible">
          
          {/* Cursive Background Path Overlay running behind the letters (exact visual recreation) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-0 pointer-events-none max-w-full">
            <svg 
              viewBox="0 0 1000 320" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-auto opacity-45 stroke-[1.5]"
            >
              <path 
                d="M -50 160 C 140 310, 240 -80, 430 140 C 590 320, 690 -50, 790 180 C 890 340, 960 180, 1050 200" 
                stroke="#F3C395" 
                strokeWidth="1.8"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
              <path 
                d="M -50 180 C 110 220, 310 -120, 420 180 C 530 380, 730 40, 860 160 C 930 220, 990 180, 1050 190" 
                stroke="#0BA486" 
                strokeWidth="1" 
                opacity="0.55"
              />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 max-w-full">
            {(['H', 'A', 'V', 'E', 'N'] as const).map((letter) => {
              const bgUrl = LETTER_IMAGES[letter];
              const isHovered = hoveredLetter === letter;

              return (
                <motion.div
                  key={letter}
                  onMouseEnter={() => setHoveredLetter(letter)}
                  onMouseLeave={() => setHoveredLetter(null)}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                  className="relative cursor-default"
                >
                  {/* Glowing letter outline shadow */}
                  <div 
                    className="absolute inset-0 blur-xl opacity-3 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ 
                      backgroundColor: isHovered ? '#0BA486' : '#F3C395', 
                      opacity: isHovered ? 0.35 : 0.05 
                    }} 
                  />

                  {/* High dramatic letter block containing photo mask */}
                  <h1 
                    className="font-sans font-black text-6xl sm:text-8xl md:text-[11rem] lg:text-[13rem] xl:text-[15rem] tracking-tighter leading-none select-none text-transparent bg-clip-text bg-cover bg-center transition-all duration-700"
                    style={{ 
                      backgroundImage: `url(${bgUrl})`,
                      WebkitTextStroke: isHovered ? '2px #0BA486' : '1px rgba(255, 255, 255, 0.45)',
                      textShadow: '0 15px 40px rgba(0,0,0,0.92)'
                    }}
                  >
                    {letter}
                  </h1>

                  {/* Letter active label capsule */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#121815]/90 border border-brand/30 px-3 py-1 rounded-full backdrop-blur-md hidden sm:block pointer-events-none"
                      >
                        <span className="font-mono text-[9px] font-bold text-brand uppercase tracking-widest whitespace-nowrap">
                          {letter === 'H' && (language === 'en' ? 'Harmony' : 'تناغم 🌸')}
                          {letter === 'A' && (language === 'en' ? 'Artisanal' : 'حرفي دقيق ✨')}
                          {letter === 'V' && (language === 'en' ? 'Vibrant' : 'حيوي مميز 🌱')}
                          {letter === 'E' && (language === 'en' ? 'Earthbound' : 'نابع من الأرض 🌍')}
                          {letter === 'N' && (language === 'en' ? 'Nurtured' : 'مغذّ ومفيد 💚')}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Side NOMINEE banner from photo (rotated) */}
          <div className="absolute left-0 bottom-6 hidden lg:flex flex-col items-center border-l border-white/10 pl-4 py-2">
            <span className="font-mono text-[9px] font-bold text-[#F3C395] tracking-[0.3em] uppercase rotate-270 origin-left mt-8">
              ★ {language === 'en' ? 'MICHELIN GREEN STAR NOMINEE' : 'مرشح لجائزة ميشلان الخضراء المرموقة'}
            </span>
          </div>
        </div>

        {/* SECTION SEPARATOR SUBTITLE */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="font-serif italic text-white/50 text-xs sm:text-sm leading-relaxed">
            {language === 'en' 
              ? '"We transform garden harvests into immersive culinary narratives, mapped dynamically through the seasons."'
              : '"نحن نحول حصاد المزرعة البري إلى تجربة حسية فريدة، تنسج فصول الطبيعة في لوحة طهي مدهشة."'}
          </p>
          <div className="w-12 h-[1px] bg-[#F3C395]/40 mx-auto mt-4" />
        </div>

        {/* 2. CATEGORIES FILTER TAB BAR */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex flex-wrap p-1.5 bg-[#121815]/90 backdrop-blur-md rounded-full border border-white/10 shadow-lg max-w-full justify-center">
            {categories.map((cat) => {
              const active = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-4 sm:px-6 py-2 rounded-full font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] cursor-pointer group overflow-hidden ${
                    active ? 'text-[#0A0F0D] font-black' : 'text-white/60 hover:text-accent-warm'
                  }`}
                >
                  {/* Tab active pill background */}
                  {active && (
                    <motion.span
                      layoutId="menuPageTabs"
                      className="absolute inset-0 bg-brand rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  {/* Shine effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="relative z-10">{getTabLabel(cat)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. CINEMATIC DISH CARDS SLIDER/GALLERY (Interactive Mouse Move Panner) */}
        <div className="relative mb-20">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
            <span className="font-mono text-[9px] sm:text-[10px] text-brand/80 font-bold uppercase tracking-widest flex items-center">
              <Sparkles className="w-3.5 h-3.5 text-[#F3C395] mr-2 animate-pulse" />
              {language === 'en' ? 'Interactive Runway' : 'جولة تفاعلية في طيف النكهات'} &middot; {getTabLabel(activeTab)} ({activeItems.length})
            </span>
            
            <div className="flex items-center space-x-3">
              {/* Navigation help tips */}
              <span className="hidden md:inline font-mono text-[8px] text-white/30 uppercase tracking-widest">
                {isHoveredOnSlider 
                  ? (language === 'en' ? 'Slide: Sweeping cursor left & right' : 'التصفح: حرك الماوس يمينًا ويسارًا لمشاهدة الوجبات') 
                  : (language === 'en' ? 'Hover to sweep menu left & right' : 'مرر مؤشر الماوس هنا لمسح القائمة بسلاسة')
                }
              </span>

              {/* Slider Controls */}
              <div className="flex items-center space-x-1.5">
                <button 
                  onClick={handleSlideLeft} 
                  disabled={currentTranslate === 0}
                  className="p-1 px-2 text-xs rounded-lg border border-white/10 hover:border-brand/40 bg-[#121815]/80 disabled:opacity-20 transition-all cursor-pointer text-white/70 hover:text-white"
                  title="Slide Left"
                >
                  &larr;
                </button>
                <button 
                  onClick={handleSlideRight} 
                  disabled={currentTranslate <= -maxScroll}
                  className="p-1 px-2 text-xs rounded-lg border border-white/10 hover:border-brand/40 bg-[#121815]/80 disabled:opacity-20 transition-all cursor-pointer text-white/70 hover:text-white"
                  title="Slide Right"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Views Horizon slider viewport */}
          <div 
            ref={viewportRef}
            onMouseMove={handleMouseMoveSlider}
            onMouseEnter={() => setIsHoveredOnSlider(true)}
            onMouseLeave={() => setIsHoveredOnSlider(false)}
            className="w-full overflow-hidden relative py-4 cursor-ew-resize select-none"
          >
            {/* Ambient indicator markers on boundaries */}
            {currentTranslate < 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070b09] to-transparent z-20 pointer-events-none" />
            )}
            {currentTranslate > -maxScroll && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070b09] to-transparent z-20 pointer-events-none" />
            )}

            {/* Sliding Track containing the elements */}
            <div
              ref={trackRef}
              style={{
                transform: `translateX(${currentTranslate}px)`,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' 
              }}
              className="flex gap-8 w-max px-2 select-none"
            >
              {activeItems.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemForDetail(item)}
                    className="w-[280px] sm:w-[340px] shrink-0 group bg-[#0D1210]/95 rounded-[2rem] border border-white/5 overflow-hidden hover:border-brand/40 shadow-xl cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(11,164,134,0.08)] flex flex-col relative"
                  >
                    {/* Card visual body block */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/60 select-none pointer-events-none">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Active gradient base */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070b09] via-transparent to-transparent opacity-85" />

                      {/* Overlap tag filters */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#070b09]/80 backdrop-blur-md text-[#F3C395] font-sans text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md border border-white/5"
                          >
                            {translateTag(tag)}
                          </span>
                        ))}
                      </div>

                      {/* Calorie pill representation */}
                      <div className="absolute bottom-4 left-4 flex items-center bg-[#0d1210]/90 backdrop-blur-md rounded-full px-2 py-0.5 text-[9px] font-mono text-white/70 border border-white/10">
                        <Leaf className="w-3 h-3 text-brand mr-1 fill-brand/20 rtl:mr-0 rtl:ml-1" />
                        <span>{item.calories} {language === 'en' ? 'kcal' : 'سعرة'}</span>
                      </div>
                    </div>

                    {/* Description labels inside card */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 select-none text-left rtl:text-right">
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight group-hover:text-brand transition-colors duration-300">
                          {translateItemName(item.name)}
                        </h3>
                        <p className="font-sans text-xs text-white/50 leading-relaxed line-clamp-2">
                          {translateDescription(item.description)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3.5 border-t border-white/5 mt-auto">
                        <span className="font-sans text-xs text-white/50">
                          {language === 'en' ? `${item.ingredients.length} organic elements` : `${item.ingredients.length} عناصر عضوية طبيعية`}
                        </span>

                        <span className="text-[9px] font-mono text-brand font-bold uppercase tracking-widest group-hover:translate-x-1.5 transition-transform duration-300">
                          {language === 'en' ? 'Explore details' : 'تفاصيل الطبق'} &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Integrated Horizontal scroll progress tracker fill bar */}
          <div className="max-w-xs mx-auto mt-6">
            <div className="h-[2px] bg-white/5 rounded-full relative overflow-hidden">
              <div 
                style={{ 
                  transform: `translateX(${scrollRatio}%)`,
                  width: '30%',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-brand to-accent-warm rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono text-white/30 uppercase tracking-widest mt-2 px-1">
              <span>{language === 'en' ? 'Origin' : 'البداية'}</span>
              <span>{language === 'en' ? 'Horizon' : 'أفق العرض'} ({Math.round(scrollRatio)}%)</span>
              <span>{language === 'en' ? 'Limit' : 'اليسار الأقصى'}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 4. PREMIUM FULL-SCREEN SLIDEOVER DRAWER/MODAL FOR DETAILED DISH */}
      <AnimatePresence>
        {selectedItemForDetail && (
          <>
            {/* Modal glass backdrop background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemForDetail(null)}
              className="fixed inset-0 bg-[#070B09]/90 backdrop-blur-md z-50 pointer-events-auto"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[650px] max-h-[85vh] bg-[#0d1210] border border-brand/30 rounded-[2.5rem] z-50 overflow-y-auto shadow-2xl pointer-events-auto border-t-[#F3C395] flex flex-col"
            >
              {/* Image banner inside modal */}
              <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
                <img
                  src={selectedItemForDetail.image}
                  alt={selectedItemForDetail.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1210] to-transparent opacity-90" />
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedItemForDetail(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all cursor-pointer border border-white/5"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left overlay headers */}
                <div className="absolute bottom-4 left-6 space-y-1 text-left rtl:text-right rtl:right-6 rtl:left-auto">
                  <span className="inline-block bg-brand text-black font-sans text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    {getTabLabel(selectedItemForDetail.category)}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {translateItemName(selectedItemForDetail.name)}
                  </h3>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-left rtl:text-right">
                
                <div className="space-y-4">
                  <p className="font-serif text-white/80 italic text-sm sm:text-base leading-relaxed">
                    "{translateDescription(selectedItemForDetail.description)}"
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#121815] p-3 rounded-xl border border-white/5 text-center">
                      <span className="block text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1">{language === 'en' ? 'Calories' : 'السعرات'}</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-white flex items-center justify-center">
                        <Flame className="w-3.5 h-3.5 text-brand mr-1 rtl:mr-0 rtl:ml-1" />
                        {selectedItemForDetail.calories} {language === 'en' ? 'kcal' : 'سعرة'}
                      </span>
                    </div>

                    <div className="bg-[#121815] p-3 rounded-xl border border-white/5 text-center">
                      <span className="block text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1">{language === 'en' ? 'Diet / Type' : 'تصنيف الوجبة'}</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-brand">
                        {translateTag(selectedItemForDetail.tags[0] || 'Vegan friendly')}
                      </span>
                    </div>

                    <div className="bg-[#121815] p-3 rounded-xl border border-white/5 text-center">
                      <span className="block text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1">{language === 'en' ? 'Wellness Core' : 'مؤشر الصحة'}</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#F3C395] flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5 text-accent-warm mr-1 rtl:mr-0 rtl:ml-1" />
                        {language === 'en' ? 'Organic' : 'طبيعي عضوي'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recipe Components */}
                <div className="border-t border-white/5 pt-5 space-y-3 text-left rtl:text-right">
                  <span className="block text-[10px] font-mono text-[#F3C395] font-bold uppercase tracking-widest flex items-center">
                    <ShieldCheck className="w-4 h-4 text-brand mr-1.5 rtl:mr-0 rtl:ml-1.5" />
                    {language === 'en' ? 'Kitchen-Prepared Gastro recipe Components' : 'مكونات الوجبة النباتية العضوية المحضرة بمطبخنا'}
                  </span>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {selectedItemForDetail.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="bg-[#121815] text-white/80 font-sans text-xs py-1.5 px-3 rounded-xl border border-white/5 hover:border-brand/20 transition-all duration-300"
                      >
                        {translateItemName(ing)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Add custom notes (e.g. extra spicy, no nuts)...' : 'أضف أي تفضيلات خاصة بالطبق (مثلاً: بدون مكسرات، زيادة عسل)...'}
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="w-full bg-[#121815] border border-white/15 focus:border-[#0BA486] focus:ring-1 focus:ring-[#0BA486] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-white/20 transition-all font-sans"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0 justify-end rtl:space-x-reverse">
                    <button
                      type="button"
                      onClick={() => setSelectedItemForDetail(null)}
                      className="px-5 py-3 border border-white/10 hover:bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white/70 hover:text-white cursor-pointer transition-colors text-center"
                    >
                      {language === 'en' ? 'Close' : 'إغلاق'}
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const descriptionText = `${translateItemName(selectedItemForDetail.name)}${customNote ? ` (Note: ${customNote})` : ''}`;
                        if (onReserveMeal) {
                          onReserveMeal(descriptionText);
                        } else {
                          try {
                            localStorage.setItem('pending_reservation_meal', descriptionText);
                          } catch (e) {}
                        }
                        setSelectedItemForDetail(null);
                      }}
                      className="px-7 py-3 bg-brand text-[#0D0F0D] rounded-xl text-xs font-black uppercase tracking-wider text-center cursor-pointer shadow-lg shadow-brand/10 hover:bg-brand-hover transition-all"
                    >
                      {language === 'en' ? '✨ Reserve Table with this Dish' : '✨ احجز طاولة مع هذا الطبق الفاخر'}
                    </motion.button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
