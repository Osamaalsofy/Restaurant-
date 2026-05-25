/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Trophy, Shuffle, Check, Beaker, Apple, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ElixirIngredient, MenuItem } from '../types';
import { ELIXIR_INGREDIENTS } from '../data/menu';
import { useLanguage } from '../utils/LanguageContext';

interface BotanicalMixerProps {
  onAddCustomElixir: (item: MenuItem) => void;
  onOpenMixerPage?: () => void;
}

export default function BotanicalMixer({ onAddCustomElixir, onOpenMixerPage }: BotanicalMixerProps) {
  const { language, t, translateIngredient, translateDescription, translateBenefits } = useLanguage();

  // Mixer Selection States
  const [selectedBase, setSelectedBase] = useState<ElixirIngredient | null>(null);
  const [selectedEssence, setSelectedEssence] = useState<ElixirIngredient | null>(null);
  const [selectedAddon, setSelectedAddon] = useState<ElixirIngredient | null>(null);

  const [orderSuccessful, setOrderSuccessful] = useState(false);

  // Grouped Ingredients list
  const bases = ELIXIR_INGREDIENTS.filter((item) => item.category === 'base');
  const essences = ELIXIR_INGREDIENTS.filter((item) => item.category === 'essence');
  const addons = ELIXIR_INGREDIENTS.filter((item) => item.category === 'addon');

  // Scroll utility to slide horizontal line selectors smoothly
  const scrollRow = (id: string, direction: 'left' | 'right') => {
    const el = document.getElementById(id);
    if (!el) return;
    const scrollAmount = 240;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Dynamic naming generator based on selections
  const generateElixirName = () => {
    if (!selectedBase && !selectedEssence && !selectedAddon) {
      return language === 'en' ? 'Formulate Your Smoothie' : 'ابتكر تركيب عصيرك الخاص 🍹';
    }
    const baseName = selectedBase ? translateIngredient(selectedBase.name) : '';
    const essenceName = selectedEssence ? translateIngredient(selectedEssence.name) : '';
    const addonName = selectedAddon ? translateIngredient(selectedAddon.name) : '';

    if (language === 'ar') {
      let parts = [];
      if (baseName) parts.push(baseName);
      if (essenceName) parts.push(`مع ${essenceName}`);
      if (addonName) parts.push(`ولمسة من ${addonName}`);
      return parts.join(' ');
    }

    const fruitWord = selectedBase?.name ? selectedBase.name.replace('Nectar', '').replace('Splash', '').replace('Purée', '').trim() : '';
    const creamWord = selectedEssence?.name ? selectedEssence.name.replace('Cream', '').replace('Milk', '').trim() : '';
    const suffix = selectedAddon?.name ? `with ${selectedAddon.name.split(' ').slice(-1)[0]}` : 'Smoothie';
    
    if (fruitWord && creamWord) {
      return `${fruitWord} & ${creamWord} ${suffix}`;
    }
    if (fruitWord) {
      return `${fruitWord} Pure Smoothie`;
    }
    if (creamWord) {
      return `Velvety ${creamWord} Smoothie`;
    }
    return `Custom ${suffix}`;
  };

  const selectedCount = [selectedBase, selectedEssence, selectedAddon].filter(Boolean).length;

  const getLiquidHeight = () => {
    let activeTagsCount = 0;
    if (selectedBase) activeTagsCount++;
    if (selectedEssence) activeTagsCount++;
    if (selectedAddon) activeTagsCount++;

    if (activeTagsCount === 3) return '92%';
    if (activeTagsCount === 2) return '72%';
    if (activeTagsCount === 1) return '42%';
    return '0%';
  };

  const getTopColor = () => {
    if (selectedAddon) return selectedAddon.color;
    if (selectedEssence) return selectedEssence.color;
    if (selectedBase) return selectedBase.color;
    return 'rgba(11, 164, 134, 0.45)';
  };

  // Generate combined color representing the fluid mixture
  const getFauxGradient = () => {
    const baseColor = selectedBase ? selectedBase.color : '#FFB300';
    const escColor = selectedEssence ? selectedEssence.color : '#2E7D32';
    const addColor = selectedAddon ? selectedAddon.color : '';

    if (selectedCount === 0) {
      return 'linear-gradient(180deg, rgba(255,179,0,0.08) 0%, rgba(121,134,203,0.04) 100%)';
    }

    const colorsList: string[] = [];
    if (selectedAddon) colorsList.push(`${selectedAddon.color}df`);
    if (selectedEssence) colorsList.push(`${selectedEssence.color}e2`);
    if (selectedBase) colorsList.push(`${selectedBase.color}eb`);

    if (colorsList.length === 1) {
      return `linear-gradient(180deg, ${colorsList[0]} 0%, ${colorsList[0]}88 100%)`;
    }

    return `linear-gradient(180deg, ${colorsList.join(', ')})`;
  };

  // Handle randomly selecting elements (surprise factor)
  const handleRandomize = () => {
    const rBase = bases[Math.floor(Math.random() * bases.length)];
    const rEsc = essences[Math.floor(Math.random() * essences.length)];
    const rAdd = addons[Math.floor(Math.random() * addons.length)];
    setSelectedBase(rBase);
    setSelectedEssence(rEsc);
    setSelectedAddon(rAdd);
  };

  const handleOrderCustomDrink = () => {
    if (onOpenMixerPage) {
      if (selectedBase) localStorage.setItem('mixer_selected_base', JSON.stringify(selectedBase));
      else localStorage.removeItem('mixer_selected_base');

      if (selectedEssence) localStorage.setItem('mixer_selected_essence', JSON.stringify(selectedEssence));
      else localStorage.removeItem('mixer_selected_essence');

      if (selectedAddon) localStorage.setItem('mixer_selected_addon', JSON.stringify(selectedAddon));
      else localStorage.removeItem('mixer_selected_addon');

      onOpenMixerPage();
      return;
    }
    setOrderSuccessful(true);
    setTimeout(() => {
      setOrderSuccessful(false);
    }, 2500);
  };

  return (
    <section id="botanical-mixer" className="relative py-24 sm:py-32 bg-bg-main/80 backdrop-blur-md z-10 border-t border-white/5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="p-2 bg-brand/10 text-brand rounded-full">
              <Beaker className="w-5 h-5 text-accent-warm" />
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            {language === 'en' ? 'Fruit Smoothie Studio' : 'استوديو تركيب العصائر الطبيعية لبلانتيفاي'}
          </h2>
          <div className="w-12 h-[2px] bg-accent-warm mx-auto mb-6" />
          <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed">
            {language === 'en' 
              ? 'Mix and build your delicious custom fruit smoothie. Choose refreshing organic fruits, creamy yogurt fillings, and delicious organic sweeteners to make it incredibly smooth.'
              : 'قم بتركيب وابتكار التوليفة المفضلة والصحية لعصيرك اللذيذ. اختر نكتار الفواكه الاستوائية المنعشة، مستحلب الحليب الكريمي والمكسرات الطازجة.'}
          </p>
        </div>

        {/* Master Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Selections Column (Grid cols 1-7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            
            {/* Base Option Sets */}
            <div className="space-y-3 relative group/row">
              <div className="flex items-center justify-between">
                <span className="block font-mono text-xs text-[#0BA486] font-extrabold uppercase tracking-wider">
                  {language === 'en' ? '1. Select Organic Fruit Base' : '١. حدد قاعدة نكتار الفواكه الطبيعية 🍒'}
                </span>
                <span className="text-[10px] text-white/30 font-mono hidden sm:inline">
                  {language === 'en' ? 'Swipe or use arrows to slide lists' : 'مرر أو استخدم الأسهم للتصفح'}
                </span>
              </div>
              
              {/* Horizontal Row styled picker with program buttons */}
              <div className="relative flex items-center group">
                <button 
                  type="button"
                  onClick={() => scrollRow('base-row-bm', 'left')}
                  className="absolute -left-3 z-20 w-8 h-8 rounded-full bg-neutral-900/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl animate-pulse"
                  aria-label="Scroll fruits left"
                >
                  <ChevronLeft className="w-4 h-4 cursor-pointer" />
                </button>

                <div 
                  id="base-row-bm"
                  className="flex overflow-x-auto gap-3 py-2 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth w-full"
                  role="listbox" 
                  aria-label="Organic Fruit Selection"
                >
                  {bases.map((b) => {
                    const selected = selectedBase?.id === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBase(selected ? null : b)}
                        role="option"
                        aria-selected={selected}
                        className={`snap-start shrink-0 w-[140px] sm:w-[155px] p-3 rounded-xl border transition-all duration-150 cursor-pointer relative ${
                          selected
                            ? 'border-[#0BA486] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0EA587]/20 via-[#0a0f0d] to-[#070b09] shadow-[0_4px_12px_rgba(11,164,134,0.15)] ring-1 ring-[#0BA486]/30'
                            : 'border-white/5 bg-[#0f1412]/60 hover:border-white/10 hover:bg-[#131b18]/80'
                        }`}
                      >
                        <div className="flex items-center space-x-2 sm:space-x-2.5 rtl:space-x-reverse">
                          <span className="text-xl select-none shrink-0" role="img" aria-label={b.name}>{b.emoji || '🥭'}</span>
                          <span className={`font-sans text-[10.5px] sm:text-xs font-black tracking-tight leading-tight whitespace-normal text-start break-words ${selected ? 'text-accent-warm font-bold' : 'text-stone-300'}`}>{translateIngredient(b.name)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button 
                  type="button"
                  onClick={() => scrollRow('base-row-bm', 'right')}
                  className="absolute -right-3 z-20 w-8 h-8 rounded-full bg-neutral-900/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll fruits right"
                >
                  <ChevronRight className="w-4 h-4 cursor-pointer" />
                </button>
              </div>

              {/* Accessible description metadata box */}
              {selectedBase ? (
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start space-x-3 rtl:space-x-reverse min-h-[72px]">
                  <span className="text-2xl select-none shrink-0 border-r border-white/10 pr-3 rtl:pr-0 rtl:pl-3" role="img" aria-label={selectedBase.name}>{selectedBase.emoji}</span>
                  <div className="space-y-0.5 text-left rtl:text-right">
                    <h5 className="font-serif text-[13px] font-black text-accent-warm leading-tight">{translateIngredient(selectedBase.name)}</h5>
                    <p className="text-[10px] text-white/60 leading-normal font-sans">{language === 'en' ? selectedBase.description : translateDescription(selectedBase.description)}</p>
                    <div className="text-[9px] text-[#0BA486] font-mono font-bold">✨ {translateBenefits(selectedBase.benefits)}</div>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl border border-white/5 border-dashed bg-black/10 flex items-center justify-center min-h-[72px]">
                  <span className="text-[11px] text-white/30 font-mono">{language === 'en' ? 'Select an organic fruit base above' : 'حدد قاعدة نكتار فواكه طازجة من الأعلى'}</span>
                </div>
              )}
            </div>

            {/* Essence Option Sets */}
            <div className="space-y-3 relative group/row">
              <div className="flex items-center justify-between">
                <span className="block font-mono text-xs text-[#0BA486] font-extrabold uppercase tracking-wider">
                  {language === 'en' ? '2. Choose Creamy Milks & Fillings' : '٢. اختر مستحلب حليب المكسرات أو الكريمة 🥛'}
                </span>
              </div>
              
              <div className="relative flex items-center group">
                <button 
                  type="button"
                  onClick={() => scrollRow('essence-row-bm', 'left')}
                  className="absolute -left-3 z-20 w-8 h-8 rounded-full bg-neutral-900/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll fillings left"
                >
                  <ChevronLeft className="w-4 h-4 cursor-pointer" />
                </button>

                <div 
                  id="essence-row-bm"
                  className="flex overflow-x-auto gap-3 py-2 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth w-full"
                  role="listbox" 
                  aria-label="Creamy Fillings Selection"
                >
                  {essences.map((esc) => {
                    const selected = selectedEssence?.id === esc.id;
                    return (
                      <button
                        key={esc.id}
                        type="button"
                        onClick={() => setSelectedEssence(selected ? null : esc)}
                        role="option"
                        aria-selected={selected}
                        className={`snap-start shrink-0 w-[140px] sm:w-[155px] p-3 rounded-xl border transition-all duration-150 cursor-pointer relative ${
                          selected
                            ? 'border-[#0BA486] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0EA587]/20 via-[#0a0f0d] to-[#070b09] shadow-[0_4px_12px_rgba(11,164,134,0.15)] ring-1 ring-[#0BA486]/30'
                            : 'border-white/5 bg-[#0f1412]/60 hover:border-white/10 hover:bg-[#131b18]/80'
                        }`}
                      >
                        <div className="flex items-center space-x-2 sm:space-x-2.5 rtl:space-x-reverse">
                          <span className="text-xl select-none shrink-0" role="img" aria-label={esc.name}>{esc.emoji || '🥛'}</span>
                          <span className={`font-sans text-[10.5px] sm:text-xs font-black tracking-tight leading-tight whitespace-normal text-start break-words ${selected ? 'text-accent-warm font-bold' : 'text-stone-300'}`}>{translateIngredient(esc.name)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button 
                  type="button"
                  onClick={() => scrollRow('essence-row-bm', 'right')}
                  className="absolute -right-3 z-20 w-8 h-8 rounded-full bg-neutral-900/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll fillings right"
                >
                  <ChevronRight className="w-4 h-4 cursor-pointer" />
                </button>
              </div>

              {selectedEssence ? (
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start space-x-3 rtl:space-x-reverse min-h-[72px]">
                  <span className="text-2xl select-none shrink-0 border-r border-white/10 pr-3 rtl:pr-0 rtl:pl-3" role="img" aria-label={selectedEssence.name}>{selectedEssence.emoji}</span>
                  <div className="space-y-0.5 text-left rtl:text-right">
                    <h5 className="font-serif text-[13px] font-black text-accent-warm leading-tight">{translateIngredient(selectedEssence.name)}</h5>
                    <p className="text-[10px] text-white/60 leading-normal font-sans">{language === 'en' ? selectedEssence.description : translateDescription(selectedEssence.description)}</p>
                    <div className="text-[9px] text-[#0BA486] font-mono font-bold">✨ {translateBenefits(selectedEssence.benefits)}</div>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl border border-white/5 border-dashed bg-black/10 flex items-center justify-center min-h-[72px]">
                  <span className="text-[11px] text-white/30 font-mono">{language === 'en' ? 'Select a creamy filling above' : 'حدد مستحلب حليب أو كريمة للتركيب في الأعلى'}</span>
                </div>
              )}
            </div>

            {/* Toppings Option Sets */}
            <div className="space-y-3 relative group/row">
              <div className="flex items-center justify-between">
                <span className="block font-mono text-xs text-[#0BA486] font-extrabold uppercase tracking-wider">
                  {language === 'en' ? '3. Sweeteners & Delicious Crunchy Toppings' : '٣. المحليات العضوية والإضافات المقرمشة اللذيذة 🍯'}
                </span>
              </div>
              
              <div className="relative flex items-center group">
                <button 
                  type="button"
                  onClick={() => scrollRow('addon-row-bm', 'left')}
                  className="absolute -left-3 z-20 w-8 h-8 rounded-full bg-neutral-900/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll toppings left"
                >
                  <ChevronLeft className="w-4 h-4 cursor-pointer" />
                </button>

                <div 
                  id="addon-row-bm"
                  className="flex overflow-x-auto gap-3 py-2 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth w-full"
                  role="listbox" 
                  aria-label="Sweeteners & Crunchy Toppings Selection"
                >
                  {addons.map((add) => {
                    const selected = selectedAddon?.id === add.id;
                    return (
                      <button
                        key={add.id}
                        type="button"
                        onClick={() => setSelectedAddon(selected ? null : add)}
                        role="option"
                        aria-selected={selected}
                        className={`snap-start shrink-0 w-[140px] sm:w-[155px] p-3 rounded-xl border transition-all duration-150 cursor-pointer relative ${
                          selected
                            ? 'border-[#0BA486] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0EA587]/20 via-[#0a0f0d] to-[#070b09] shadow-[0_4px_12px_rgba(11,164,134,0.15)] ring-1 ring-[#0BA486]/30'
                            : 'border-white/5 bg-[#0f1412]/60 hover:border-white/10 hover:bg-[#131b18]/80'
                        }`}
                      >
                        <div className="flex items-center space-x-2 sm:space-x-2.5 rtl:space-x-reverse">
                          <span className="text-xl select-none shrink-0" role="img" aria-label={add.name}>{add.emoji || '🍯'}</span>
                          <span className={`font-sans text-[10.5px] sm:text-xs font-black tracking-tight leading-tight whitespace-normal text-start break-words ${selected ? 'text-accent-warm font-bold' : 'text-stone-300'}`}>{translateIngredient(add.name)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button 
                  type="button"
                  onClick={() => scrollRow('addon-row-bm', 'right')}
                  className="absolute -right-3 z-20 w-8 h-8 rounded-full bg-neutral-900/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll toppings right"
                >
                  <ChevronRight className="w-4 h-4 cursor-pointer" />
                </button>
              </div>

              {selectedAddon ? (
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start space-x-3 rtl:space-x-reverse min-h-[72px]">
                  <span className="text-2xl select-none shrink-0 border-r border-white/10 pr-3 rtl:pr-0 rtl:pl-3" role="img" aria-label={selectedAddon.name}>{selectedAddon.emoji}</span>
                  <div className="space-y-0.5 text-left rtl:text-right">
                    <h5 className="font-serif text-[13px] font-black text-accent-warm leading-tight">{translateIngredient(selectedAddon.name)}</h5>
                    <p className="text-[10px] text-white/60 leading-normal font-sans">{language === 'en' ? selectedAddon.description : translateDescription(selectedAddon.description)}</p>
                    <div className="text-[9px] text-[#0BA486] font-mono font-bold">✨ {translateBenefits(selectedAddon.benefits)}</div>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl border border-white/5 border-dashed bg-black/10 flex items-center justify-center min-h-[72px]">
                  <span className="text-[11px] text-white/30 font-mono">{language === 'en' ? 'Select a sweetener/topping above' : 'اختر إضافة محلي أو مكسرات مقرمشة من الأعلى'}</span>
                </div>
              )}
            </div>

            {/* Randomizer surprise helper */}
            <div className="flex items-center justify-start pt-4">
              <button
                onClick={handleRandomize}
                className="inline-flex items-center space-x-2 text-xs font-semibold text-accent-warm hover:text-white border border-white/10 bg-[#121815]/95 px-4 py-2 rounded-full shadow-sm hover:bg-[#1a231f] transition-all cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Let Nature Decide (Random Mix)' : 'دع الطبيعة تختار المزيج (خيار مفاجئ) 🎲'}</span>
              </button>
            </div>

          </div>

          {/* Right panel: Active Fluid Glass visualizer */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#131b18] to-[#0a0e0c] border border-white/5 hover:border-[#F3C395]/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent opacity-5 pointer-events-none" />

            <div>
              <div className="mb-4 text-left rtl:text-right">
                <span className="p-1 px-3 bg-[#0BA486] text-black font-mono text-[9px] font-extrabold tracking-widest uppercase rounded-full">
                  {language === 'en' ? 'Fresh Smoothie Blends' : 'عصائر بلانتيفاي المبتكرة'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight mt-3">
                  {generateElixirName()}
                </h3>
                <span className="font-mono text-xs text-white/40">{language === 'en' ? 'Fruity Custom Smoothie' : 'عصير فاكهة طبيعي مخصص'}</span>
              </div>

              {/* Glass Laboratory Graphic */}
              <div className="my-10 h-48 md:h-56 relative flex items-center justify-center">
                <div className="w-28 sm:w-32 h-full rounded-b-full rounded-t-xl border-[4px] border-white/10 shadow-2xl relative flex items-end justify-center overflow-hidden bg-black/40 backdrop-blur-[2px] z-10">
                  <div className="absolute inset-0 w-full h-full rounded-b-full overflow-hidden flex flex-col justify-end">
                    <motion.div
                      layout
                      initial={{ height: '0%' }}
                      animate={{ 
                        height: getLiquidHeight()
                      }}
                      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                      style={{ 
                        background: getFauxGradient(),
                        opacity: 0.82
                      }}
                      className="absolute left-0 right-0 bottom-0 shadow-[inset_0_8px_25px_rgba(255,255,255,0.3)] backdrop-blur-[1px] flex flex-col justify-end overflow-hidden"
                    >
                      {/* Dynamic organic wave cap effect */}
                      {selectedCount > 0 && (
                        <div className="absolute top-0 inset-x-0 h-6 overflow-hidden pointer-events-none -mt-4.5 z-25">
                          <svg viewBox="0 0 120 28" className="absolute left-0 w-[400px] h-full animate-liquid-wave-1 opacity-70" style={{ fill: getTopColor() }}>
                            <path d="M0 15 Q 30 0, 60 15 T 120 15 T 180 15 T 240 15 L 240 28 L 0 28 Z" />
                          </svg>
                          <svg viewBox="0 0 120 28" className="absolute left-0 w-[400px] h-full animate-liquid-wave-2 opacity-50" style={{ fill: getTopColor(), animationDelay: '-3s' }}>
                            <path d="M0 15 Q 30 25, 60 10 T 120 15 T 180 15 T 240 15 L 240 28 L 0 28 Z" />
                          </svg>
                        </div>
                      )}

                      {/* Micro-bubbles rising inside */}
                      {selectedCount > 0 && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
                          <div className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDuration: '2.5s' }} />
                          <div className="absolute bottom-12 left-12 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
                          <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                          <div className="absolute bottom-16 right-5 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDuration: '1.8s' }} />
                          <div className="absolute top-0 inset-x-0 h-1.5 bg-white/30 blur-[0.5px]" />
                        </div>
                      )}
                    </motion.div>
                  </div>

                  <div className="absolute left-3 inset-y-6 flex flex-col justify-between font-mono text-[9px] text-white/30 pointer-events-none z-10 leading-none">
                    <span>150ml</span>
                    <span>100ml</span>
                    <span>50ml</span>
                  </div>
                </div>

                <div className="absolute -top-6 w-16 h-12 bg-white/5 blur-md rounded-full animate-pulse opacity-20 pointer-events-none" />
              </div>

              {/* Tallying nutrition/benefit notes */}
              <div className="space-y-3.5 bg-black/30 p-4 rounded-xl border border-white/5 text-left rtl:text-right">
                <div>
                  <span className="block font-mono text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">
                    {language === 'en' ? 'Smoothie Wellness Metrics' : 'مؤشرات القيمة الغذائية للمزيج 📊'}
                  </span>
                  <div className="flex items-center text-xs text-white/80 font-medium">
                    <Apple className="w-3.5 h-3.5 text-brand mr-1 rtl:mr-0 rtl:ml-1" />
                    {language === 'en' 
                      ? 'Estimated 75 Organic Kcal · 100% Juicy Fresh Blend' 
                      : 'سعرات عضوية مقدرة بـ ٧٥ سعرة حرارية · جودة ممتازة'}
                  </div>
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">
                    {language === 'en' ? 'Direct Fruit Benefits' : 'فوائد المكونات النشطة المباشرة'}
                  </span>
                  <p className="text-white/60 text-xs leading-normal">
                    {language === 'en'
                      ? `${selectedBase?.benefits || 'Vitamins boost'}. Coupled with delicate notes of ${selectedEssence?.name?.toLowerCase() || 'creamy milk'} & ${selectedAddon?.benefits?.toLowerCase() || 'sweetness swirled'}.`
                      : `عصير مغذٍ بفوائد: ${selectedBase ? selectedBase.benefits : 'فيتامينات طبيعية'}. ممزوج مع حليب ${selectedEssence ? translateIngredient(selectedEssence.name) : 'كريمي'} ولمسات سكرية من ${selectedAddon ? translateIngredient(selectedAddon.name) : 'محليات عضوية'}.`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Core Action */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                onClick={handleOrderCustomDrink}
                className={`w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-4 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-md cursor-pointer ${
                  orderSuccessful
                    ? 'bg-[#0BA486] text-black font-extrabold hover:brightness-105'
                    : 'bg-brand text-black font-extrabold hover:bg-brand-hover active:scale-[0.98]'
                }`}
              >
                {orderSuccessful ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'en' ? 'Custom Elixir Formulated!' : 'تم صياغة المزيج الخاص بك بنجاح!'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>{language === 'en' ? 'Blend & Formulate Elixir' : 'صياغة وتركيب عصيرك المميز كلياً ✨'}</span>
                  </>
                )
                }
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
