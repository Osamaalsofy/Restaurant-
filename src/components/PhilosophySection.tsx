/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Sprout, Flame, Moon, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../utils/LanguageContext';

export default function PhilosophySection() {
  const { t, language } = useLanguage();

  const cards = [
    {
      icon: Sprout,
      title: t('ecoTitle'),
      description: t('ecoDesc'),
      accent: 'warm'
    },
    {
      icon: Flame,
      title: t('beechTitle'),
      description: t('beechDesc'),
      accent: 'rose'
    },
    {
      icon: Moon,
      title: t('adaptTitle'),
      description: t('adaptDesc'),
      accent: 'primary'
    }
  ];

  return (
    <section id="philosophy" className="relative py-24 sm:py-32 bg-bg-main/60 backdrop-blur-md z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="flex justify-center mb-4">
            <span className="p-2 bg-brand/10 text-brand rounded-full">
              <BookOpen className="w-5 h-5 text-accent-warm" />
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
            {t('philosophyHeader')}
          </h2>
          <div className="w-12 h-[2px] bg-accent-warm mx-auto mb-6" />
          <p className="font-sans text-white/75 text-sm sm:text-base leading-relaxed">
            {t('philosophySubtitle')}
          </p>
        </div>

        {/* Dynamic Multi-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Philosophy Pillars (Grid columns 1-7) */}
          <div className="lg:col-span-7 space-y-8">
            {cards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
                  className="card-3d-tilt bg-bg-alt/90 border border-[#F3C395]/10 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 rtl:space-x-reverse relative overflow-hidden"
                >
                   <div className={`p-4 rounded-xl flex-shrink-0 ${
                     card.accent === 'warm'
                       ? 'bg-accent-warm/15 text-accent-warm'
                       : card.accent === 'rose'
                       ? 'bg-accent-rose/15 text-accent-rose'
                       : 'bg-brand/10 text-brand'
                   }`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-accent-warm mb-2 text-left rtl:text-right">
                      {card.title}
                    </h3>
                    <p className="text-white/65 text-xs sm:text-sm leading-relaxed text-left rtl:text-right">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Column 2: Immersive Visual Framing (Grid columns 8-12) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-accent-rose/5 rounded-3xl filter blur-xl opacity-75 pointer-events-none" />

            {/* Main Editorial Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-[#F3C395]/20 z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80"
                alt="Chef gathering botanicals"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.08]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-left rtl:text-right">
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse mb-1 text-accent-warm">
                  <Award className="w-4 h-4" />
                  <span className="font-mono text-[9px] font-bold tracking-widest uppercase">{t('michelinTitle')}</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-white mb-1">
                  "{t('respectTruth')}"
                </h4>
                <p className="font-sans text-xs text-white/80 italic">
                  {t('chefQuote')}
                </p>
              </div>
            </motion.div>

            {/* Sourcing fact card */}
            <div className={`absolute -bottom-6 ${language === 'ar' ? '-right-6' : '-left-6'} bg-[#0E1512] text-white p-5 rounded-2xl shadow-lg z-20 max-w-[200px] border border-[#F3C395]/20`}>
              <span className="block font-mono text-[10px] uppercase tracking-widest font-bold mb-1 text-accent-warm text-left rtl:text-right">
                {t('factTitle')}
              </span>
              <p className="font-serif text-xs italic leading-snug text-white/80 text-left rtl:text-right">
                {t('factDesc')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
