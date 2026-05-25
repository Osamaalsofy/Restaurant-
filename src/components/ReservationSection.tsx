/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useEffect } from 'react';
import { Sparkles, Calendar, Clock, Users, Mail, User, BookOpen, CheckCircle, Compass, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReservationDetails } from '../types';
import { encodeToken, decodeToken } from '../utils/token';
import { useLanguage } from '../utils/LanguageContext';

interface ReservationSectionProps {
  onNavigateToMenu?: () => void;
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

export default function ReservationSection({ onNavigateToMenu }: ReservationSectionProps) {
  const { language, t, translateItemName } = useLanguage();

  const [formData, setFormData] = useState<ReservationDetails>({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: '2026-05-24',
    time: '18:30',
    dietaryNotes: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('+20');
  const [selectedDishesList, setSelectedDishesList] = useState<string[]>([]);

  // Parse query token on initial render to load dynamic templates
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('reservation');
      if (token) {
        const decoded = decodeToken<{
          code: string;
          name: string;
          phone: string;
          email: string;
          guests: number;
          date: string;
          time: string;
          dietaryNotes: string;
        }>(token);
        
        if (decoded) {
          setFormData({
            name: decoded.name,
            email: decoded.email,
            phone: decoded.phone,
            guests: decoded.guests,
            date: decoded.date,
            time: decoded.time,
            dietaryNotes: decoded.dietaryNotes,
          });
          setConfirmationCode(decoded.code);
          setBookingSuccess(true);
        }
      }
    } catch (e) {
      console.error('Error restoring reservation token:', e);
    }
  }, []);

  // Pre-fill dietary notes from cumulative reserved dishes
  useEffect(() => {
    try {
      const stored = localStorage.getItem('reserved_dishes_list');
      let currentList: string[] = [];
      if (stored) {
        currentList = JSON.parse(stored);
        if (!Array.isArray(currentList)) {
          currentList = [];
        }
      } else {
        // Fallback or legacy import
        const pendingSelection = localStorage.getItem('pending_reservation_meal');
        if (pendingSelection) {
          currentList = [pendingSelection];
          localStorage.setItem('reserved_dishes_list', JSON.stringify(currentList));
        }
      }

      if (currentList.length > 0) {
        setSelectedDishesList(currentList);
        const bulletList = currentList.map((item) => `• ${item}`).join('\n');
        setFormData((prev) => ({
          ...prev,
          dietaryNotes: bulletList,
        }));
      }
      
      // Clean up the single indicator
      localStorage.removeItem('pending_reservation_meal');
    } catch (e) {
      console.error('Error pre-filling selected meals:', e);
    }
  }, []);

  const handleRemoveDish = (indexToRemove: number) => {
    try {
      const updated = selectedDishesList.filter((_, idx) => idx !== indexToRemove);
      setSelectedDishesList(updated);
      localStorage.setItem('reserved_dishes_list', JSON.stringify(updated));
      
      // Update dietaryNotes textarea with the compiled bulleted list
      const bulletList = updated.map((item) => `• ${item}`).join('\n');
      setFormData((prev) => ({
        ...prev,
        dietaryNotes: bulletList,
      }));
    } catch (e) {
      console.error('Error removing dish:', e);
    }
  };

