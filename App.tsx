
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback, useRef, useMemo, Suspense, lazy } from 'react';
import { ServiceGrid } from './components/Diagrams.tsx';
import { InvestorPassSection } from './components/InvestorPass.tsx';
import { CorporateServices } from './components/CorporateServices.tsx';
import { BlogSection } from './components/Blog.tsx';
import { TaxComparisonChart } from './components/TaxComparisonChart.tsx';
import { TestimonialsSection } from './components/Testimonials.tsx';
import { FAQ } from './components/FAQ.tsx';
import { 
  TrendingUp, Languages as LangIcon, ChevronDown, 
  X, Menu, ArrowRight, MessageCircle, ExternalLink,
  ArrowUpRight, Clock, Share2, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from './components/LazyImage.tsx';
import { languages, translations } from './translations.ts';

const HeroScene = lazy(() => import('./components/QuantumScene.tsx').then(m => ({ default: m.HeroScene })));

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;
const MotionButton = motion.button as any;

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo
    }
  }
};

const QuantumHeroPlaceholder = () => (
  <div className="absolute inset-0 bg-ihara-dark flex items-center justify-center overflow-hidden">
    <div className="absolute w-[600px] h-[600px] bg-ihara-red/10 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute w-[300px] h-[300px] bg-ihara-red/20 rounded-full blur-[80px] animate-soft-pulse"></div>
    <div className="relative z-10 flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-ihara-red/20 border-t-ihara-red rounded-full animate-spin"></div>
      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Initializing Quantum Engine</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [newsSources, setNewsSources] = useState<any[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [legalView, setLegalView] = useState<'privacy' | 'terms' | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const [lang, setLang] = useState(() => {
    try {
      const path = window.location.pathname;
      const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
      if (langMatch && languages.some(l => l.code === langMatch[1])) return langMatch[1];
      
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('ih-lang');
        if (saved && languages.some(l => l.code === saved)) return saved;
      }
      return 'es';
    } catch (e) { return 'es'; }
  });

  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = useMemo(() => translations[lang] || translations.es, [lang]);

  const updateCanonical = useCallback(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const baseUrl = "https://www.iharaoutsourcing.com";
    const path = window.location.pathname === '/' ? '' : window.location.pathname;
    canonical.setAttribute('href', `${baseUrl}${path}/`.replace(/\/+$/, '/'));
  }, []);

  const navigateTo = useCallback((path: string) => {
    try {
      const isProduction = window.location.hostname === "www.iharaoutsourcing.com";
      if (isProduction) {
        const langPrefix = lang === 'es' ? '' : `/${lang}`;
        const fullPath = `${langPrefix}${path}`;
        window.history.pushState({}, '', fullPath);
        updateCanonical();
      }
      
      const sectionId = path.replace('/', '');
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    } catch (e) {}
  }, [lang, updateCanonical]);

  useEffect(() => {
    const seo = t.seo || translations.es.seo;
    document.title = seo.title;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    updateCanonical();
    try { if (typeof localStorage !== 'undefined') localStorage.setItem('ih-lang', lang); } catch (e) {}
  }, [lang, t, updateCanonical]);

  const changeLanguage = (newLang: string) => {
    const isProduction = window.location.hostname === "www.iharaoutsourcing.com";
    if (isProduction) {
      const currentPath = window.location.pathname;
      const cleanPath = currentPath.replace(/^\/(en|pt|jp|de|zh|ar)/, '') || '/';
      const newPath = newLang === 'es' ? cleanPath : `/${newLang}${cleanPath === '/' ? '' : cleanPath}`;
      window.history.pushState({}, '', newPath);
    }
    setLang(newLang);
    setIsLangOpen(false);
    setSelectedNews(null);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
      if (langMatch && languages.some(l => l.code === langMatch[1])) {
        setLang(langMatch[1]);
      } else {
        setLang('es');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const WHATSAPP_LINK = `https://wa.me/595993282213?text=${encodeURIComponent(t.whatsapp_msg || '')}`;
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsNewsLoading(true);
    // Simulate a brief loading time for transition or set immediately.
    // Setting immediately is better for performance.
    setNewsItems(t.market?.default_news || []);
    setIsNewsLoading(false);
  }, [t.market?.default_news]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNewsWhatsApp = (newsTitle: string) => {
    const intro = t.whatsapp_msg || "";
    const text = encodeURIComponent(`${intro} Inquiry: "${newsTitle}"`);
    window.open(`https://wa.me/595993282213?text=${text}`, "_blank");
  };

  const marketImages = [
    "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/grado_inversion_paraguay.jpg.webp",
    "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/regimen_maquila_paraguay.jpg.webp",
    "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/real_estate_premium_asuncion.jpg.webp",
    "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/corredor_bioceanico_paraguay.jpg.webp",
    "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/hidrogeno_verde_paraguay.jpg.webp",
    "https://storage.googleapis.com/www.iharaoutsourcing.com/imagenes/auge_biocombustibles_paraguay.jpg%20(1).webp"
  ];

  const handleShare = async (news: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: news.title,
      text: news.summary,
      url: window.location.href, // Or a specific link if available
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${news.title}\n\n${news.summary}\n\n${window.location.href}`);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-ihara-dark selection:bg-ihara-red selection:text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
      
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-ihara-dark' : 'text-white'}`}>
            IHARA <span className="text-ihara-red">OUTSOURCING</span>
          </a>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)} 
                className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all hover:bg-white/10 ${scrolled ? 'border-stone-200 text-ihara-dark' : 'border-white/20 text-white'}`}
              >
                <LangIcon size={14} />
                <span className="text-[10px] font-bold uppercase">{languages.find(l => l.code === lang)?.flag}</span>
                <ChevronDown size={10} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <MotionDiv 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} 
                    className="absolute right-0 mt-2 w-40 bg-white shadow-2xl rounded-xl overflow-hidden py-2 border border-stone-100 z-[110]"
                  >
                    {languages.map((l) => (
                      <button key={l.code} onClick={() => changeLanguage(l.code)} className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase hover:bg-ihara-red hover:text-white flex items-center gap-3">
                        <span>{l.flag}</span> {l.label}
                      </button>
                    ))}
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => window.open(WHATSAPP_LINK, "_blank")} className="hidden md:block bg-ihara-red text-white px-6 py-2 rounded font-bold text-xs tracking-widest uppercase hover:bg-ihara-dark transition-all">
              {t.nav?.button}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 ${scrolled ? 'text-ihara-dark' : 'text-white'}`}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MotionDiv
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 md:hidden max-w-sm bg-white shadow-2xl z-[110] flex flex-col items-center justify-center p-8"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-ihara-dark hover:bg-stone-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <nav className="flex flex-col gap-6 text-center w-full">
                <a href="/services" onClick={(e) => { e.preventDefault(); navigateTo('/services'); setIsMobileMenuOpen(false); }} className="text-2xl font-black text-ihara-dark uppercase hover:text-ihara-red transition-colors">
                  {t.nav?.services}
                </a>
                <a href="#insights" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-ihara-dark uppercase hover:text-ihara-red transition-colors">
                  {t.nav?.insights}
                </a>
                <button
                  onClick={() => { window.open(WHATSAPP_LINK, "_blank"); setIsMobileMenuOpen(false); }}
                  className="mt-8 bg-ihara-red text-white py-4 px-8 rounded-full font-bold tracking-widest uppercase hover:bg-ihara-dark transition-all w-full shadow-lg"
                >
                  {t.nav?.button}
                </button>
              </nav>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>

      <header className="relative h-screen flex items-center bg-ihara-dark overflow-hidden">
        <Suspense fallback={<QuantumHeroPlaceholder />}>
          <HeroScene />
        </Suspense>
        <div className="relative z-10 container mx-auto px-6 text-left">
          <MotionDiv 
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <MotionH1 
              variants={heroItemVariants}
              className="text-4xl md:text-7xl font-black text-white uppercase leading-tight mb-6 tracking-tighter max-w-4xl"
            >
              {t.hero?.h1}
            </MotionH1>
            <MotionP 
              variants={heroItemVariants}
              className="max-w-xl text-lg text-white/70 mb-10 border-l-4 border-ihara-red pl-6 font-medium italic leading-relaxed"
            >
              {t.hero?.desc}
            </MotionP>
            <MotionDiv variants={heroItemVariants} className="flex flex-col sm:flex-row gap-4">
              <MotionButton 
                onClick={() => navigateTo('/services')} 
                className="px-10 py-4 bg-white text-ihara-dark font-black uppercase tracking-widest text-xs hover:bg-ihara-red hover:text-white transition-all shadow-xl rounded-sm"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero?.cta}
              </MotionButton>
            </MotionDiv>
          </MotionDiv>
        </div>
      </header>

      <main>
        <section id="services" className="py-24 bg-white scroll-mt-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16 text-left">
              <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-ihara-dark">
                {t.services?.title} <span className="text-ihara-red">{t.services?.accent}</span>
              </h2>
              <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[11px] mb-8">{t.services?.h2_eas}</p>
              <div className="h-1.5 w-32 bg-ihara-red"></div>
            </div>
            <ServiceGrid lang={lang} />
          </div>
        </section>

        <InvestorPassSection lang={lang} />

        <section id="corporate-services">
          <CorporateServices lang={lang} />
        </section>

        <section id="market" className="py-24 bg-stone-50 border-y border-stone-100 scroll-mt-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16">
              <div className="text-left">
                <h2 className="text-5xl font-black uppercase tracking-tighter text-ihara-dark mb-4">
                  {t.market?.title} <br/> <span className="text-ihara-red">{t.market?.accent}</span>
                </h2>
                <div className="flex items-center gap-3">
                  <span className="w-12 h-1 bg-ihara-red"></span>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">{t.market?.subtitle}</p>
                </div>
              </div>
              <TrendingUp size={48} className="text-stone-200 mt-8 md:mt-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isNewsLoading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-stone-200 animate-pulse h-48"></div>
                ))
              ) : (
                (newsItems && newsItems.length > 0 ? newsItems : (t.market?.default_news || [])).map((news, i) => (
                  <MotionDiv 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all text-left group overflow-hidden flex flex-col h-full"
                  >
                    <div className="h-40 overflow-hidden shrink-0">
                      <LazyImage src={news.image || marketImages[i % marketImages.length]} className="w-full h-full group-hover:scale-110 transition-transform duration-700" alt={news.title}/>
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] font-black uppercase tracking-widest text-ihara-red bg-ihara-red/5 px-3 py-1 rounded-full inline-block">
                            {news.category}
                          </span>
                          <span className="text-xs font-bold text-stone-400 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <Clock size={12} /> {news.readTime || "3 min read"}
                          </span>
                        </div>
                        <h4 className="text-lg font-black uppercase tracking-tight text-ihara-dark mb-3 line-clamp-2 group-hover:text-ihara-red transition-colors">
                          {news.title}
                        </h4>
                        <p className="text-stone-500 text-xs font-medium leading-relaxed italic line-clamp-6 mb-6">
                          {news.summary}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <button 
                          onClick={() => setSelectedNews(news)}
                          className="text-[10px] font-black uppercase tracking-widest text-ihara-red flex items-center gap-2 group/btn"
                        >
                          {t.market?.readMore} <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        <button
                          onClick={(e) => handleShare(news, e)}
                          className="text-stone-400 hover:text-ihara-red transition-colors"
                          aria-label="Share"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </MotionDiv>
                ))
              )}
            </div>
            
            {!isNewsLoading && newsSources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-4">
                  <ExternalLink size={14} className="text-ihara-red" />
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Grounding Sources</h5>
                </div>
                <div className="flex flex-wrap gap-3">
                  {newsSources.map((source, idx) => (
                    <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-100 rounded-full text-[9px] font-black uppercase text-ihara-dark hover:text-ihara-red transition-all">
                      {source.title || 'Source'} <ArrowUpRight size={10} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <TaxComparisonChart lang={lang} />
        <BlogSection lang={lang} />
        <TestimonialsSection lang={lang} />
        <FAQ lang={lang} />
      </main>

      <footer className="bg-ihara-dark py-20 text-center text-white border-t border-white/5">
        <div className="mb-12">
           <span className="font-bold text-white text-3xl tracking-tighter uppercase">IHARA <span className="text-ihara-red">OUTSOURCING</span></span>
        </div>
        <div className="flex flex-wrap justify-center gap-12 mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
          <button onClick={() => setLegalView('privacy')} className="hover:text-ihara-red">{t.footer?.privacy}</button>
          <button onClick={() => setLegalView('terms')} className="hover:text-ihara-red">{t.footer?.terms}</button>
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] mb-4 text-white/60">{t.footer?.rights}</p>
        <p className="text-[10px] uppercase tracking-widest text-white mt-8 font-black bg-white/5 inline-block px-6 py-2 rounded-full border border-white/10">
          {t.footer?.dev}
        </p>
      </footer>

      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedNews(null)} className="absolute inset-0 bg-ihara-dark/90 backdrop-blur-md"/>
            <MotionDiv initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white z-[210] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="bg-stone-50 px-8 py-6 border-b border-stone-100 flex justify-between items-center shrink-0">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ihara-red">{selectedNews.category}</span>
                <button onClick={() => setSelectedNews(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors text-ihara-dark"><X size={20} /></button>
              </div>
              <div className="p-8 md:p-12 overflow-y-auto text-left custom-scrollbar text-ihara-gray">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-ihara-dark mb-6 leading-tight">{selectedNews.title}</h3>
                <p className="text-stone-600 text-lg leading-relaxed mb-10 italic border-l-4 border-ihara-red pl-6 py-2">{selectedNews.summary}</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button onClick={() => handleNewsWhatsApp(selectedNews.title)} className="flex-1 bg-ihara-red text-white py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-ihara-dark transition-all flex items-center justify-center gap-3 shadow-xl"><MessageCircle size={18} /> {t.market?.whatsappAction}</button>
                  <button onClick={() => setSelectedNews(null)} className="sm:w-32 border-2 border-stone-100 text-stone-400 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-stone-50 transition-all">{t.market?.close}</button>
                </div>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoModalOpen(false)} className="absolute inset-0 bg-ihara-dark/95 backdrop-blur-xl"/>
            <MotionDiv initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl bg-black z-[310] rounded-2xl shadow-2xl overflow-hidden aspect-video border border-white/10 group">
              <button 
                onClick={() => setIsVideoModalOpen(false)} 
                className="absolute top-4 right-4 z-[320] p-3 hover:bg-white/10 rounded-full transition-colors text-white opacity-0 group-hover:opacity-100"
              >
                <X size={24} />
              </button>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {/* Fallback placeholder video */}
                <video 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-auto z-0"
                  controls 
                  autoPlay 
                  playsInline
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 bg-black/40 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">Veo AI Generated Summary</span>
                </div>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
