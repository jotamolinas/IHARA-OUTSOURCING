
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import { HeroScene } from './components/QuantumScene';
import { StrategicMapDiagram, ServiceGrid, MaquilaBenefits } from './components/Diagrams';
import { OlgaChat } from './components/OlgaChat';
import { InteractiveMap } from './components/InteractiveMap';
import { Menu, X, Phone, Mail, MapPin, ExternalLink, ShieldCheck, TrendingUp, Target, BarChart3, Globe, Zap, Truck, Quote, Landmark, CheckCircle2, FileText, Lock, Building2, Briefcase, Newspaper, Calendar, CheckCircle, ChevronLeft, ChevronRight, Loader2, Settings, Scale, Copyright, Info, Gavel, Coins, ZapOff, HardHat, Award, History, Landmark as Bank, Sprout, ClipboardCheck, UserCheck, Key, MessageCircle, AlertTriangle, Share2, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// Reusable Modal Component
const ModalWrapper = ({ children, onClose, title }: { children?: React.ReactNode, onClose: () => void, title: string }) => (
  <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-ihara-dark/95 backdrop-blur-md z-[300]" />
    <div className="fixed inset-0 z-[310] flex items-center justify-center p-4 pointer-events-none">
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="pointer-events-auto w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="font-black uppercase text-ihara-dark text-xl">{title}</h2>
          <button onClick={onClose} className="text-ihara-gray hover:text-ihara-red transition-colors"><X/></button>
        </div>
        <div className="p-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </div>
  </>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [trademarkOpen, setTrademarkOpen] = useState(false);
  const [maquilaModalOpen, setMaquilaModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [turnkeyModalOpen, setTurnkeyModalOpen] = useState(false);
  
  // News Slider State
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [groundingChunks, setGroundingChunks] = useState<any[]>([]);
  const [newsIndex, setNewsIndex] = useState(0);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const WHATSAPP_NUMBER = "595993282213";
  const WHATSAPP_LINK_GENERAL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20solicitar%20una%20consultoría%20estratégica%20con%20Ihara%20Outsourcing.`;
  const WHATSAPP_LINK_ASESORAMIENTO = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20vi%20su%20página%20y%20me%20gustaría%20recibir%20el%20asesoramiento%20gratuito%20inicial.`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchLiveNews = useCallback(async () => {
    setIsNewsLoading(true);
    setPermissionDenied(false);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Using gemini-3-flash-preview for faster retrieval and to avoid Rpc errors common with heavier models in proxy
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Busca y lista 3 noticias reales, verificables y recientes (2024-2025) sobre Paraguay. Temas: Industria Maquila, Grado de Inversión, Exportación Ganadera y Agricultura de precisión. Devuelve un ARRAY JSON estrictamente válido: [{title, summary, date, source, url, category}]. No añadas texto explicativo fuera del bloque JSON.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      
      const rawText = response.text || "";
      // Robust JSON extraction from grounded text
      const jsonMatch = rawText.match(/\[\s*{[\s\S]*}\s*\]/);
      const responseText = jsonMatch ? jsonMatch[0] : rawText;
      
      const newsData = JSON.parse(responseText);
      let finalNews = Array.isArray(newsData) ? newsData : (newsData.news || newsData.noticias || []);
      
      // Store grounding metadata for compliance
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setGroundingChunks(chunks);

      if (finalNews.length > 0) {
        setNewsItems(finalNews);
      } else {
        throw new Error("Empty results");
      }
    } catch (error: any) {
      console.error("Error fetching news:", error);
      
      if (error?.message?.includes('403') || error?.message?.includes('permission') || error?.status === 403) {
        setPermissionDenied(true);
      }

      setNewsItems([
        { title: "Paraguay alcanza el histórico Grado de Inversión", date: "2024", summary: "Moody's otorga a Paraguay la calificación Baa3, marcando un hito para la atracción de capitales extranjeros y la estabilidad macroeconómica.", source: "Moody's / MIC", url: "https://www.mic.gov.py/", category: "Economía" },
        { title: "Exportaciones bajo Ley de Maquila rompen récords en 2024", date: "2024", summary: "La industria manufacturera paraguaya supera proyecciones anuales, consolidando a Alto Paraná como polo exportador regional.", source: "CNIME", url: "https://www.mic.gov.py/", category: "Industria" },
        { title: "Apertura del mercado de EE.UU. para la carne paraguaya", date: "2024", summary: "Hito histórico para la ganadería nacional: Paraguay inicia exportaciones regulares tras superar rigurosos estándares sanitarios.", source: "ARP / SENACSA", url: "https://www.arp.org.py/", category: "Ganadería" }
      ]);
      setGroundingChunks([]);
    } finally {
      setIsNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveNews();
  }, [fetchLiveNews]);

  const handleOpenKeySelector = async () => {
    try {
      if ((window as any).aistudio?.openSelectKey) {
        await (window as any).aistudio.openSelectKey();
        setTimeout(() => {
          fetchLiveNews();
        }, 500);
      } else {
        window.open("https://ai.google.dev/gemini-api/docs/billing", "_blank");
      }
    } catch (err) {
      console.error("Error selecting key:", err);
    }
  };

  const handleShare = (url: string, index: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const NavLink = ({ href, targetId, children }: { href: string; targetId: string; children?: React.ReactNode }) => (
    <a 
      href={href} 
      onClick={scrollToSection(targetId)} 
      className={`relative py-2 transition-all duration-300 uppercase group text-[11px] font-bold tracking-widest ${scrolled ? 'text-ihara-gray hover:text-ihara-dark' : 'text-white/70 hover:text-white'}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-ihara-red transition-all duration-500 ease-out group-hover:w-full"></span>
    </a>
  );

  const nextNews = () => setNewsIndex((prev) => (prev + 1) % newsItems.length);
  const prevNews = () => setNewsIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);

  const getCategoryStyles = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('ganadería')) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (cat.includes('agricultura')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (cat.includes('economía') || cat.includes('negocios')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (cat.includes('éxito')) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-ihara-red/10 text-ihara-red border-ihara-red/20';
  };

  return (
    <div className="min-h-screen bg-white text-ihara-dark selection:bg-ihara-red selection:text-white relative">
      <OlgaChat />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-10">
            {/* Logo Section */}
            <div className="flex items-center gap-4 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex flex-col items-start">
                <div className="flex items-end gap-1 mb-0.5">
                    <div className="w-1.5 h-4 bg-ihara-red"></div>
                    <div className="w-1.5 h-7 bg-ihara-red"></div>
                    <div className="w-1.5 h-10 bg-ihara-red"></div>
                </div>
                <span className={`font-sans font-bold text-xl tracking-tighter leading-none whitespace-nowrap ${scrolled ? 'text-ihara-dark' : 'text-white'}`}>IHARA <span className="text-ihara-red font-black">OUTSOURCING</span></span>
              </div>
            </div>

            {/* ASESORAMIENTO GRATUITO BUTTON - Dynamic Color Ghost Style */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(WHATSAPP_LINK_ASESORAMIENTO, "_blank")}
              className={`flex items-center gap-3 px-5 py-2.5 transition-all duration-300 group border rounded-xl ${scrolled ? 'text-black border-stone-200 hover:border-black' : 'text-white border-white/20 hover:border-white'}`}
            >
              <div className={`p-2 rounded-lg transition-colors ${scrolled ? 'bg-stone-100 group-hover:bg-stone-200' : 'bg-white/10 group-hover:bg-white/20'}`}>
                <MessageCircle size={18} className={scrolled ? 'text-black' : 'text-white'} />
              </div>
              <div className="flex flex-col items-start text-left leading-none">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-80 mb-0.5 text-inherit">Asesoramiento</span>
                <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap text-inherit">Gratuito</span>
              </div>
            </motion.button>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="#about" targetId="about">Quienes Somos / Servicios</NavLink>
            <NavLink href="#maquila" targetId="maquila">Ley de Maquila</NavLink>
            <NavLink href="#news" targetId="news">Noticias</NavLink>
            <NavLink href="#location" targetId="location">Ubicación</NavLink>
            <button onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")} className="ml-4 px-6 py-2.5 bg-ihara-red text-white rounded-sm hover:bg-ihara-dark transition-all shadow-md uppercase text-[10px] tracking-widest font-bold">SOLICITAR CONSULTORÍA</button>
          </div>
        </div>
      </nav>

      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-ihara-dark">
        <HeroScene />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-ihara-dark/60 via-transparent to-ihara-dark/80" />
        <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-block mb-6 px-4 py-1.5 bg-ihara-red text-white text-[10px] tracking-[0.3em] uppercase font-black">PARAGUAY: EL HUB INDUSTRIAL</div>
            <h1 className="font-sans text-5xl md:text-8xl font-black leading-none mb-6 text-white uppercase tracking-tighter">Traiga sus <br/><span className="text-ihara-red">Negocios</span> <br/>a Paraguay</h1>
            <p className="max-w-xl text-lg text-white/80 font-medium leading-relaxed mb-10 border-l-4 border-ihara-red pl-6 mx-auto lg:mx-0">Consultoría estratégica para inversores globales. Estructuramos su éxito en el corazón del Mercosur.</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
               <button onClick={() => setMaquilaModalOpen(true)} className="px-8 py-4 bg-white text-ihara-dark font-black tracking-widest hover:bg-ihara-red hover:text-white transition-all shadow-xl">CONOCER MAQUILA</button>
               <button onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")} className="px-8 py-4 border-2 border-white text-white font-black tracking-widest hover:bg-white/10 transition-all">CONSULTAR AHORA</button>
            </div>
          </motion.div>
        </div>
      </header>

      <main>
        <section id="about" className="py-24 bg-white">
           <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                 <h2 className="text-5xl font-black mb-8 tracking-tighter uppercase leading-none">Quienes <br/><span className="text-ihara-red">Somos</span></h2>
                 <p className="text-ihara-gray text-lg leading-relaxed font-medium mb-10">Nuestra misión es proveer toda la estructura estratégica y administrativa para que los inversores internacionales operen con rapidez y seguridad jurídica en Paraguay.</p>
                 <div className="space-y-4">
                    <button 
                      onClick={() => setExperienceModalOpen(true)}
                      className="w-full text-left p-6 bg-ihara-light rounded-2xl border-l-4 border-ihara-red shadow-sm hover:shadow-md hover:bg-white transition-all group"
                    >
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="font-black text-xs uppercase tracking-widest group-hover:text-ihara-red transition-colors">30 Años</h4>
                          <Info size={14} className="text-ihara-red opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                       <p className="text-[10px] text-ihara-gray font-bold uppercase tracking-wide">De experiencia en gestión industrial de alto nivel. <span className="text-ihara-red underline block mt-1">Ver trayectoria completa</span></p>
                    </button>
                    <button 
                      onClick={() => setTurnkeyModalOpen(true)}
                      className="w-full text-left p-6 bg-ihara-light rounded-2xl border-l-4 border-ihara-red shadow-sm hover:shadow-md hover:bg-white transition-all group"
                    >
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="font-black text-xs uppercase tracking-widest group-hover:text-ihara-red transition-colors">Solución Llave en mano</h4>
                          <Info size={14} className="text-ihara-red opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                       <p className="text-[10px] text-ihara-gray font-bold uppercase tracking-wide">Desembarco corporativo integral y mediación legal. <span className="text-ihara-red underline block mt-1">Ver protocolo de apertura</span></p>
                    </button>
                 </div>
              </div>
              <div className="lg:col-span-8">
                 <div className="mb-10">
                    <span className="text-[10px] font-black text-ihara-red uppercase tracking-[0.4em] mb-4 block">Nuestros Pilares Operativos</span>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-ihara-dark">Servicios Especializados</h3>
                 </div>
                 <ServiceGrid />
              </div>
           </div>
        </section>

        <section id="maquila" className="py-24 bg-ihara-dark text-white">
           <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                 <h2 className="text-5xl font-black uppercase tracking-tighter">Incentivos de <span className="text-ihara-red">Clase Mundial</span></h2>
                 <p className="text-white/60 mt-4 max-w-2xl mx-auto">Paraguay ofrece el sistema impositivo más simple y competitivo de la región para la industria exportadora.</p>
              </div>
              <StrategicMapDiagram />
           </div>
        </section>

        {/* Dynamic Sliding News Section */}
        <section id="news" className="py-24 bg-white relative overflow-hidden">
           <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                 <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-stone-100 text-ihara-gray text-[10px] font-black tracking-widest uppercase rounded">
                    <Newspaper size={14} className="text-ihara-red" /> Inteligencia de Mercado
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Impacto <span className="text-ihara-red">Estratégico</span></h2>
                 <p className="text-ihara-gray mt-4 max-w-2xl mx-auto font-medium text-sm uppercase tracking-wide">Actualización de noticias verificadas: Industria, Ganadería, Agricultura y Negocios.</p>
              </div>

              {permissionDenied && (
                <div className="max-w-2xl mx-auto mb-10 p-6 bg-amber-50 border border-amber-200 rounded-3xl flex flex-col md:flex-row items-center gap-6 shadow-sm border-dashed">
                   <AlertTriangle className="text-amber-600 shrink-0" size={32} />
                   <div className="flex-1 text-center md:text-left">
                      <p className="text-[11px] font-black uppercase tracking-widest text-amber-900 mb-1">Función Premium: Noticias en Tiempo Real</p>
                      <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wide leading-relaxed">
                        La búsqueda inteligente requiere una clave de API propia del inversor. 
                        Conéctela para recibir actualizaciones geopolíticas personalizadas.
                      </p>
                      <div className="flex gap-4 mt-3 justify-center md:justify-start">
                        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-[9px] text-amber-600 underline font-black uppercase tracking-tighter">Documentación GCP</a>
                      </div>
                   </div>
                   <button 
                    onClick={handleOpenKeySelector}
                    className="px-6 py-3 bg-ihara-dark text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-ihara-red transition-all shadow-xl shrink-0 flex items-center gap-2"
                   >
                     <Key size={14} /> Conectar Mi Clave
                   </button>
                </div>
              )}

              {isNewsLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                   <Loader2 size={40} className="animate-spin text-ihara-red" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-ihara-gray">Sincronizando con fuentes gubernamentales...</p>
                </div>
              ) : (
                <div className="relative max-w-4xl mx-auto px-12">
                   <AnimatePresence mode="wait">
                      <motion.div 
                        key={newsIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-stone-50 border border-stone-200 p-10 md:p-14 rounded-[2.5rem] shadow-xl relative"
                      >
                         <div className="flex justify-between items-center mb-8">
                            <span className={`px-4 py-1.5 border text-[9px] font-black uppercase tracking-[0.2em] rounded-full ${getCategoryStyles(newsItems[newsIndex].category)}`}>
                               {newsItems[newsIndex].category || "Estratégico"}
                            </span>
                            <div className="flex items-center gap-2 text-ihara-gray/40 text-[10px] font-bold">
                               <Calendar size={12} /> {newsItems[newsIndex].date}
                            </div>
                         </div>
                         
                         <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 leading-tight tracking-tighter text-ihara-dark">
                            {newsItems[newsIndex].title}
                         </h3>
                         
                         <p className="text-ihara-gray text-base md:text-lg font-medium leading-relaxed mb-6 italic">
                            "{newsItems[newsIndex].summary}"
                         </p>

                         {/* Compliance: Mandatory Grounding Chunks Rendering */}
                         {groundingChunks.length > 0 && (
                           <div className="mb-8 pt-6 border-t border-stone-100">
                             <h4 className="text-[9px] font-black uppercase tracking-widest text-ihara-red mb-3 flex items-center gap-2">
                               <LinkIcon size={12} /> Citaciones Verificadas (Google Search)
                             </h4>
                             <div className="flex flex-wrap gap-2">
                               {groundingChunks.map((chunk, idx) => (
                                 chunk.web && (
                                   <a 
                                     key={idx} 
                                     href={chunk.web.uri} 
                                     target="_blank" 
                                     rel="noopener noreferrer" 
                                     className="px-3 py-1 bg-white border border-stone-200 rounded text-[9px] font-bold text-ihara-gray hover:text-ihara-red hover:border-ihara-red transition-all flex items-center gap-2 truncate max-w-[200px]"
                                     title={chunk.web.title}
                                   >
                                     <Globe size={10} /> {chunk.web.title || "Fuente Externa"}
                                   </a>
                                 )
                               ))}
                             </div>
                           </div>
                         )}
                         
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-stone-200">
                            <div className="flex flex-col">
                               <span className="text-[9px] font-black text-ihara-gray/40 uppercase tracking-widest mb-1">Fuente Verificada:</span>
                               <span className="text-xs font-black text-ihara-dark uppercase">{newsItems[newsIndex].source}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleShare(newsItems[newsIndex].url, newsIndex)}
                                className={`flex items-center gap-2 px-6 py-3 border border-stone-200 text-[10px] font-black uppercase tracking-widest rounded transition-all hover:bg-stone-100 ${copiedIndex === newsIndex ? 'bg-ihara-red text-white border-ihara-red hover:bg-ihara-red' : 'text-ihara-gray'}`}
                              >
                                {copiedIndex === newsIndex ? (
                                  <>Copiado <CheckCircle size={14} /></>
                                ) : (
                                  <>Compartir <Share2 size={14} /></>
                                )}
                              </motion.button>
                              
                              <a 
                                href={newsItems[newsIndex].url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-3 px-8 py-3 bg-ihara-dark text-white text-[10px] font-black uppercase tracking-widest hover:bg-ihara-red transition-all shadow-lg active:scale-95"
                              >
                                 Ver Fuente <ExternalLink size={14} />
                              </a>
                            </div>
                         </div>
                      </motion.div>
                   </AnimatePresence>

                   <button onClick={prevNews} className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-stone-200 rounded-full flex items-center justify-center shadow-lg hover:bg-ihara-red hover:text-white hover:border-ihara-red transition-all active:scale-90"><ChevronLeft /></button>
                   <button onClick={nextNews} className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-stone-200 rounded-full flex items-center justify-center shadow-lg hover:bg-ihara-red hover:text-white hover:border-ihara-red transition-all active:scale-90"><ChevronRight /></button>

                   <div className="flex justify-center gap-2 mt-8">
                      {newsItems.map((_, i) => (
                        <button key={i} onClick={() => setNewsIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === newsIndex ? 'bg-ihara-red w-8' : 'bg-stone-300'}`} />
                      ))}
                   </div>
                </div>
              )}
           </div>
        </section>

        <section id="location" className="py-24 bg-stone-50 border-t border-stone-100">
           <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                 <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">Ciudad <br/>del <span className="text-ihara-red">Este</span></h2>
                 <p className="text-ihara-gray text-lg font-medium leading-relaxed mb-8">Operamos desde el centro logístico más dinámico de Sudamérica. La puerta de entrada al mercado brasileño.</p>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-white border border-stone-200 rounded shadow-sm">
                       <MapPin className="text-ihara-red mt-1 shrink-0" size={20} />
                       <div>
                          <p className="font-bold text-ihara-dark uppercase text-sm">Oficina Central Ihara</p>
                          <p className="text-ihara-gray text-xs">Ciudad del Este, Alto Paraná, Paraguay</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-7 h-[500px]">
                 <InteractiveMap />
              </div>
           </div>
        </section>

        <section id="contact" className="py-24 bg-ihara-light">
           <div className="container mx-auto px-6 max-w-5xl">
              <div className="bg-ihara-dark p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-ihara-red/10 blur-[100px]"></div>
                 <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                       <h2 className="text-white text-4xl font-black uppercase mb-6 tracking-tighter leading-none">Inicie su <br/><span className="text-ihara-red">Expansión</span></h2>
                       <p className="text-white/40 mb-10 font-bold uppercase tracking-widest text-xs">Consulte a nuestros expertos hoy.</p>
                       <div className="space-y-6 text-white">
                          <div className="flex items-center gap-4 hover:text-ihara-red transition-colors cursor-pointer" onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")}><Phone/><span className="font-black text-lg">+595 993 282 213</span></div>
                          <div className="flex items-center gap-4"><Mail/><span className="font-black text-lg">info@ihara.com.py</span></div>
                       </div>
                    </div>
                    <form className="space-y-4">
                       <input type="text" placeholder="NOMBRE COMPLETO" className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs font-black tracking-widest outline-none focus:border-ihara-red transition-all" />
                       <input type="email" placeholder="EMAIL CORPORATIVO" className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs font-black tracking-widest outline-none focus:border-ihara-red transition-all" />
                       <textarea placeholder="PROYECTO DE INVERSIÓN" rows={4} className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs font-black tracking-widest outline-none focus:border-ihara-red transition-all resize-none"></textarea>
                       <button type="button" onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")} className="w-full py-5 bg-ihara-red text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-ihara-red transition-all shadow-xl">Enviar Mensaje</button>
                    </form>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="bg-ihara-dark text-white/20 py-10 border-t border-white/5">
         <div className="container mx-auto px-6 text-center">
            <div className="flex flex-col items-center">
               <span className="font-bold text-white tracking-tighter text-xl uppercase">IHARA <span className="text-ihara-red">OUTSOURCING</span></span>
               
               <div className="mt-4 flex flex-col items-center">
                    <p className="text-[9px] text-white/40 uppercase tracking-[0.3em] font-black mb-1">
                       Desarrollado por:
                    </p>
                    <p className="text-[11px] text-white/70 font-bold mb-0.5">
                       Juan Alberto Molinas
                    </p>
                    <p className="text-[10px] text-ihara-red uppercase tracking-[0.4em] font-black">
                       MONKEY BUSINESS IA
                    </p>
               </div>
            </div>

            <div className="mt-6 flex justify-center gap-8 text-[9px] font-black uppercase tracking-widest">
               <button onClick={() => setPrivacyOpen(true)} className="hover:text-white transition-colors">Privacidad</button>
               <button onClick={() => setTermsOpen(true)} className="hover:text-white transition-colors">Términos & Condiciones</button>
               <button onClick={() => setTrademarkOpen(true)} className="hover:text-white transition-colors">Trademark</button>
            </div>
            <p className="mt-6 text-[8px] uppercase tracking-[0.4em] opacity-30">© 2024 Ihara Outsourcing Group. República del Paraguay.</p>
         </div>
      </footer>

      {/* Experience / 30 Years Detail Modal */}
      <AnimatePresence>
        {experienceModalOpen && (
          <ModalWrapper onClose={() => setExperienceModalOpen(false)} title="30 Años de Trayectoria Senior en Paraguay">
            <div className="space-y-8 text-sm text-ihara-gray leading-relaxed">
               <div className="flex items-center gap-6 mb-8 border-b border-stone-100 pb-8">
                  <div className="w-24 h-24 bg-ihara-red text-white rounded-full flex flex-col items-center justify-center shrink-0 shadow-xl border-4 border-white">
                     <span className="text-2xl font-black">30</span>
                     <span className="text-[8px] font-black uppercase tracking-widest">Años</span>
                  </div>
                  <p className="text-ihara-dark font-medium text-base italic">"Tres décadas transformando el potencial de Paraguay en rentabilidad para inversores globales."</p>
               </div>
               <section>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-stone-100 text-ihara-red rounded-lg"><Landmark size={20}/></div>
                     <h3 className="font-black uppercase text-ihara-dark text-base tracking-tight">Estructuración Societaria</h3>
                  </div>
                  <p className="mb-4">Lideramos el desembarco de capitales mediante la apertura de empresas bajo los modelos más eficientes. Expertos en la **EAS (Empresa por Acciones Simplificadas)**, logrando tiempos récord de apertura con costo estatal cero, y en la constitución de **Sociedades Anónimas (S.A.)** para proyectos de gran envergadura.</p>
                  <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase text-ihara-red">
                     <span className="flex items-center gap-2"><CheckCircle size={12}/> Apertura EAS en 72hs</span>
                     <span className="flex items-center gap-2"><CheckCircle size={12}/> Registro RUC e IVA</span>
                  </div>
               </section>
               <section>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-stone-100 text-ihara-red rounded-lg"><Building2 size={20}/></div>
                     <h3 className="font-black uppercase text-ihara-dark text-base tracking-tight">Infraestructura & Logística</h3>
                  </div>
                  <p className="mb-4">Contamos con una red exclusiva de **galpones industriales** en Alto Paraná y Ciudad del Este. Ofrecemos soluciones de alquiler y leasing de depósitos listos para operar bajo la Ley de Maquila, con acceso inmediato a los corredores logísticos de la Triple Frontera.</p>
               </section>
               <section className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-white text-ihara-red rounded-lg shadow-sm"><Sprout size={20}/></div>
                     <h3 className="font-black uppercase text-ihara-dark text-base tracking-tight">Inmuebles Agrícolas y Ganaderos</h3>
                  </div>
                  <p className="mb-4">Especialistas en la gestión de activos en el corazón productivo del país:</p>
                  <ul className="space-y-4">
                     <li className="flex gap-4">
                        <Award size={16} className="text-ihara-red shrink-0" />
                        <span><strong>Región Oriental:</strong> Tierras fértiles mecanizadas de alto rendimiento para soja, maíz y trigo.</span>
                     </li>
                     <li className="flex gap-4">
                        <Award size={16} className="text-ihara-red shrink-0" />
                        <span><strong>Chaco Paraguayo:</strong> Propiedades listas con infraestructura de avanzada para el engorde intensivo de hasta 1.000 cabezas de ganado.</span>
                     </li>
                  </ul>
               </section>
               <section>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-stone-100 text-ihara-red rounded-lg"><Scale size={20}/></div>
                     <h3 className="font-black uppercase text-ihara-dark text-base tracking-tight">Exportaciones & Servicios Legales</h3>
                  </div>
                  <p className="mb-6">Navegamos la mediación legislativa con total seguridad jurídica. Gestionamos el registro en la **Ventanilla Única de Exportación (VUE)** y estructuramos proyectos de **Maquila (CNIME)**. Ihara Outsourcing provee la representación legal necesaria para extranjeros, facilitando su residencia y operatividad mientras se consolidan en el país.</p>
                  <button onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")} className="w-full py-4 bg-ihara-dark text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-ihara-red transition-all shadow-xl flex items-center justify-center gap-3">
                     <Phone size={14} /> Solicitar Dossier Corporativo por WhatsApp
                  </button>
               </section>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
