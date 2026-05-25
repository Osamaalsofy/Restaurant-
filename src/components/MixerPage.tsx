/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Beaker, 
  Sparkles, 
  Shuffle, 
  Check, 
  User, 
  Phone, 
  Ticket, 
  Calendar, 
  Clock, 
  Utensils, 
  ArrowLeft, 
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  QrCode,
  CheckCircle,
  Hash,
  Activity,
  Trash2
} from 'lucide-react';
import { ElixirIngredient } from '../types';
import { ELIXIR_INGREDIENTS } from '../data/menu';
import { encodeToken, decodeToken } from '../utils/token';
import { useLanguage } from '../utils/LanguageContext';

interface MixerPageProps {
  onBackToHome?: () => void;
  onReserveMeal?: (mealDescription: string) => void;
}

const COUNTRY_FORMATS = [
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+1', flag: '🇺🇸', name: 'USA/CA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+966', flag: '🇸🇦', name: 'KSA' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
];

interface FormulatedOrder {
  id: string; // Token ID e.g., PLA-MXR-4921
  customerName: string;
  customerPhone: string;
  elixirName: string;
  description: string;
  base: ElixirIngredient;
  botanical?: ElixirIngredient;
  essence: ElixirIngredient;
  addon?: ElixirIngredient;
  orderTime: string;
}

