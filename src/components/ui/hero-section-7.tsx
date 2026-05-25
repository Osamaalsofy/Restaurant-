import { motion } from 'motion/react';
import { Leaf, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';

interface FloatingImage {
  src: string;
  alt: string;
  className: string;
}

interface FloatingFoodHeroProps {
  title: string;
  description: string;
  images: FloatingImage[];
  onExploreClick?: () => void;
  onCustomMixClick?: () => void;
}

export function FloatingFoodHero({
  title,
  description,
  images,
  onExploreClick = () => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  },
  onCustomMixClick = () => {
    const el = document.getElementById('botanical-mixer');
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}: FloatingFoodHeroProps) {
  const { language, t } = useLanguage();
  
  // Stagger sequence for landing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-32 pb-16 overflow-hidden z-10 select-none w-full">
      {/* Dynamic Background subtle ambient spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] h-[350px] sm:h-[450px] bg-brand/10 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* Decorative Aesthetical Coordinates */}
      <div className="hidden lg:block absolute left-12 top-28 font-mono text-[10px] text-brand/30 tracking-widest uppercase z-10">
        {language === 'en' ? 'PLANTIFY · SANCTUARY FOR NATURE' : 'بلانتيفاي · ملاذ الطبيعة والمذاق'}
      </div>
      <div className="hidden lg:block absolute right-12 top-28 font-mono text-[10px] text-brand/30 tracking-widest uppercase z-10">
        {language === 'en' ? 'LOC. 45°N 93°W · EST. 2026' : 'الموقع: مكة المكرمة · تأسس ٢٠٢٦'}
      </div>

      {/* Main Container Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mt-12 md:mt-16 relative z-10 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8 md:space-y-10"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-[#121815]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5"
          >
            <Leaf className="w-4 h-4 text-brand animate-pulse" />
            <span className="font-sans font-semibold text-[11px] sm:text-xs text-brand uppercase tracking-widest">
              {language === 'en' ? 'Gourmet Botanical Kitchen' : 'نظام المأكولات والعصائر النباتية الفاخرة'}
            </span>
          </motion.div>

          {/* Large Title */}
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-[1.05] sm:leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white/60 via-white/35 to-white/5 hover:from-white/80 hover:to-white/20 transition-all duration-700 cursor-default"
            style={{
              WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.25)',
            }}
          >
            {title.includes(' ') ? (
              <>
                {title.substring(0, title.lastIndexOf(' '))} <br />
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-brand/90 via-brand-hover to-[#F3C395]/85 italic font-normal"
                  style={{
                    WebkitTextStroke: '1px rgba(11, 164, 134, 0.18)',
                  }}
                >
                  {title.substring(title.lastIndexOf(' ') + 1)}
                </span>
              </>
            ) : (
              title
            )}
          </motion.h1>

          {/* Description Text */}
          <motion.p 
            variants={itemVariants}
            className="font-serif max-w-xl mx-auto text-white/70 text-base sm:text-lg md:text-xl font-normal leading-relaxed italic px-4"
          >
            "{description}"
          </motion.p>

          {/* Interact Button Panel */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(11, 164, 134, 0.45)', y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreClick}
              className="relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-brand text-[#0A0F0D] rounded-full font-sans text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer group/hero-btn"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/hero-btn:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              <span>{language === 'en' ? 'Order Gourmet Selections' : 'طلب الوجبات الفاخرة 🍽️'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#F3C395', 
                backgroundColor: 'rgba(243, 195, 149, 0.08)',
                boxShadow: '0 0 20px rgba(243, 195, 149, 0.2)',
                y: -2 
              }}
              whileTap={{ scale: 0.97 }}
              onClick={onCustomMixClick}
              className="relative overflow-hidden w-full sm:w-auto px-8 py-4 border border-accent-warm/40 text-accent-warm rounded-full font-sans text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer group/hero-btn2"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent-warm/15 to-transparent -translate-x-full group-hover/hero-btn2:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              <span>{language === 'en' ? 'Fruit Smoothie Mixer' : 'مبتكر خلاط العصائر 🍹'}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Staggered Floating Food Canvas (Rendering exact user arrays with organic delay) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.3 + index * 0.15,
              type: 'spring',
              stiffness: 50,
            }}
            style={{
              // Adding different animation delays so each item floats at its own speed
              animationDelay: `${index * 1.3}s`,
              animationDuration: `${6 + index * 1.5}s`,
            }}
            className={`absolute pointer-events-auto hover:scale-110 active:scale-95 transition-transform duration-300 cursor-grab active:cursor-grabbing hover:z-30 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] ${img.className}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>

      {/* Down Floating Prompter */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center space-y-2 mt-4 cursor-pointer hover:opacity-80 z-10"
        onClick={onExploreClick}
      >
        <span className="font-sans text-[10px] font-bold tracking-widest text-[#0BA486] uppercase">
          {language === 'en' ? "Scroll Down to Chef's Menu" : 'انزل للأسفل لقائمة الطاهي الحصري'}
        </span>
        <div className="w-7 h-7 rounded-full border border-brand/20 flex items-center justify-center bg-bg-main/60 backdrop-blur-sm shadow-sm text-brand">
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </motion.div>
    </section>
  );
}