  // Parse year, month, day helper from date string
  const getYearMonthDay = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return {
        y: parseInt(parts[0], 10),
        m: parseInt(parts[1], 10) - 1, // 0-indexed month
        d: parseInt(parts[2], 10)
      };
    }
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() };
  };

  const initialParsed = getYearMonthDay(formData.date);
  const [currentCalendarYear, setCurrentCalendarYear] = useState(initialParsed.y);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(initialParsed.m);

  const MONTHS_EN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const MONTHS_AR = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  const MONTHS = language === 'en' ? MONTHS_EN : MONTHS_AR;

  // Calendar calculations
  const firstDayOfWeek = new Date(currentCalendarYear, currentCalendarMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentCalendarYear, currentCalendarMonth, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentCalendarMonth((prev) => {
      if (prev === 0) {
        setCurrentCalendarYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentCalendarMonth((prev) => {
      if (prev === 11) {
        setCurrentCalendarYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Helper formatting to display selected date beautifully
  const formatFriendlyDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-EG', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
    } catch (e) {}
    return dateStr;
  };

  const isDateSelected = (day: number) => {
    const selected = getYearMonthDay(formData.date);
    return selected.y === currentCalendarYear && selected.m === currentCalendarMonth && selected.d === day;
  };

  const isDateToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === currentCalendarYear && today.getMonth() === currentCalendarMonth && today.getDate() === day;
  };

  const handleSelectDay = (day: number) => {
    const formattedMonth = String(currentCalendarMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${currentCalendarYear}-${formattedMonth}-${formattedDay}`;
    setFormData((prev) => ({ ...prev, date: dateStr }));
    setIsCalendarOpen(false);
  };

  const handleSelectPrevMonthDay = (day: number) => {
    let targetMonth = currentCalendarMonth - 1;
    let targetYear = currentCalendarYear;
    if (targetMonth < 0) {
      targetMonth = 11;
      targetYear -= 1;
    }
    const formattedMonth = String(targetMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${targetYear}-${formattedMonth}-${formattedDay}`;
    
    setCurrentCalendarMonth(targetMonth);
    setCurrentCalendarYear(targetYear);
    setFormData((prev) => ({ ...prev, date: dateStr }));
    setIsCalendarOpen(false);
  };

  const handleSelectNextMonthDay = (day: number) => {
    let targetMonth = currentCalendarMonth + 1;
    let targetYear = currentCalendarYear;
    if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }
    const formattedMonth = String(targetMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${targetYear}-${formattedMonth}-${formattedDay}`;

    setCurrentCalendarMonth(targetMonth);
    setCurrentCalendarYear(targetYear);
    setFormData((prev) => ({ ...prev, date: dateStr }));
    setIsCalendarOpen(false);
  };

  const hourSlots = ['12:00', '13:30', '18:00', '19:30', '21:00'];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate reservation code generation
    const randomCode = `PLANT-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(randomCode);
    setBookingSuccess(true);
  };

  const handleGuestsAdjustment = (factor: number) => {
    setFormData((prev) => {
      const nextGuests = prev.guests + factor;
      if (nextGuests < 1 || nextGuests > 10) return prev;
      return { ...prev, guests: nextGuests };
    });
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: 2,
      date: '2026-05-24',
      time: '18:30',
      dietaryNotes: '',
    });
    setSelectedDishesList([]);
    try {
      localStorage.removeItem('reserved_dishes_list');
    } catch (e) {}
    setBookingSuccess(false);
    setConfirmationCode('');
  };

  return (
    <section id="reservation" className="relative py-24 sm:py-32 bg-bg-main/60 z-10 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        
        {/* Core Backdrop card */}
        <div className="bg-[#121815]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col md:flex-row items-stretch">
          
          {/* Hand Panel - Editorial Description (Left sidebar on desktop) */}
          <div className="md:w-[40%] bg-[#08221C] text-white p-8 flex flex-col justify-between relative overflow-hidden border-r border-[#F3C395]/10 text-left rtl:text-right rtl:border-r-0 rtl:border-l">
            {/* Organic light nodes */}
            <div className="absolute top-1/4 right-0 w-32 h-32 bg-accent-warm/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-rose/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <span className="inline-flex items-center space-x-1 rtl:space-x-reverse bg-white/5 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] font-bold tracking-widest uppercase text-accent-warm">
                <Sparkles className="w-3 h-3 text-accent-warm" />
                <span>{language === 'en' ? 'The Hearth Reserve' : 'جناح موقد حطب الزان'}</span>
              </span>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                {language === 'en' ? <>The Chef's <br /> Table Session</> : 'جلسة طاولة كبير الطهاة ✨'}
              </h3>
              
              <p className="font-serif text-sm italic text-white/80 leading-relaxed">
                {language === 'en'
                  ? '"Only eight seats are maintained each evening. The entire menu is structured around our custom-dug open beechwood firepit, directly served by the gardening and culinary team."'
                  : '"يتم تجهيز ثمانية مقاعد حصرية فقط كل مساء لمرافقة كبير طهاتنا وصياغة قائمة طعام حية ومدهشة على موقد وبخار خشب الزان الأبيض الطبيعي."'}
              </p>
            </div>

            <div className="space-y-4 pt-10 md:pt-0 relative z-10 text-left rtl:text-right border-t border-white/5 mt-6 md:mt-0 font-sans text-xs text-white/70 leading-normal">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Compass className="w-4 h-4 text-accent-warm" />
                <span>{language === 'en' ? 'Private tasting: 2 hours standard' : 'جلسة تذوق خاصة: ساعتان قياسيتان ومريحتان كلياً'}</span>
              </div>
              <p>
                {language === 'en'
                  ? '*For gatherings larger than 10, please contact our somatic services concierge line directly at stewardship@plantify.co'
                  : '*للمناسبات أو المجموعات الأكبر من ١٠ ضيوف، يرجى التواصل مع فريق الضيافة مباشرة عبر البريد الإلكتروني: stewardship@plantify.co'}
              </p>
            </div>
          </div>

          {/* Form Panel (Right block) */}
          <div className="md:w-[60%] p-8 sm:p-10 flex flex-col justify-center bg-[#121815] min-h-[450px]">
            <AnimatePresence mode="wait">
              {!bookingSuccess ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left rtl:text-right"
                >
                  <div className="border-b border-white/5 pb-3 mb-2">
                    <h4 className="font-serif text-xl font-bold text-white">{language === 'en' ? 'Secure Dining Slots' : 'حجز وتأكيد المقاعد الحصرية'}</h4>
                    <p className="text-xs text-white/55">{language === 'en' ? 'Requesting coordinates for validation verification.' : 'نظام التقييم والتحقق من تفاصيل تذكرة الحجز للمقاعد.'}</p>
                  </div>

                  {/* Inputs Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-accent-warm font-bold uppercase tracking-wider">
                        {t('nameLabel')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={language === 'en' ? 'Lord Vance' : 'سعاد الضيف الكريم'}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent-warm focus:ring-1 focus:ring-accent-warm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-accent-warm font-bold uppercase tracking-wider">
                        {t('guestEmail')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-white/40" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="eli@nature.co"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent-warm focus:ring-1 focus:ring-accent-warm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone Input with Country Selection Selector */}
                  <div className="space-y-1.5" id="reservation-phone-container">
                    <label className="block text-[10px] font-mono text-accent-warm font-bold uppercase tracking-wider">
                      {t('contactNum')}
                    </label>
                    <div className="flex gap-2">
                      {/* Flag and Code Dropdown Menu */}
                      <div className="relative shrink-0 w-[105px]">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-3 pr-8 text-xs text-white focus:outline-none focus:border-accent-warm appearance-none cursor-pointer font-sans h-[38px] sm:h-[42px]"
                        >
                          {COUNTRY_FORMATS.map((c) => (
                            <option key={c.code} value={c.code} className="bg-[#121815] text-white">
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-[9px] rtl:left-3 rtl:right-auto">
                          ▼
                        </div>
                      </div>

                      {/* Main Telephone Input */}
                      <div className="relative flex-1">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 1031142041"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent-warm focus:ring-1 focus:ring-accent-warm h-[38px] sm:h-[42px] font-mono"
                        />
                      </div>
                    </div>
                    <span className="block text-[8px] text-white/40 font-mono tracking-widest uppercase">
                      {language === 'en' ? 'Formatted Phone:' : 'رقم الهاتف المعتمد:'} {countryCode} {formData.phone || '0000000000'}
                    </span>
                  </div>

                  {/* Calendar / Guest adjusters row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    
                    {/* Proposed Date select */}
                    <div className="space-y-1.5 relative">
                      <label className="block text-[10px] font-mono text-accent-warm font-bold uppercase tracking-wider">
                        {language === 'en' ? 'Proposed Date' : 'تاريخ الحجز المقترح 🗓️'}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          id="date-picker-trigger"
                          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                          className="w-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-brand/40 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none focus:border-accent-warm text-left rtl:text-right flex items-center justify-between cursor-pointer transition-all duration-300"
                        >
                          <span className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-brand pointer-events-none" />
                            <span>{formatFriendlyDate(formData.date)}</span>
                          </span>
                          <span className="text-[9px] text-brand/70 uppercase tracking-widest font-mono">{language === 'en' ? 'Choose' : 'تغيير'}</span>
                        </button>

                        <AnimatePresence>
                          {isCalendarOpen && (
                            /* Floating 2D custom calendar popup styled beautifully */
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.95 }}
                              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                              className="absolute left-0 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-full sm:w-[310px] bg-[#121815] border border-brand/35 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 p-4 font-sans border-t-accent-warm"
                            >
                              <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
                              
                              {/* Glowing flora orb overlay under calendar scale */}
                              <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand/5 rounded-full blur-2xl pointer-events-none" />

                              {/* Calendar Header inside picker popup */}
                              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-10">
                                <button
                                  type="button"
                                  onClick={handlePrevMonth}
                                  className="p-1.5 rounded-full border border-white/10 hover:border-brand/30 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
                                  title="Previous Month"
                                >
                                  &larr;
                                </button>
                                <span className="font-serif text-xs sm:text-sm font-bold text-white tracking-wide">
                                  {MONTHS[currentCalendarMonth]} {currentCalendarYear}
                                </span>
                                <button
                                  type="button"
                                  onClick={handleNextMonth}
                                  className="p-1.5 rounded-full border border-white/10 hover:border-brand/30 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
                                  title="Next Month"
                                >
                                  &rarr;
                                </button>
                              </div>

                              {/* Weekdays indicator grid header */}
                              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-[#F3C395] font-bold uppercase mb-2 relative z-10">
                                {language === 'en' 
                                  ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                      <span key={day} className="py-1">{day}</span>
                                    ))
                                  : ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map((day) => (
                                      <span key={day} className="py-1 text-[8px]">{day}</span>
                                    ))
                                }
                              </div>

                              {/* Days Matrix */}
                              <div className="grid grid-cols-7 gap-1 relative z-10 text-center text-xs">
                                {/* Previous Month Offset Padding Days */}
                                {Array.from({ length: firstDayOfWeek }).map((_, idx) => {
                                  const dayNum = prevMonthDays - firstDayOfWeek + idx + 1;
                                  return (
                                    <button
                                      key={`prev-${dayNum}`}
                                      type="button"
                                      onClick={() => handleSelectPrevMonthDay(dayNum)}
                                      className="py-1.5 text-white/20 hover:text-white/40 font-mono text-center rounded-lg transition-colors cursor-pointer"
                                    >
                                      {dayNum}
                                    </button>
                                  );
                                })}

                                {/* Current Month Days */}
                                {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
                                  const dayNum = idx + 1;
                                  const isSelected = isDateSelected(dayNum);
                                  const isToday = isDateToday(dayNum);
                                  return (
                                    <motion.button
                                      key={`curr-${dayNum}`}
                                      type="button"
                                      whileHover={{ scale: 1.15, zIndex: 10 }}
                                      onClick={() => handleSelectDay(dayNum)}
                                      className={`py-1.5 font-mono rounded-lg transition-all relative flex items-center justify-center cursor-pointer ${
                                        isSelected
                                          ? 'bg-brand text-[#0A0F0D] font-extrabold shadow-[0_0_12px_rgba(11,164,134,0.45)]'
                                          : isToday
                                          ? 'border border-[#F3C395] text-[#F3C395] font-semibold'
                                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                                      }`}
                                    >
                                      <span>{dayNum}</span>
                                      {isToday && !isSelected && (
                                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#F3C395]" />
                                      )}
                                    </motion.button>
                                  );
                                })}

                                {/* Remaining days padding */}
                                {Array.from({ length: (42 - (firstDayOfWeek + totalDaysInMonth)) % 7 }).map((_, idx) => {
                                  const dayNum = idx + 1;
                                  return (
                                    <button
                                      key={`next-${dayNum}`}
                                      type="button"
                                      onClick={() => handleSelectNextMonthDay(dayNum)}
                                      className="py-1.5 text-white/20 hover:text-white/40 font-mono rounded-lg transition-colors cursor-pointer"
                                    >
                                      {dayNum}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Quick selection advice bar */}
                              <div className="border-t border-white/5 mt-3 pt-2 text-[9px] font-mono text-white/40 flex items-center justify-between">
                                  <span>{language === 'en' ? 'Tasting Slot limits apply' : 'مواعيد وقيود الجلسة حاسمة'}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectDay(new Date().getDate())}
                                    className="text-brand hover:underline font-bold"
                                  >
                                    {language === 'en' ? 'RESET TODAY' : 'اليوم'}
                                  </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Guest Counters */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-accent-warm font-bold uppercase tracking-wider">
                        {t('partyCount')}
                      </label>
                      <div className="flex items-center justify-between border border-white/10 bg-black/40 rounded-xl py-1.5 px-3 text-white">
                        <button
                          type="button"
                          onClick={() => handleGuestsAdjustment(-1)}
                          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-accent-warm font-bold cursor-pointer transition-colors"
                        >
                          -
                        </button>
                        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                          <Users className="w-4 h-4 text-brand" />
                          <span className="font-mono text-sm font-bold text-white">{formData.guests}</span>
                          <span className="text-[10px] text-white/40">{language === 'en' ? 'Guests' : 'ضيوف'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleGuestsAdjustment(1)}
                          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-accent-warm font-bold cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Time slots filter pills */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-accent-warm font-bold uppercase tracking-wider">
                      {t('selectTimeSlot')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {hourSlots.map((slot) => {
                        const selected = formData.time === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({ ...formData, time: slot })}
                            className={`px-3 py-2 rounded-lg border font-mono text-xs font-semibold cursor-pointer transition-colors ${
                              selected
                                ? 'bg-brand border-brand text-[#0A0F0D] shadow-sm font-bold'
                                : 'border-white/10 bg-black/30 hover:border-brand text-white/75'
                            }`}
                          >
                            <span className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{slot}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dietary notes */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-accent-warm font-bold uppercase tracking-wider">
                      {t('specialRequestLabel')}
                    </label>

                    {/* Visual representation of reserved dishes list */}
                    {selectedDishesList.length > 0 && (
                      <div className="bg-[#08221C]/50 border border-[#F3C395]/15 p-3 rounded-xl space-y-2 mb-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-accent-warm font-bold uppercase tracking-wider relative flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                            {t('bookingAlert')} ({selectedDishesList.length})
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDishesList([]);
                              localStorage.removeItem('reserved_dishes_list');
                              setFormData((prev) => ({ ...prev, dietaryNotes: '' }));
                            }}
                            className="text-[9px] font-mono text-accent-rose hover:underline font-bold uppercase cursor-pointer"
                          >
                            {t('clearListBtn')}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {selectedDishesList.map((dish, idx) => (
                            <motion.div
                              key={idx}
                              layout
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="bg-black/60 border border-white/10 px-2.5 py-1 rounded-lg flex items-center space-x-2 rtl:space-x-reverse text-[11px] text-white/95 shadow-sm hover:border-[#F3C395]/30 transition-all font-sans"
                            >
                              <span>{translateItemName(dish)}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveDish(idx)}
                                className="text-white/40 hover:text-accent-rose text-[9px] font-mono hover:scale-110 font-bold px-0.5 cursor-pointer leading-none"
                                title="Remove item"
                              >
                                ✕
                              </button>
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-[9px] text-[#F3C395]/70 font-mono italic">
                          {t('listReceiptDesc')}
                        </p>
                      </div>
                    )}

                    <textarea
                      rows={3}
                      value={formData.dietaryNotes}
                      onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                      placeholder={t('specialRequestPlaceholder')}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-accent-warm focus:ring-1 focus:ring-accent-warm"
                    />
                  </div>

                  {/* Submit book CTAs */}
                  <button
                    type="submit"
                    className="w-full bg-[#0BA486] hover:bg-[#12C2A2] text-black py-4 rounded-xl font-sans text-xs font-extrabold tracking-widest uppercase shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                  >
                    {t('rsvpBtn')}
                  </button>
                </motion.form>
              ) : (
                /* Booking Success Receipt Page */
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-6 px-2 flex flex-col items-center justify-center space-y-6"
                >
                  <div className="w-16 h-16 bg-[#0BA486]/10 text-[#0BA486] rounded-full flex items-center justify-center border border-[#0BA486]/20">
                    <CheckCircle className="w-10 h-10 stroke-[1.5]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl font-bold text-white">{language === 'en' ? 'Table Confirmed' : 'تم تأكيد مقعدك وحجز طاولة الطهي'}</h4>
                    <p className="text-xs text-white/60 max-w-sm mx-auto">
                      {language === 'en'
                        ? 'A unique physical seat slot is officially allocated. Present the digital recipe coordinates code details on arrival.'
                        : 'تم تخصيص وحجز المقعد رسميًا بنجاح. يرجى إظهار ومشاركتنا برمز تذكرة الحجز الرقمية الآتية عند الوصول للمطعم.'}
                    </p>
                  </div>

                  {/* Booking Receipt Details */}
                  <div className="bg-black/30 border border-white/10 p-6 rounded-2xl w-full max-w-sm text-left rtl:text-right shadow-xl space-y-4 font-sans relative">
                    
                    {/* Tiny Punchholes */}
                    <div className="absolute -left-2.5 top-1/2 -mt-2 w-5 h-5 bg-[#121815] rounded-full" />
                    <div className="absolute -right-2.5 top-1/2 -mt-2 w-5 h-5 bg-[#121815] rounded-full" />

                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-white/40">{language === 'en' ? 'Confirmation Code' : 'رمز تأكيد تذكرتك'}</span>
                        <span className="font-mono text-base font-bold text-accent-warm">{confirmationCode}</span>
                      </div>
                      <span className="bg-brand-active/40 text-brand border border-brand/20 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                        {language === 'en' ? 'Hearth Seated' : 'حجز طاولة رسمي'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-white/40">{t('nameLabel')}</span>
                        <span className="text-white font-serif">{formData.name}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-white/40">{t('partyCount')}</span>
                        <span className="text-white font-mono font-bold">{formData.guests} {language === 'en' ? 'Guests' : 'ضيوف'}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-white/40">{t('sessionDate')}</span>
                        <span className="text-white/80 font-mono">{formatFriendlyDate(formData.date)}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-white/40">{t('startTime')}</span>
                        <span className="text-white/80 font-mono">{formData.time}</span>
                      </div>
                    </div>

                    {formData.dietaryNotes && (
                      <div className="border-t border-white/5 pt-3">
                        <span className="block text-[9px] font-mono uppercase text-white/40 mb-1">{t('specialRequestLabel')}</span>
                        <p className="text-[11px] text-accent-rose italic leading-snug">
                          {formData.dietaryNotes.split('\n').map(l => l.startsWith('• ') ? `• ${translateItemName(l.substring(2))}` : l).join('\n')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="w-full max-w-sm mx-auto bg-[#121815] border border-white/10 rounded-2xl p-4 text-center space-y-3 shadow-xl">
                    <p className="text-[11px] text-[#0BA486] font-sans font-black uppercase tracking-widest flex items-center justify-center space-x-1 rtl:space-x-reverse">
                      <CheckCircle className="w-3.5 h-3.5 text-[#0BA486]" />
                      <span>{t('orderConfirmed')}</span>
                    </p>
                    
                    <div className="border-t border-white/5 pt-3 flex flex-col items-center justify-center space-y-1">
                      <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">{t('tokenSerial')}</span>
                      <span className="text-[#F3C395] font-mono text-xs bg-white/5 border border-white/10 px-2.5 py-0.5 rounded font-black tracking-wider uppercase">
                        {confirmationCode}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-2 rtl:space-x-reverse">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold uppercase tracking-wider text-white cursor-pointer transition-colors"
                    >
                      {language === 'en' ? 'New Reservation' : 'حجز جديد'}
                    </button>
                    <button
                      onClick={() => {
                        if (onNavigateToMenu) {
                          onNavigateToMenu();
                        } else {
                          const el = document.getElementById('menu');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-6 py-3 bg-brand text-black hover:bg-brand-hover rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer font-extrabold"
                    >
                      {language === 'en' ? 'Add Seasonal Meals' : 'إضافة المزيد من الوجبات 🌱'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