export default function MixerPage({ onBackToHome, onReserveMeal }: MixerPageProps) {
  const { language, t, translateItemName, translateDescription, translateIngredient, translateTag, translateBenefits } = useLanguage();

  // Mixer Selection States
  const [selectedBase, setSelectedBase] = useState<ElixirIngredient | null>(null);
  const [selectedEssence, setSelectedEssence] = useState<ElixirIngredient | null>(null);
  const [selectedAddon, setSelectedAddon] = useState<ElixirIngredient | null>(null);

  // Form & Voucher States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [mixerCountryCode, setMixerCountryCode] = useState('+20');
  const [generatedPass, setGeneratedPass] = useState<FormulatedOrder | null>(null);
  const [activeFares, setActiveFares] = useState<FormulatedOrder[]>([]);
  const [viewedPass, setViewedPass] = useState<FormulatedOrder | null>(null);

  // Auto-restore ticket pass from URL search query on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ticketToken = params.get('ticket');
      if (ticketToken) {
        const decoded = decodeToken<FormulatedOrder>(ticketToken);
        if (decoded) {
          setViewedPass(decoded);
        }
      }
    } catch (e) {
      console.error('Error auto-restoring ticket token URL:', e);
    }
  }, []);

  // Redemption & Coupon Checkout states (fixes blank coupon pages)
  const [redemptionMethod, setRedemptionMethod] = useState<'none' | 'gateway' | 'coupon'>('none');
  const [couponNumber, setCouponNumber] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redemptionSuccess, setRedemptionSuccess] = useState(false);
  const [smokeActive, setSmokeActive] = useState(false);
  const [redeemedCouponValue, setRedeemedCouponValue] = useState('');

  // Alchemical Blending Progress & Prep States
  const [compoundingState, setCompoundingState] = useState<'idle' | 'mixing' | 'success'>('idle');
  const [compoundingProgress, setCompoundingProgress] = useState(0);
  const [compoundingLog, setCompoundingLog] = useState('');
  const [savedCompletedPass, setSavedCompletedPass] = useState<FormulatedOrder | null>(null);
  const [mixerWhatsappStatus, setMixerWhatsappStatus] = useState<{
    success: boolean;
    simulated?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const [showClearConfirm, setShowClearConfirm] = useState(false);

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

  // Load existing formulation passes from localStorage on mount
  useEffect(() => {
    try {
      const savedPasses = localStorage.getItem('plantify_formulated_tickets');
      if (savedPasses) {
        setActiveFares(JSON.parse(savedPasses));
      }
    } catch (e) {
      console.error('Error loading alchemical tokens:', e);
    }
  }, []);

  // Sync and restore selections from home page preview mixer
  useEffect(() => {
    try {
      const savedBase = localStorage.getItem('mixer_selected_base');
      const savedEssence = localStorage.getItem('mixer_selected_essence');
      const savedAddon = localStorage.getItem('mixer_selected_addon');

      if (savedBase) {
        setSelectedBase(JSON.parse(savedBase));
        localStorage.removeItem('mixer_selected_base');
      }
      if (savedEssence) {
        setSelectedEssence(JSON.parse(savedEssence));
        localStorage.removeItem('mixer_selected_essence');
      }
      if (savedAddon) {
        setSelectedAddon(JSON.parse(savedAddon));
        localStorage.removeItem('mixer_selected_addon');
      }
    } catch (e) {
      console.error('Error restoring mixer selections:', e);
    }
  }, []);

  // Save formulation passes to localStorage
  const savePasses = (newPasses: FormulatedOrder[]) => {
    setActiveFares(newPasses);
    try {
      localStorage.setItem('plantify_formulated_tickets', JSON.stringify(newPasses));
    } catch (e) {
      console.error('Error saving alchemical tokens:', e);
    }
  };

  const selectedCount = [selectedBase, selectedEssence, selectedAddon].filter(Boolean).length;

  // Cumulative height resolver - always rises, never moves down upon selecting options
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

  // Resolves the top boundary ingredient color for the wave cap overlay
  const getTopColor = () => {
    if (selectedAddon) return selectedAddon.color;
    if (selectedEssence) return selectedEssence.color;
    if (selectedBase) return selectedBase.color;
    return 'rgba(11, 164, 134, 0.45)';
  };

  // Resets redemption state to show the fresh clean ticket modal as intended
  const handleViewPass = (pass: FormulatedOrder) => {
    setRedemptionSuccess(false);
    setRedemptionMethod('none');
    setCouponNumber('');
    setViewedPass(pass);
  };

  const getElixirWhatsAppUrl = (pass: FormulatedOrder, recipientNumber: string) => {
    // Generate self-contained URL token for instant alchemical pass rendering
    const token = encodeToken(pass);
    const deepLink = `${window.location.origin}/?ticket=${token}`;

    const text = `━━━━━━━━━━━━━━━━━━━━
🌱 *PLANTIFY SEED TO GLASS SANCTUARY* 🌱
━━━━━━━━━━━━━━━━━━━━
🎟️ *ALCHEMICAL COMPOUND TICKET*
🔑 *TICKET CODE:* ${pass.id}
🧪 *STATUS:* Ready at Beechwood Bar
━━━━━━━━━━━━━━━━━━━━
👤 *ALCHEMIST CLIENT:* ${pass.customerName}
📱 *CLEARING PHONE:* ${pass.customerPhone}
🍹 *ACTIVE COMPOUND:* ${pass.elixirName}
⏱ *TIME COMPOUNDED:* ${pass.orderTime}
━━━━━━━━━━━━━━━━━━━━
🌾 *RECIPE COMPOSITION CRITERIA:*
_\" ${pass.description} \"_
━━━━━━━━━━━━━━━━━━━━
🌿 *Presented to the lounge cashier & manager on duty for instant formulation dispatch.*
📍 *Direct Portal Verification:* ${deepLink}`;

    const cleanNum = recipientNumber.replace(/\+/g, '').replace(/\s+/g, '');
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  // Safe wrapper for claiming newly generated tickets
  const handleClaimPass = () => {
    if (savedCompletedPass) {
      setRedemptionSuccess(false);
      setRedemptionMethod('none');
      setCouponNumber('');
      setGeneratedPass(savedCompletedPass);
    }
    setCompoundingState('idle');
  };

  // Automated compounding simulation timer
  useEffect(() => {
    if (compoundingState !== 'mixing') return;

    const logs = language === 'ar' ? [
      `عصر قاعدة عصير ${selectedBase ? translateIngredient(selectedBase.name) : 'الفاكهة'} العضوية الطازجة...`,
      'صَب الخمائر والإنزيمات الحية اللذيذة والفيتامينات الطبيعية الغنية...',
      `خلط ودمج مستحلب حليب ${selectedEssence ? translateIngredient(selectedEssence.name) : 'الكريمي البارد'}...`,
      selectedAddon ? `إضافة قطرات ولمسة من التزيين الفاخر: ${translateIngredient(selectedAddon.name)}...` : 'موازنة العناصر وصولاً لمنتهى القوام المخملي الناعم...',
      'توقيع وطباعة بطاقة تركيبة الوصفة الرقمية الخاصة بك للإرسال...',
      'إرسال تفاصيل الوصفة والمقادير إلى منفذ التحضير لتجهيز كوبك!'
    ] : [
      `Squeezing fresh organic ${selectedBase?.name || 'fruit'} base...`,
      'Pouring delicious raw enzymes and rich natural vitamins...',
      `Swirling thick and creamy chilled ${selectedEssence?.name || 'milk filling'}...`,
      selectedAddon ? `Adding gourmet topping drop of ${selectedAddon.name}...` : 'Styling elements to peak creamy smoothness...',
      'Signing digital recipe formulation ticket with unique bar dispatch...',
      'Transmitting recipe dispatch to Beechwood Lounge register!'
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      currentLogIdx++;
      if (currentLogIdx < logs.length) {
        setCompoundingLog(logs[currentLogIdx]);
        setCompoundingProgress(Math.floor((currentLogIdx / logs.length) * 100));
      } else {
        clearInterval(interval);
        setCompoundingProgress(100);
        setCompoundingLog('Your custom smoothie has been formulated!');

        // Show completed landing screen
        setTimeout(() => {
          setCompoundingState('success');
        }, 150);
      }
    }, 350); // Snappy compounding simulation speed

    return () => clearInterval(interval);
  }, [compoundingState]);

  // Dynamic naming generator based on selections
  const generateElixirName = () => {
    if (!selectedBase || !selectedEssence) {
      return language === 'ar' ? 'توليفة المزيج قيد التحضير...' : 'Pending Fruit & Milk Blend';
    }
    if (language === 'ar') {
      const bName = translateIngredient(selectedBase.name);
      const eName = translateIngredient(selectedEssence.name);
      if (selectedAddon) {
        const aName = translateIngredient(selectedAddon.name);
        return `مزيج ${bName} مع ${eName} المزين بـ ${aName}`;
      }
      return `مزيج ${bName} مع ${eName}`;
    }
    const fruitWord = selectedBase.name.replace('Nectar', '').replace('Splash', '').replace('Purée', '').trim();
    const creamWord = selectedEssence.name.replace('Cream', '').replace('Milk', '').trim();
    const suffix = selectedAddon ? `with ${selectedAddon.name.split(' ').slice(-1)[0]}` : 'Smoothie';

    return `${fruitWord} & ${creamWord} ${suffix}`;
  };

  const getRecipeDescription = () => {
    if (!selectedBase || !selectedEssence) {
      return language === 'ar' ? 'مخطط التوليفة لم يكتمل بعد. يرجى تحديد قاعدة نكتار الفاكهة ومستحلب الحليب الكريمي.' : 'Incomplete blend recipe. Please select a Fresh Fruit and a Creamy Filling base.';
    }

    if (language === 'ar') {
      const bDesc = translateBenefits(selectedBase.benefits);
      const eDesc = translateBenefits(selectedEssence.benefits);
      const suffix = selectedAddon 
        ? `. مزين بطبقة فاخرة ومتميزة من ${translateIngredient(selectedAddon.name)} (${translateBenefits(selectedAddon.benefits)}).`
        : '.';
      return `سموذي عضوي فاخر مركب خصيصاً بمزيج من ${translateIngredient(selectedBase.name)} (${bDesc}) مع ${translateIngredient(selectedEssence.name)} (${eDesc})${suffix}`;
    }

    const addonDesc = selectedAddon 
      ? `. It is finished with a luxury topping of ${selectedAddon.name} for a velvety texture and extra sweetness.` 
      : '.';
    return `An organic hand-ground smoothie premium custom blended with ${selectedBase.name} and ${selectedEssence.name}${addonDesc} Exceptionally rich, delicious, and nutrient-dense.`;
  };

  const getFauxGradient = () => {
    const baseColor = selectedBase ? selectedBase.color : '#FFB300';
    const escColor = selectedEssence ? selectedEssence.color : '#2E7D32';
    const addColor = selectedAddon ? selectedAddon.color : '';

    if (selectedCount === 0) {
      return 'linear-gradient(180deg, rgba(255,179,0,0.08) 0%, rgba(121,134,203,0.04) 100%)';
    }

    // Beautiful unified color gradient blending based on what is selected
    const colorsList: string[] = [];
    if (selectedAddon) colorsList.push(`${addColor}df`);
    if (selectedEssence) colorsList.push(`${escColor}e2`);
    if (selectedBase) colorsList.push(`${baseColor}eb`);

    if (colorsList.length === 1) {
      return `linear-gradient(180deg, ${colorsList[0]} 0%, ${colorsList[0]}88 100%)`;
    }

    return `linear-gradient(180deg, ${colorsList.join(', ')})`;
  };

  const handleRandomize = () => {
    const rBase = bases[Math.floor(Math.random() * bases.length)];
    const rEsc = essences[Math.floor(Math.random() * essences.length)];
    const rAdd = addons[Math.floor(Math.random() * addons.length)];
    setSelectedBase(rBase);
    setSelectedEssence(rEsc);
    setSelectedAddon(rAdd);
  };

  // Trigger registration form overlay
  const handleOpenForm = () => {
    if (!selectedBase || !selectedEssence) return;
    setIsFormOpen(true);
  };

  // Submit and initiate compounding loader
  const handleFormulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !selectedBase || !selectedEssence) return;

    const tokenNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit unique code
    const finalPhone = customerPhone.startsWith('+') ? customerPhone : `${mixerCountryCode}${customerPhone}`;
    const generatedOrder: FormulatedOrder = {
      id: `PLA-ALC-${tokenNumber}`,
      customerName,
      customerPhone: finalPhone,
      elixirName: generateElixirName(),
      description: getRecipeDescription(),
      base: selectedBase,
      essence: selectedEssence,
      addon: selectedAddon || undefined,
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setSavedCompletedPass(generatedOrder);
    setMixerWhatsappStatus(null);
    
    // Save to the ticket queue list immediately!
    const updated = [generatedOrder, ...activeFares];
    savePasses(updated);

    setIsFormOpen(false);

    // Prompt active mixing full screen sequence
    setCompoundingProgress(0);
    setCompoundingLog(`Squeezing and blending your custom smoothie...`);
    setCompoundingState('mixing');
  };

  const handleDeletePass = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = activeFares.filter(fare => fare.id !== id);
    savePasses(filtered);
    if (viewedPass?.id === id) setViewedPass(null);
  };

  return (
    <div className="relative min-h-screen bg-[#070b09] text-white overflow-hidden pb-24 pt-32">
      
      {/* Absolute decorative star backdrops */}
      <div className="absolute top-[10%] left-[8%] w-[350px] h-[350px] bg-brand/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[8%] w-[450px] h-[450px] bg-accent-warm/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Floating Back Button & Section Headline */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 border-b border-white/5 pb-8">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="group p-2.5 rounded-full border border-white/10 hover:border-brand/40 bg-[#121815]/90 hover:bg-[#1a2320] text-white transition-all duration-300 cursor-pointer flex items-center justify-center"
              title="Return to Sanctuary"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <span className="font-mono text-[9px] text-[#F3C395] font-extrabold tracking-widest uppercase block mb-1">
                Artisanal Fruit & Booster Lab
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Organic Fruit Smoothie Mixer
              </h1>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 bg-[#121815] px-4 py-2 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            <span className="font-mono text-[10px] text-white/60 tracking-wider">
              SMOOTHIE DISPATCH ACTIVE
            </span>
          </div>
        </div>

         {/* Studio Mixer Visual Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          
          {/* Selections column: Inputs (cols 1-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Base */}
            <div className="bg-[#0b0e0c]/60 p-5 rounded-2xl border border-white/5 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative group/row">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-mono text-[10px] text-accent-warm font-extrabold uppercase tracking-widest flex items-center">
                  <span className="w-5 h-5 bg-[#0BA486]/10 text-[#0BA486] rounded-full flex items-center justify-center text-[9px] font-black font-mono mr-2 border border-[#0BA486]/20">1</span>
                  Premium Organic Fruits & Berries Selection
                </span>
                <span className="font-mono text-[9px] text-[#0BA486] font-extrabold uppercase bg-[#0BA486]/10 px-2.5 py-0.5 rounded-full">Base Fruit Option</span>
              </div>
              
              {/* Horizontal Row styled picker with program buttons */}
              <div className="relative flex items-center group">
                <button 
                  type="button"
                  onClick={() => scrollRow('base-row-mp', 'left')}
                  className="absolute -left-3 z-20 w-8 h-8 rounded-full bg-[#0a0f0d]/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll fruits left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div 
                  id="base-row-mp"
                  className="flex overflow-x-auto gap-3 py-2 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth w-full"
                  role="listbox" 
                  aria-label="Organic Fruit Selection"
                >
                  {bases.map((base) => {
                    const selected = selectedBase?.id === base.id;
                    return (
                      <button
                        key={base.id}
                        type="button"
                        onClick={() => setSelectedBase(base)}
                        role="option"
                        aria-selected={selected}
                        className={`snap-start shrink-0 w-[140px] sm:w-[155px] p-3 rounded-xl border transition-all duration-150 cursor-pointer relative ${
                          selected
                            ? 'border-[#0BA486] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0EA587]/20 via-[#0a0f0d] to-[#070b09] shadow-[0_4px_12px_rgba(11,164,134,0.15)] ring-1 ring-[#0BA486]/30'
                            : 'border-white/5 bg-[#0f1412]/60 hover:border-white/10 hover:bg-[#131b18]/80'
                        }`}
                      >
                        <div className="flex items-center space-x-2 sm:space-x-2.5">
                          <span className="text-xl sm:text-2xl select-none shrink-0" role="img" aria-label={base.name}>{base.emoji || '🥭'}</span>
                          <span className={`font-sans text-[10.5px] sm:text-xs font-black tracking-tight leading-tight whitespace-normal text-start break-words ${selected ? 'text-accent-warm' : 'text-stone-300'}`}>{translateIngredient(base.name)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button 
                  type="button"
                  onClick={() => scrollRow('base-row-mp', 'right')}
                  className="absolute -right-3 z-20 w-8 h-8 rounded-full bg-[#0a0f0d]/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll fruits right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Detail Card panel */}
              <AnimatePresence mode="wait">
                {selectedBase ? (
                  <motion.div 
                    key={selectedBase.id}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start space-x-3 min-h-[72px]"
                  >
                    <span className="text-2xl select-none shrink-0" role="img" aria-label={selectedBase.name}>{selectedBase.emoji}</span>
                    <div className="space-y-0.5 text-left">
                      <h5 className="font-serif text-[13px] font-black text-accent-warm leading-tight">{translateIngredient(selectedBase.name)}</h5>
                      <p className="text-[10px] text-white/70 leading-normal font-sans">{translateDescription(selectedBase.description)}</p>
                      <div className="text-[9px] text-[#0BA486] font-mono font-bold">✨ {translateBenefits(selectedBase.benefits)}</div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center min-h-[72px] text-white/40 text-[11px] italic">
                    {language === 'ar' ? 'حدد قاعدة عصير فاكهة طازجة من الأعلى لعرض الفوائد والمميزات...' : 'Select a core organic fruit base above to view nutritious benefits...'}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 2: Creamy Fillings & Milks */}
            <div className="bg-[#0b0e0c]/60 p-5 rounded-2xl border border-white/5 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative group/row">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-mono text-[10px] text-accent-warm font-extrabold uppercase tracking-widest flex items-center">
                  <span className="w-5 h-5 bg-[#0BA486]/10 text-[#0BA486] rounded-full flex items-center justify-center text-[9px] font-black font-mono mr-2 border border-[#0BA486]/20">2</span>
                  {language === 'ar' ? 'خلاصة حليب وكريمة المكسرات وجوز الهند' : 'Creamy Fillings, Yogurt & Plant Milks'}
                </span>
                <span className="font-mono text-[9px] text-[#0BA486] font-extrabold uppercase bg-[#0BA486]/10 px-2.5 py-0.5 rounded-full">{language === 'ar' ? 'قاعدة كريمية' : 'Creamy Base'}</span>
              </div>

              {/* Horizontal Row styled picker with program buttons */}
              <div className="relative flex items-center group">
                <button 
                  type="button"
                  onClick={() => scrollRow('essence-row-mp', 'left')}
                  className="absolute -left-3 z-20 w-8 h-8 rounded-full bg-[#0a0f0d]/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll fillings left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div 
                  id="essence-row-mp"
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
                        onClick={() => setSelectedEssence(esc)}
                        role="option"
                        aria-selected={selected}
                        className={`snap-start shrink-0 w-[140px] sm:w-[155px] p-3 rounded-xl border transition-all duration-150 cursor-pointer relative ${
                          selected
                            ? 'border-[#0BA486] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0EA587]/20 via-[#0a0f0d] to-[#070b09] shadow-[0_4px_12px_rgba(11,164,134,0.15)] ring-1 ring-[#0BA486]/30'
                            : 'border-white/5 bg-[#0f1412]/60 hover:border-white/10 hover:bg-[#131b18]/80'
                        }`}
                      >
                        <div className="flex items-center space-x-2 sm:space-x-2.5">
                          <span className="text-xl sm:text-2xl select-none shrink-0" role="img" aria-label={esc.name}>{esc.emoji || '🥛'}</span>
                          <span className={`font-sans text-[10.5px] sm:text-xs font-black tracking-tight leading-tight whitespace-normal text-start break-words ${selected ? 'text-accent-warm' : 'text-stone-300'}`}>{translateIngredient(esc.name)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button 
                  type="button"
                  onClick={() => scrollRow('essence-row-mp', 'right')}
                  className="absolute -right-3 z-20 w-8 h-8 rounded-full bg-[#0a0f0d]/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll fillings right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Detail Card panel */}
              <AnimatePresence mode="wait">
                {selectedEssence ? (
                  <motion.div 
                    key={selectedEssence.id}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start space-x-3 min-h-[72px]"
                  >
                    <span className="text-2xl select-none shrink-0" role="img" aria-label={selectedEssence.name}>{selectedEssence.emoji}</span>
                    <div className="space-y-0.5 text-left">
                      <h5 className="font-serif text-[13px] font-black text-accent-warm leading-tight">{translateIngredient(selectedEssence.name)}</h5>
                      <p className="text-[10px] text-white/70 leading-normal font-sans">{translateDescription(selectedEssence.description)}</p>
                      <div className="text-[9px] text-[#0BA486] font-mono font-bold">✨ {translateBenefits(selectedEssence.benefits)}</div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center min-h-[72px] text-white/40 text-[11px] italic">
                    {language === 'ar' ? 'اختر مستحلب حليب المكسرات أو كريمة جوز الهند من الأعلى...' : 'Select a creamy fill yogurt or dairy/plant milk above...'}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 3: Sweeteners & Crunch Toppings */}
            <div className="bg-[#0b0e0c]/60 p-5 rounded-2xl border border-white/5 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative group/row">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-mono text-[10px] text-accent-warm font-extrabold uppercase tracking-widest flex items-center">
                  <span className="w-5 h-5 bg-[#0BA486]/10 text-[#0BA486] rounded-full flex items-center justify-center text-[9px] font-black font-mono mr-2 border border-[#0BA486]/20">3</span>
                  {language === 'ar' ? 'المحليات العضوية والإضافات المقرمشة اللذيذة' : 'Gourmet Sweeteners & Crunchy Toppings'}
                </span>
                <span className="font-mono text-[9px] text-[#0BA486] font-extrabold uppercase bg-[#0BA486]/10 px-2.5 py-0.5 rounded-full">{language === 'ar' ? 'طبقة مخملية' : 'Velvet Toppings'}</span>
              </div>

              {/* Horizontal Row styled picker with program buttons */}
              <div className="relative flex items-center group">
                <button 
                  type="button"
                  onClick={() => scrollRow('addon-row-mp', 'left')}
                  className="absolute -left-3 z-20 w-8 h-8 rounded-full bg-[#0a0f0d]/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll toppings left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div 
                  id="addon-row-mp"
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
                        <div className="flex items-center space-x-2 sm:space-x-2.5">
                          <span className="text-xl sm:text-2xl select-none shrink-0" role="img" aria-label={add.name}>{add.emoji || '🍯'}</span>
                          <span className={`font-sans text-[10.5px] sm:text-xs font-black tracking-tight leading-tight whitespace-normal text-start break-words ${selected ? 'text-accent-warm' : 'text-stone-300'}`}>{translateIngredient(add.name)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button 
                  type="button"
                  onClick={() => scrollRow('addon-row-mp', 'right')}
                  className="absolute -right-3 z-20 w-8 h-8 rounded-full bg-[#0a0f0d]/95 border border-[#0BA486]/30 text-[#0BA486] hover:text-white hover:bg-[#0BA486]/30 transition-all flex items-center justify-center cursor-pointer shadow-xl"
                  aria-label="Scroll toppings right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Detail Card panel */}
              <AnimatePresence mode="wait">
                {selectedAddon ? (
                  <motion.div 
                    key={selectedAddon.id}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start space-x-3 min-h-[72px]"
                  >
                    <span className="text-2xl select-none shrink-0" role="img" aria-label={selectedAddon.name}>{selectedAddon.emoji}</span>
                    <div className="space-y-0.5 text-left">
                      <h5 className="font-serif text-[13px] font-black text-accent-warm leading-tight">{translateIngredient(selectedAddon.name)}</h5>
                      <p className="text-[10px] text-white/70 leading-normal font-sans">{translateDescription(selectedAddon.description)}</p>
                      <div className="text-[9px] text-[#0BA486] font-mono font-bold">✨ {translateBenefits(selectedAddon.benefits)}</div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center min-h-[72px] text-white/40 text-[11px] italic">
                    {language === 'ar' ? 'حدد إضافة محلي طبيعي أو مكسرات مقرمشة من الأعلى لعرض الفوائد...' : 'Select a sweetener or crunchy topping above to preview benefits...'}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Let nature decide block */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <p className="font-serif italic text-xs text-white/40">
                Want a surprise physiological alignment? Let nature select your composition.
              </p>
              <button
                type="button"
                onClick={handleRandomize}
                className="inline-flex items-center space-x-2 text-xs font-semibold text-accent-warm hover:text-white border border-[#F3C395]/30 hover:border-brand bg-[#121815] hover:bg-[#1a231f] px-5 py-2.5 rounded-full shadow-lg transition-all cursor-pointer text-right shrink-0"
              >
                <Shuffle className="w-3.5 h-3.5 animate-spin-reverse" />
                <span>Let Nature Decide</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visualizer Glass & Core Action (cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-gradient-to-b from-[#131b18]/90 to-[#0a0e0c]/95 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[480px]">
              
              {/* Overlay aesthetics */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent opacity-[0.03] pointer-events-none" />

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="p-1 px-[10px] bg-brand text-black font-mono text-[9px] font-black tracking-widest uppercase rounded-md">
                      Active Blender Liquid
                    </span>
                    <h3 className="font-serif text-2xl font-black text-white tracking-tight mt-3">
                      {generateElixirName()}
                    </h3>
                  </div>
                  <Beaker className="w-5 h-5 text-brand animate-pulse" />
                </div>

                {/* Glass Cylinder Graphic with fluids */}
                <div className="my-10 h-52 relative flex items-center justify-center">
                  
                  {/* Cylinder Base/Pedestal */}
                  <div className="absolute bottom-1 w-36 h-4 bg-gradient-to-b from-[#121815] to-[#070b09] border border-white/10 rounded-full z-0 shadow-lg" />
                  
                  {/* The Glass itself */}
                  <div className="w-28 sm:w-32 h-full rounded-b-[4.5rem] rounded-t-3xl border-[5px] border-white/20 backdrop-blur-md relative overflow-hidden flex flex-col justify-end z-10 shadow-[2px_15px_45px_rgba(0,0,0,0.85)]">
                    
                    {/* Measurement markings */}
                    <div className="absolute left-3.5 inset-y-6 flex flex-col justify-between font-mono text-[8px] text-white/30 pointer-events-none z-20 select-none leading-none">
                      <span>150ml—</span>
                      <span>100ml—</span>
                      <span>50ml—</span>
                    </div>

                    {/* Interactive single liquid filled glass */}
                    <div className="absolute inset-0 w-full h-full rounded-b-[4rem] overflow-hidden flex flex-col justify-end">
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
                        {/* Dynamic organic wave cap effect (visual surprise) */}
                        {selectedCount > 0 && (
                          <div className="absolute top-0 inset-x-0 h-6 overflow-hidden pointer-events-none -mt-4.5 z-20">
                            <svg viewBox="0 0 120 28" className="absolute left-0 w-[400px] h-full animate-liquid-wave-1 opacity-70" style={{ fill: getTopColor() }}>
                              <path d="M0 15 Q 30 0, 60 15 T 120 15 T 180 15 T 240 15 L 240 28 L 0 28 Z" />
                            </svg>
                            <svg viewBox="0 0 120 28" className="absolute left-0 w-[400px] h-full animate-liquid-wave-2 opacity-50" style={{ fill: getTopColor(), animationDelay: '-3s' }}>
                              <path d="M0 15 Q 30 25, 60 10 T 120 15 T 180 15 T 240 15 L 240 28 L 0 28 Z" />
                            </svg>
                          </div>
                        )}

                        {/* Micro-bubbles and gentle fluid ripples rising inside */}
                        {selectedCount > 0 && (
                          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
                            <div className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDuration: '2.5s' }} />
                            <div className="absolute bottom-12 left-12 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
                            <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                            <div className="absolute bottom-16 right-5 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDuration: '1.8s' }} />
                            
                            {/* Gentle surface ripple effect line */}
                            <div className="absolute top-0 inset-x-0 h-1.5 bg-white/30 blur-[0.5px]" />
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Shimmer reflection highlight on the Glass surface */}
                    <div className="absolute right-3.5 top-0 bottom-0 w-1.5 bg-white/10 pointer-events-none z-30 rounded-full" />
                  </div>

                  {/* Fumes rises */}
                  <div className="absolute -top-6 w-20 h-14 bg-white/5 blur-lg rounded-full animate-pulse opacity-20 pointer-events-none" />
                </div>

                {/* Formulation Details */}
                <div className="space-y-3.5 bg-black/40 p-4 rounded-2xl border border-white/5 mt-4">
                  <div>
                    <span className="block font-mono text-[9px] text-[#F3C395] font-extrabold uppercase tracking-widest text-left rtl:text-right">
                      {language === 'ar' ? 'مؤشرات الحيوية والصحة للسموذي' : 'Smoothie Wellness Metrics'}
                    </span>
                    <div className="text-white/80 text-xs font-bold flex items-center mt-0.5 justify-start">
                      <Flame className="w-3.5 h-3.5 text-brand mr-1.5 rtl:mr-0 rtl:ml-1.5" />
                      {selectedCount >= 2 ? (
                        <span>{language === 'ar' ? 'تقديري ٧٥ سعرة حرارية نظيفة · ١٠0٪ مزيج فاكهة طازجة' : 'Estimated 75 Clean Kcal · 100% Juicy Fresh Blend'}</span>
                      ) : (
                        <span className="text-white/45">{language === 'ar' ? 'حدد قاعدة الفاكهة ومستحلب الحليب لتحليل السعرات...' : 'Select fruit base and creamy filling to analyze...'}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="block font-mono text-[9px] text-[#F3C395] font-extrabold uppercase tracking-widest text-left rtl:text-right">
                      {language === 'ar' ? 'فوائد عصير الفاكهة المباشرة' : 'Direct Fruit Benefits'}
                    </span>
                    <p className="text-white/60 text-[11px] leading-relaxed mt-0.5 text-left rtl:text-right">
                      {selectedBase && selectedEssence ? (
                        <span>
                          {language === 'ar' ? (
                            `${translateBenefits(selectedBase.benefits)}. بالإضافة إلى قوام غني بـ ${translateIngredient(selectedEssence.name)} ${selectedAddon ? `مع لمسة مقرمشة لذيذة من ${translateIngredient(selectedAddon.name)}.` : ''}`
                          ) : (
                            `${selectedBase.benefits}. Coupled with velvety ${selectedEssence.name?.toLowerCase() || ''} ${selectedAddon ? `plus custom notes of crunchy ${selectedAddon.name?.toLowerCase() || ''}.` : ''}`
                          )}
                        </span>
                      ) : (
                        <span className="text-white/45">{language === 'ar' ? 'اختر نكتار الفاكهة الطازجة ومستحلب الحليب الكريمي لموازنة القيمة الغذائية.' : 'Choose pressed fruit nectar and creamy filling milks to balance nutrition.'}</span>
                      )}
                    </p>
                  </div>
                </div>

              </div>

              {/* Main CTA */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <button
                  type="button"
                  disabled={!selectedBase || !selectedEssence}
                  onClick={handleOpenForm}
                  className={`w-full font-sans text-xs font-black tracking-widest uppercase py-4 rounded-full transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 cursor-pointer ${
                    (selectedBase && selectedEssence)
                      ? 'bg-brand hover:bg-[#098e74] text-black shadow-brand/10 hover:shadow-brand/20 hover:scale-[1.01] active:scale-[0.98]'
                      : 'bg-[#121815]/85 text-white/30 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {(selectedBase && selectedEssence) ? 'Register Name & Prepare Smoothie' : 'Select Fruit Base & Creamy Filling to Blend'}
                  </span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Existing Formulation Passes list (Docket queue) */}
        {activeFares.length > 0 && (
          <div className="mt-20 border-t border-white/10 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center space-x-2.5">
                <Ticket className="w-5 h-5 text-brand" />
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Your Cashier Pass Tokens ({activeFares.length})
                  </h3>
                  <p className="font-sans text-white/50 text-xs mt-0.5">
                    Present any of these active formulation tokens directly to the cashier on duty to begin instant preparation.
                  </p>
                </div>
              </div>
              
              {showClearConfirm ? (
                <div className="flex items-center gap-2 self-start sm:self-center bg-red-500/10 border border-red-500/20 p-2 rounded-xl shrink-0">
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider px-1">Are you sure?</span>
                  <button
                    id="confirm-clear-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      savePasses([]);
                      setShowClearConfirm(false);
                    }}
                    className="px-2.5 py-1.5 bg-red-500 hover:bg-red-650 active:scale-95 text-white rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer"
                  >
                    Yes, Clear
                  </button>
                  <button
                    id="cancel-clear-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowClearConfirm(false);
                    }}
                    className="px-2.5 py-1.5 border border-white/20 hover:bg-white/5 active:scale-95 text-white/80 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  id="clear-all-tickets-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowClearConfirm(true);
                  }}
                  className="px-4 py-2 border border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10 active:scale-95 rounded-xl text-xs font-mono font-bold transition-all shrink-0 self-start sm:self-center cursor-pointer"
                >
                  Clear All Tokens
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeFares.map((order) => (
                <div
                  key={order.id}
                  onClick={() => handleViewPass(order)}
                  className="group bg-[#0D1210]/95 hover:bg-[#121916] rounded-2.5xl border border-white/5 hover:border-brand/30 p-5 cursor-pointer shadow-xl transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(11,164,134,0.06)] scale-100 active:scale-[0.99]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-brand font-black bg-[#0BA486]/10 px-2.5 py-0.5 rounded-md flex items-center">
                        <Hash className="w-3 h-3 text-brand mr-0.5" />
                        {order.id}
                      </span>
                      <span className="font-mono text-[9px] text-white/30 flex items-center">
                        <Clock className="w-3 h-3 justify-center mr-1" />
                        {order.orderTime}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-white tracking-tight mt-3 group-hover:text-accent-warm transition-colors">
                      {order.elixirName}
                    </h4>

                    <p className="font-sans text-white/50 text-[11px] mt-2 line-clamp-2 leading-relaxed">
                      {order.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="bg-[#070b09] text-white/70 font-sans text-[9px] px-2 py-0.5 rounded border border-white/5">
                        {order.base?.name ? translateIngredient(order.base.name) : (language === 'ar' ? 'قاعدة الفاكهة' : 'Fruit Base')}
                      </span>
                      {order.essence && (
                        <span className="bg-[#070b09] text-accent-warm font-sans text-[9px] px-2 py-0.5 rounded border border-white/5">
                          {translateIngredient(order.essence.name)}
                        </span>
                      )}
                      {order.addon && (
                        <span className="bg-[#070b09] text-[#F3C395] font-sans text-[9px] px-2 py-0.5 rounded border border-white/5">
                          {translateIngredient(order.addon.name)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5">
                    <div className="text-left">
                      <span className="block font-mono text-[8px] text-white/30 uppercase tracking-widest">Registrant</span>
                      <span className="font-sans text-xs font-semibold text-white leading-none">{order.customerName}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleDeletePass(order.id, e)}
                        className="p-1 px-1.5 text-white/30 hover:text-red-400 hover:bg-white/5 rounded transition-all cursor-pointer"
                        title="Discard token"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        View Ticket &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* POP-UP FORM MODAL (STEP 4 REGISTER NAME & PHONE) */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Modal glass backdrop background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-[#070b09]/90 backdrop-blur-md z-50 pointer-events-auto"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[540px] bg-[#0d1210] border border-[#0BA486]/30 rounded-[2rem] z-50 p-6 sm:p-8 overflow-y-auto max-h-[85vh] shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white pointer-events-auto flex flex-col border-t-[#F3C395]"
            >
              
               <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Beaker className="w-5 h-5 text-accent-warm" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                    {language === 'ar' ? 'تأكيد تركيب الوصفة العضوية' : 'Confirm Alchemical Composition'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="font-mono text-xs text-white/40 hover:text-white border border-white/10 px-2 py-0.5 rounded cursor-pointer"
                >
                  ESC
                </button>
              </div>

                           <form onSubmit={handleFormulateSubmit} className="space-y-4">
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-white/80">
                    {language === 'ar' ? 'الاسم الكامل الثلاثي واللقب' : 'Your Full Name'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      required
                      type="text"
                      placeholder={language === 'ar' ? 'مثال: عبد الله بن أحمد الشريف' : 'e.g., Alexander Alchemist'}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#0BA486] focus:ring-1 focus:ring-[#0BA486] rounded-xl px-4 py-3.5 pl-10 text-xs text-white focus:outline-none placeholder-white/20 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Phone number input with country format selector */}
                <div className="space-y-1.5" id="mixer-phone-container">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-white/80">
                    {language === 'ar' ? 'رقم الهاتف المحمول للمتابعة' : 'Your Phone Number'}
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code Selector Dropdown */}
                    <div className="relative shrink-0 w-[100px]">
                      <select
                        value={mixerCountryCode}
                        onChange={(e) => setMixerCountryCode(e.target.value)}
                        className="w-full bg-black/40 border border-white/15 rounded-xl py-3.5 pl-3 pr-8 text-xs text-white focus:outline-none focus:border-[#0BA486] appearance-none cursor-pointer font-sans h-[42px]"
                      >
                        {COUNTRY_FORMATS.map((c) => (
                           <option key={c.code} value={c.code} className="bg-[#070b09] text-white">
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-[9px]">
                        ▼
                      </div>
                    </div>

                    {/* Phone Number Field */}
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                      <input
                        required
                        type="tel"
                        placeholder={language === 'ar' ? 'مثال: 501234567' : 'e.g. 5550199'}
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-black/40 border border-white/15 focus:border-[#0BA486] focus:ring-1 focus:ring-[#0BA486] rounded-xl py-3.5 pl-10 pr-4 text-xs text-white focus:outline-none placeholder-white/20 transition-all font-mono h-[42px]"
                      />
                    </div>
                  </div>
                  <span className="block text-[8px] text-white/30 font-mono tracking-widest uppercase">
                    {language === 'ar' ? `التنسيق الدولي التلقائي: ${mixerCountryCode} ${customerPhone || '0000000000'}` : `Automatic format: ${mixerCountryCode} ${customerPhone || '0000000000'}`}
                  </span>
                </div>

                <p className="text-[10px] text-white/40 leading-relaxed pt-2 text-left rtl:text-right">
                  {language === 'ar' ? 'تسجيل توقيعك الشخصي يضمن إرسال هذه التوليفة العضوية برمز آمن مباشرة إلى سجل التحضير الفوري. سنتولى تأمين حجزك فور وصول طلبك!' : 'By registering your personal signature, we dispatch this custom compound with token security to our bar register. Cashiers will lock down your blend for immediate compounding.'}
                </p>

                {/* CTAs */}
                <div className="flex items-center space-x-3 pt-4 border-t border-white/5 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="w-1/2 py-3 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition-all"
                  >
                    {language === 'ar' ? 'إلغاء الأمر' : 'Cancel'}
                  </button>
                  <button
                    required
                    type="submit"
                    className="w-1/2 py-3 bg-brand hover:bg-brand-hover text-black font-sans text-xs font-black uppercase tracking-wider text-center cursor-pointer transition-all rounded-xl shadow-lg shadow-brand/10"
                  >
                    {language === 'ar' ? 'امزج وركّب الطلب الآن ✨' : 'Formulate & Register'}
                  </button>
                </div>

              </form>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* GENERATED PASS RESULT / CASHIER PASS TICKET MODAL */}
      <AnimatePresence>
        {(() => {
          const activePass = generatedPass || viewedPass;
          if (!activePass) return null;
          return (
            <motion.div
              key="ticket-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              {/* Backdrops */}
              <div
                onClick={() => {
                  setGeneratedPass(null);
                  setViewedPass(null);
                  setRedemptionMethod('none');
                  setRedemptionSuccess(false);
                  setCouponNumber('');
                }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              />

              {/* Glowing ticket overlay */}
              <motion.div
                initial={{ scale: 0.9, y: 25 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                className="relative w-full max-w-[480px] max-h-[92vh] my-auto bg-gradient-to-b from-[#111613] to-[#0A0D0C] border border-[#F3C395]/45 rounded-3xl shadow-2xl p-5 sm:p-7 text-white select-none flex flex-col z-10"
              >
                
                {/* Circular punch hole left and right to emulate theater ticket */}
                <div className="absolute top-1/2 -left-3.5 w-7 h-7 bg-black rounded-full border border-[#F3C395]/45 z-40 hidden sm:block" />
                <div className="absolute top-1/2 -right-3.5 w-7 h-7 bg-black rounded-full border border-[#F3C395]/45 z-40 hidden sm:block" />

                {isRedeeming ? (
                  /* SMOKE BREWING / CLEARING SIMULATION */
                  <div className="py-12 text-center space-y-8 flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0BA486] animate-spin" style={{ animationDuration: '6s' }} />
                      <div className="absolute -inset-3 rounded-full border border-brand/20 animate-pulse" />
                      
                      {/* Interactive vapor smoke icons */}
                      <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center relative z-10">
                        <Beaker className="w-10 h-10 text-brand animate-pulse" />
                      </div>

                      {/* Animated smoke vapors rising */}
                      <div className="absolute -top-4 w-12 h-8 bg-brand/15 blur-md rounded-full animate-ping pointer-events-none" />
                      <div className="absolute -top-8 w-8 h-6 bg-white/10 blur-md rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '0.4s' }} />
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-[#F3C395] font-black tracking-widest uppercase block animate-pulse">
                        SENSORY COAL SMOKE INJECTION
                      </span>
                      <h4 className="font-serif text-xl font-bold text-white">
                        {redemptionMethod === 'coupon' ? 'Verifying Coupon & Preparing Smoke' : 'Connecting Clearance Gateway'}
                      </h4>
                      <p className="font-mono text-[10px] text-[#0BA486] max-w-xs mx-auto animate-pulse">
                        {redemptionMethod === 'coupon' 
                          ? '⚡ Squeezing organic essences & infusing young pine smokes...' 
                          : '⚡ Activating Beechwood payment gateway protocols...'}
                      </p>
                    </div>

                    {/* Progress slider bar */}
                    <div className="w-2/3 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.8, ease: 'easeInOut' }}
                        className="h-full bg-brand"
                      />
                    </div>
                  </div>
                ) : redemptionSuccess ? (
                  /* REDEMPTION SUCCESS / VOUCHER CLEARED RECEIPTS SCREEN */
                  <div className="text-center py-6 space-y-6">
                    <div className="w-16 h-16 bg-[#0BA486]/20 border border-[#0BA486]/40 text-brand rounded-full flex items-center justify-center mx-auto shadow-lg shadow-brand/10">
                      <Check className="w-9 h-9 text-brand stroke-[2.5]" />
                    </div>

                    <div className="space-y-1">
                      <span className="bg-brand text-black font-mono font-bold text-[9px] px-2.5 py-0.5 rounded-md uppercase tracking-widest">
                        PASSPORT CLEARED & PROCESSED
                      </span>
                      <h3 className="font-serif text-2xl font-black text-[#F3C395] tracking-tight">
                        Compound Dispatched to Bar!
                      </h3>
                      <p className="text-white/60 text-xs max-w-sm mx-auto leading-relaxed">
                        Excellent, <strong className="text-white font-semibold">{activePass.customerName}</strong>! Your code is validated. We have directed the <strong className="text-brand">beechwood cedar smokes</strong> inside the laboratory now!
                      </p>
                    </div>

                    {/* Receipt Details panel */}
                    <div className="bg-black/40 border border-[#F3C395]/20 p-4.5 rounded-2xl text-left space-y-3 max-w-sm mx-auto text-xs">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-[9px] text-white/40 uppercase">Voucher Title</span>
                        <span className="font-serif text-[#F3C395] font-bold">{activePass.elixirName}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-[9px] text-white/40 uppercase">Clearing Route</span>
                        <span className="font-mono text-[10px] text-white/80 font-bold">
                          {redemptionMethod === 'coupon' ? `Custom Coupon (No. ${couponNumber || 'PROMO'})` : 'Lounge Card Cleared'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-[9px] text-white/40 uppercase">Outstanding Balance</span>
                        <span className="font-mono text-[11px] text-[#0BA486] font-extrabold bg-[#0BA486]/10 px-1.5 py-0.5 rounded">
                          $0.00 (Fully Paid)
                        </span>
                      </div>
                      <p className="text-[10px] text-white/40 leading-relaxed italic pt-1 border-t border-white/5 mt-1 border-dashed">
                        "Your sensory recipe coordinates are broadcast to our mixer screens. Est. queue wait: 3 mins."
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setGeneratedPass(null);
                        setViewedPass(null);
                        setRedemptionMethod('none');
                        setRedemptionSuccess(false);
                        setCouponNumber('');
                      }}
                      className="w-full bg-brand hover:bg-brand-hover text-black text-xs font-black uppercase py-4 rounded-full transition-all duration-300 shadow-xl"
                    >
                      Return to Studio Laboratory
                    </button>
                  </div>
                ) : (
                  /* MAIN REGISTERED TICKET MAIN VIEW WITH TWO ACTION OPTIONS */
                  <>
                    <div className="text-center pb-4 border-b border-dashed border-white/15 space-y-1 relative">
                      <div className="inline-flex p-2 bg-[#F3C395]/15 text-[#F3C395] rounded-full mb-1">
                        <CheckCircle className="w-5 h-5 text-accent-warm" />
                      </div>
                      <h4 className="font-mono text-[9px] text-accent-warm font-extrabold tracking-widest uppercase">
                        PLANTIFY SEED TO GLASS SANCTUARY
                      </h4>
                      <h3 className="font-serif text-xl font-black text-white tracking-tight">
                        Custom Alchemical Compound Pass
                      </h3>
                      <p className="text-[10px] text-white/50 leading-relaxed font-sans max-w-xs mx-auto">
                        Take this digital token directly to the lounge cashier or bartender on duty to redeem execution.
                      </p>
                    </div>

                    {/* Card Main specs */}
                    <div className="py-6 space-y-4 relative flex-1 text-center font-serif text-white/80 leading-relaxed border-b border-[#F3C395]/20 overflow-y-auto">
                      
                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div>
                          <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-0.5">Alchemist Client</span>
                          <span className="font-sans text-xs font-black text-white">{activePass.customerName}</span>
                        </div>

                        <div>
                          <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-0.5">Alchemical Order Title</span>
                          <span className="font-sans text-xs font-semibold text-brand block leading-normal">{activePass.elixirName}</span>
                        </div>

                        <div>
                          <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-0.5">Timestamp Registered</span>
                          <span className="font-mono text-xs text-white/70">{activePass.orderTime}</span>
                        </div>
                      </div>

                      {/* Complete composition breakdown (description displays here as requested) */}
                      <div className="bg-[#121815] p-3 text-left rounded-xl border border-white/5 space-y-1 mt-3">
                        <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest">Compounded Recipe Description</span>
                        <p className="font-sans text-[10px] text-white/70 leading-normal">{activePass.description}</p>
                      </div>

                    </div>

                    {/* Automatic Background Dispatch Delivery Tracker Section */}
                    <div className="pt-4 space-y-3">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-emerald-400 font-sans text-xs font-black uppercase tracking-widest animate-pulse">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>Done, your order has been placed.</span>
                        </div>
                        <div className="border-t border-white/5 pt-3 flex flex-col items-center justify-center space-y-1">
                          <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">Token Serial Number</span>
                          <span className="text-white text-xs tracking-wider bg-white/5 px-3 py-1 rounded font-black border border-white/10 uppercase font-mono">
                            {activePass.id}
                          </span>
                        </div>
                      </div>

                      {/* Close Ticket Button */}
                      <div className="pt-2 text-center space-y-4">

                        <button
                          onClick={() => {
                            setGeneratedPass(null);
                            setViewedPass(null);
                          }}
                          className="w-full bg-[#121815] border border-white/10 hover:border-brand/45 text-[#F3C395] text-xs font-black uppercase tracking-wider py-3.5 rounded-full cursor-pointer transition-all hover:scale-[1.01]"
                        >
                          Close Ticket View
                        </button>
                      </div>

                    </div>
                  </>
                )}

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Immersive Alchemical Blending & Preparation Status Panel */}
      <AnimatePresence>
        {compoundingState !== 'idle' && (
          <>
            {/* Dark glass backdrop with high blur to make details pop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#050806]/98 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto pointer-events-auto text-white animate-fadeIn"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                className="w-full max-w-lg bg-[#0d1210] border border-brand/20 rounded-[2.5rem] p-6 sm:p-10 text-center relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
              >
                {/* Decorative particles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F3C395]/10 rounded-full blur-3xl pointer-events-none" />

                {compoundingState === 'mixing' ? (
                  <div className="space-y-8 py-4">
                    {/* Alchemical loader cylinder animation */}
                    <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                      {/* Spin glow circles */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand/30 animate-spin" style={{ animationDuration: '8s' }} />
                      <div className="absolute -inset-2 rounded-full border border-[#F3C395]/20 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                      
                      {/* Main beating beaker icon */}
                      <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center animate-pulse">
                        <Beaker className="w-8 h-8 text-brand" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-[#F3C395] font-extrabold tracking-widest uppercase block animate-pulse">
                        INTERACTIVE KITCHEN TRANSMISSION
                      </span>
                      <h3 className="font-serif text-2xl font-black text-white tracking-tight">
                        Compounding Active Elements
                      </h3>
                      <p className="text-white/50 text-xs max-w-xs mx-auto">
                        Combining organic essences with adaptation enzymes inside our Beechwood laboratory.
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="space-y-2.5 max-w-sm mx-auto">
                      <div className="flex justify-between font-mono text-[10px] text-white/40">
                        <span>Progress Metric</span>
                        <span className="text-[#F3C395]">{compoundingProgress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${compoundingProgress}%` }}
                          transition={{ ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-[#0BA486] to-[#F3C395] rounded-full"
                        />
                      </div>
                    </div>

                    {/* Live alchemical pipeline logs */}
                    <div className="bg-black/40 border border-white/5 p-4 rounded-2xl min-h-[76px] flex items-center justify-center">
                      <motion.p
                        key={compoundingLog}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="font-mono text-[11px] text-[#0BA486] tracking-wide"
                      >
                        ⚡ {compoundingLog}
                      </motion.p>
                    </div>

                    <p className="font-sans text-[10px] text-white/30 italic">
                      Please standby. This ensures your customized physiologic compounds align perfectly.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 py-4">
                    {/* Success badge */}
                    <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-[#0BA486]/10 animate-ping opacity-75" />
                      <div className="w-20 h-20 bg-brand/10 border border-[#0BA486]/30 text-brand rounded-full flex items-center justify-center relative z-10">
                        <Check className="w-10 h-10 text-[#0BA486]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="p-1 px-[10px] bg-brand text-black font-mono text-[9px] font-black tracking-widest uppercase rounded-md inline-block">
                        ELIXIR ACTIVE & PREPARING!
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#F3C395] tracking-tight">
                        Success! Your mix is getting prepared!
                      </h3>
                      <p className="text-white/70 text-sm max-w-sm mx-auto leading-relaxed">
                        Excellent selection, <strong className="text-white font-semibold">{savedCompletedPass?.customerName}</strong>! Our master mixologists are assembling your organic elements immediately.
                      </p>
                    </div>

                    {/* Quick Docket Summary Box */}
                    <div className="bg-[#121815] border border-white/5 p-4 sm:p-5 rounded-2xl text-left space-y-3.5 max-w-md mx-auto">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-[9px] text-[#0BA486] font-bold uppercase tracking-wider">
                          BAR DOCKET CODE:
                        </span>
                        <span className="font-mono text-xs text-white font-extrabold bg-white/5 px-2 py-0.5 rounded">
                          {savedCompletedPass?.id}
                        </span>
                      </div>

                      <div className="text-[11px] space-y-1">
                        <p className="text-white/50">
                          <strong className="text-white/80">Active Compound:</strong> {savedCompletedPass?.elixirName}
                        </p>
                        <p className="text-white/50">
                          <strong className="text-white/80">Redeeming Phone:</strong> {savedCompletedPass?.customerPhone}
                        </p>
                        <p className="text-white/50 leading-relaxed italic mt-1.5 border-t border-white/5 pt-1.5">
                          "{savedCompletedPass?.description}"
                        </p>
                      </div>

                      {/* Ready status line */}
                      <div className="bg-brand/10 rounded-xl p-3 border border-brand/20 flex items-center space-x-3.5">
                        <div className="w-2 h-2 rounded-full bg-brand animate-ping shrink-0" />
                        <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-wider">
                          Dispersion status: Active in Preparation Queue (Est. wait 3 mins)
                        </span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3 pt-6 max-w-md mx-auto">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const descriptionText = `${savedCompletedPass?.elixirName || 'Artisanal Smoothie Blend'}`;
                          if (onReserveMeal) {
                            onReserveMeal(descriptionText);
                          } else {
                            try {
                              localStorage.setItem('pending_reservation_meal', descriptionText);
                            } catch (e) {}
                          }
                          setCompoundingState('idle');
                        }}
                        className="w-full bg-brand hover:bg-brand-hover text-[#0D0F0D] font-sans text-xs font-black tracking-widest py-4 rounded-full transition-all duration-300 shadow-xl shadow-brand/10 hover:shadow-brand/20 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#0D0F0D]" />
                        <span>✨ Reserve Table with this Blend</span>
                      </motion.button>

                      <button
                        onClick={() => {
                          setCompoundingState('idle');
                          setSelectedBase(null);
                          setSelectedEssence(null);
                          setSelectedAddon(null);
                          setCustomerName('');
                          setCustomerPhone('');
                        }}
                        className="w-full bg-transparent hover:bg-white/5 text-white/50 hover:text-white font-mono text-[10px] tracking-wider uppercase py-3 rounded-full border border-white/10 transition-all cursor-pointer"
                      >
                        Reset & Craft Another Formula
                      </button>
                    </div>

                  </div>
                )}

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
