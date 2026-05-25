import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsApp3DButton() {
  const [isOpen, setIsOpen] = useState(true);
  const whatsappNumber = "+201031142041";
  const formattedNumber = whatsappNumber.replace('+', '');
  const chatUrl = `https://wa.me/${formattedNumber}?text=Hello!%20I'd%20like%20to%20inquire%20about%20your%20botanical%20elixirs%20and%20reservations.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto flex items-center space-x-3">
      {/* Elegantly Floating Dismissible Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="hidden sm:flex items-center space-x-2 bg-[#0a0f0d]/95 backdrop-blur-md border border-[#F3C395]/20 hover:border-[#F3C395]/40 py-2.5 px-4 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.5)] cursor-pointer"
            onClick={() => window.open(chatUrl, '_blank')}
            id="whatsapp-tooltip"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#F3C395] font-mono font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                Herbalist Online
              </span>
              <span className="text-white/80 font-sans text-[11px] font-medium mt-0.5">
                Direct Bar Dispatch
              </span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="ml-2.5 text-white/30 hover:text-white/70 transition-colors p-0.5"
              title="Dismiss notification"
              aria-label="Close notification"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group block outline-none"
        aria-label="Connect with our Botanical Bar on WhatsApp"
        id="whatsapp-3d-button-link"
      >
        {/* Soft immersive ambient glow */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/15 blur-2xl group-hover:bg-emerald-500/25 transition-all duration-300 pointer-events-none" />

        {/* Outer Golden/Bronze Bezel Socket */}
        <div className="absolute inset-0 -m-[4px] rounded-full border border-[#F3C395]/20 bg-gradient-to-b from-[#1c1917] to-[#0c0a09] shadow-[0_4px_10px_rgba(0,0,0,0.8)]" />

        <motion.div
          className="relative w-15 h-15 rounded-full flex items-center justify-center select-none"
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ y: 3, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 450, damping: 14 }}
          id="whatsapp-3d-button-container"
        >
          {/* Extruded deep shadow under the physical orb */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-950 to-emerald-900 translate-y-2.5 shadow-[0_12px_24px_rgba(4,120,87,0.35)] transition-all duration-150 group-hover:translate-y-3.5 group-active:translate-y-1" />

          {/* Core Glossy 3D Claymorphic Orb */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857] border-t border-emerald-300 shadow-[inset_0_4px_10px_rgba(255,255,255,0.45),inset_0_-4px_10px_rgba(0,0,0,0.5)] transition-all duration-150 transform group-hover:-translate-y-0.5 group-active:translate-y-1 overflow-hidden">
            {/* Glossy Top Arc Curve Highlight */}
            <div className="absolute top-0.5 inset-x-1.5 h-1/2 rounded-full bg-gradient-to-b from-white/30 to-transparent filter blur-[0.6px]" />
            
            {/* Tiny Glass Flare Spot */}
            <div className="absolute top-2 left-3.5 w-2 h-1 bg-white/45 rounded-full rotate-[-15deg] filter blur-[0.4px]" />
          </div>

          {/* Highly stylized micro WhatsApp logo */}
          <div className="relative z-10 filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)] transform transition-transform duration-200 group-hover:scale-110">
            <svg
              className="w-7 h-7 fill-white shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 00-6.915-2.812C6.1 1.028 1.748 5.397 1.744 10.824c-.001 1.702.463 3.361 1.346 4.814l-.997 3.64 3.754-.974h.004zM18.06 14.85c-.33-.165-1.953-.964-2.253-1.074-.3-.11-.52-.165-.74.165-.22.33-.85 1.074-1.041 1.293-.19.22-.38.247-.71.082a9.122 9.122 0 01-2.63-1.625 10.057 10.057 0 01-1.822-2.265c-.19-.33-.02-.507.144-.672.15-.15.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.412-.027-.577-.082-.165-.74-1.785-1.013-2.445-.267-.64-.56-.554-.77-.565l-.66-.01c-.22 0-.58.08-.88.412-.3.33-1.155 1.127-1.155 2.747 0 1.62 1.182 3.19 1.346 3.41 1.6 1.1 3.4 1.6 5.3 1.1.412-.11.74-.22 1.013-.41.3-.11.58-.27.81-.48l.455-.45c.2-.218.25-.456.12-.66z" />
            </svg>
          </div>
        </motion.div>
      </a>
    </div>
  );
}
