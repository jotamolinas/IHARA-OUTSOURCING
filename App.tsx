
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import { HeroScene } from './components/QuantumScene';
import { StrategicMapDiagram, ServiceGrid } from './components/Diagrams';
import { OlgaChat } from './components/OlgaChat';
import { InteractiveMap } from './components/InteractiveMap';
import { X, Phone, Mail, MapPin, ExternalLink, Globe, Newspaper, Calendar, ChevronLeft, ChevronRight, Loader2, Info, Share2, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const ModalWrapper = ({ children, onClose, title }: { children?: React.ReactNode, onClose: () => void, title: string }) => (
  <>
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-ihara-dark/95 backdrop-blur-md z-[300]" />
    <div className="fixed inset-0 z-[310] flex items-center justify-center p-4 pointer-events-none">
      <MotionDiv initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="pointer-events-auto w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="font-black uppercase text-ihara-dark text-xl">{title}</h2>
          <button onClick={onClose} className="text-ihara-gray hover:text-ihara-red transition-colors"><X/></button>
        </div>
        <div className="p-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </MotionDiv>
    </div>
  </>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [maquilaModalOpen, setMaquilaModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [groundingChunks, setGroundingChunks] = useState<any[]>([]);
  const [newsIndex, setNewsIndex] = useState(0);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const WHATSAPP_NUMBER = "595993282213";
  const WHATSAPP_LINK_GENERAL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20solicitar%20una%20consultoría%20estratégica%20con%20Ihara%20Outsourcing.`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadFallbackNews = useCallback(() => {
    setNewsItems([
      { title: "Paraguay alcanza el histórico Grado de Inversión", date: "2024", summary: "Moody's otorga a Paraguay la calificación Baa3, marcando un hito para la atracción de capitales extranjeros y la estabilidad macroeconómica.", source: "Moody's / MIC", url: "https://www.mic.gov.py/", category: "Economía" },
      { title: "Exportaciones bajo Ley de Maquila rompen récords en 2024", date: "2024", summary: "La industria manufacturera paraguaya supera proyecciones anuales, consolidando a Alto Paraná como polo exportador regional.", source: "CNIME", url: "https://www.mic.gov.py/", category: "Industria" }
    ]);
    setGroundingChunks([]);
    setIsNewsLoading(false);
    setIsUsingFallback(true);
  }, []);

  const fetchLiveNews = useCallback(async (attempt = 1): Promise<void> => {
    if (attempt === 1) setIsNewsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Busca 3 noticias de negocios reales (2024-2025) sobre Paraguay. Formato estrictamente JSON: [{title, summary, date, source, url, category}].",
        config: { tools: [{ googleSearch: {} }] },
      });
      const rawText = response.text || "";
      const jsonStart = rawText.indexOf('[');
      const jsonEnd = rawText.lastIndexOf(']') + 1;
      if (jsonStart === -1) throw new Error("No JSON found");
      const newsData = JSON.parse(rawText.substring(jsonStart, jsonEnd));
      setNewsItems(newsData);
      setGroundingChunks(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
      setIsNewsLoading(false);
      setIsUsingFallback(false);
    } catch (error) {
      if (attempt < 2) setTimeout(() => fetchLiveNews(attempt + 1), 2000);
      else loadFallbackNews();
    }
  }, [loadFallbackNews]);

  useEffect(() => { fetchLiveNews(); }, [fetchLiveNews]);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  };

  const NavLink = ({ href, targetId, children }: { href: string; targetId: string; children?: React.ReactNode }) => (
    <a href={href} onClick={scrollToSection(targetId)} className={`relative py-2 transition-all duration-300 uppercase group text-[11px] font-bold tracking-widest ${scrolled ? 'text-ihara-gray hover:text-ihara-dark' : 'text-white/70 hover:text-white'}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-ihara-red transition-all duration-500 ease-out group-hover:w-full"></span>
    </a>
  );

  return (
    <div className="min-h-screen bg-white text-ihara-dark selection:bg-ihara-red selection:text-white relative">
      <OlgaChat />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex flex-col items-start">
              <span className={`font-sans font-bold text-xl tracking-tighter leading-none ${scrolled ? 'text-ihara-dark' : 'text-white'}`}>IHARA <span className="text-ihara-red font-black">OUTSOURCING</span></span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="#about" targetId="about">Servicios</NavLink>
            <NavLink href="#maquila" targetId="maquila">Maquila</NavLink>
            <NavLink href="#news" targetId="news">Noticias</NavLink>
            <NavLink href="#location" targetId="location">Ubicación</NavLink>
            <button onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")} className="ml-4 px-6 py-2.5 bg-ihara-red text-white rounded-sm hover:bg-ihara-dark transition-all shadow-md uppercase text-[10px] tracking-widest font-bold">CONTACTAR</button>
          </div>
        </div>
      </nav>

      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-ihara-dark">
        <HeroScene />
        <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">
          <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-block mb-6 px-4 py-1.5 bg-ihara-red text-white text-[10px] tracking-[0.3em] uppercase font-black">PARAGUAY: EL HUB INDUSTRIAL</div>
            <h1 className="font-sans text-5xl md:text-8xl font-black leading-none mb-6 text-white uppercase tracking-tighter">Traiga sus <br/><span className="text-ihara-red">Negocios</span> <br/>a Paraguay</h1>
            <p className="max-w-xl text-lg text-white/80 font-medium leading-relaxed mb-10 border-l-4 border-ihara-red pl-6">Consultoría estratégica para inversores globales en el corazón del Mercosur.</p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
               <button onClick={() => setMaquilaModalOpen(true)} className="px-8 py-4 bg-white text-ihara-dark font-black tracking-widest hover:bg-ihara-red hover:text-white transition-all shadow-xl">CONOCER MAQUILA</button>
               <button onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")} className="px-8 py-4 border-2 border-white text-white font-black tracking-widest hover:bg-white/10 transition-all">CONSULTAR AHORA</button>
            </div>
          </MotionDiv>
        </div>
      </header>

      <main>
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-5xl font-black mb-8 tracking-tighter uppercase leading-none">Quienes <br/><span className="text-ihara-red">Somos</span></h2>
              <p className="text-ihara-gray text-lg leading-relaxed font-medium mb-10">Estructura estratégica y administrativa para operar con rapidez y seguridad jurídica en Paraguay.</p>
              <button onClick={() => setExperienceModalOpen(true)} className="w-full text-left p-6 bg-ihara-light rounded-2xl border-l-4 border-ihara-red shadow-sm hover:shadow-md transition-all group">
                <h4 className="font-black text-xs uppercase tracking-widest group-hover:text-ihara-red">30 Años</h4>
                <p className="text-[10px] text-ihara-gray font-bold uppercase">De experiencia en gestión industrial.</p>
              </button>
            </div>
            <div className="lg:col-span-8">
              <ServiceGrid />
            </div>
          </div>
        </section>

        <section id="maquila" className="py-24 bg-ihara-dark text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Incentivos de <span className="text-ihara-red">Clase Mundial</span></h2>
            </div>
            <StrategicMapDiagram />
          </div>
        </section>

        <section id="news" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Impacto <span className="text-ihara-red">Estratégico</span></h2>
            </div>
            {isNewsLoading ? <Loader2 className="animate-spin text-ihara-red mx-auto" /> : (
              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <MotionDiv key={newsIndex} className="bg-stone-50 border border-stone-200 p-8 md:p-14 rounded-[2.5rem] shadow-xl">
                    <span className="px-4 py-1.5 border text-[9px] font-black uppercase tracking-widest rounded-full bg-ihara-red/10 text-ihara-red">{newsItems[newsIndex]?.category}</span>
                    <h3 className="text-xl md:text-3xl font-black uppercase my-6 tracking-tighter text-ihara-dark">{newsItems[newsIndex]?.title}</h3>
                    <p className="text-ihara-gray text-base md:text-lg italic mb-8">"{newsItems[newsIndex]?.summary}"</p>
                    <div className="flex justify-between items-center border-t border-stone-200 pt-8">
                      <span className="text-xs font-black uppercase">{newsItems[newsIndex]?.source}</span>
                      <a href={newsItems[newsIndex]?.url} target="_blank" className="px-8 py-3 bg-ihara-dark text-white text-[10px] font-black uppercase tracking-widest hover:bg-ihara-red">Ver Fuente</a>
                    </div>
                  </MotionDiv>
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        <section id="location" className="py-24 bg-stone-50">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">Ciudad del <span className="text-ihara-red">Este</span></h2>
              <div className="flex items-start gap-4 p-4 bg-white border border-stone-200 rounded shadow-sm">
                <MapPin className="text-ihara-red shrink-0" size={20} />
                <p className="font-bold text-ihara-dark uppercase text-sm">Oficina Central Ihara, CDE, Paraguay</p>
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
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-white text-4xl font-black uppercase mb-6 tracking-tighter">Inicie su <br/><span className="text-ihara-red">Expansión</span></h2>
                  <div className="space-y-6 text-white">
                    <div className="flex items-center gap-4 hover:text-ihara-red cursor-pointer" onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")}>
                      <Phone/><span className="font-black text-lg">+595 993 282 213</span>
                    </div>
                  </div>
                </div>
                <form className="space-y-4">
                  <input type="text" placeholder="NOMBRE COMPLETO" className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs font-black outline-none focus:border-ihara-red" />
                  <button type="button" onClick={() => window.open(WHATSAPP_LINK_GENERAL, "_blank")} className="w-full py-5 bg-ihara-red text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-ihara-red transition-all">Enviar Mensaje</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ihara-dark text-white/20 py-10 border-t border-white/5 text-center">
        <span className="font-bold text-white tracking-tighter text-xl uppercase">IHARA <span className="text-ihara-red">OUTSOURCING</span></span>
        <p className="mt-4 text-[9px] uppercase tracking-widest opacity-30">© 2024 Ihara Outsourcing Group. República del Paraguay.</p>
      </footer>

      <AnimatePresence>
        {experienceModalOpen && (
          <ModalWrapper onClose={() => setExperienceModalOpen(false)} title="30 Años de Trayectoria">
            <div className="space-y-8 text-sm text-ihara-gray">
              <p>Lideramos el desembarco de capitales mediante la apertura de empresas eficientes: EAS y Sociedades Anónimas.</p>
              <p>Contamos con una red exclusiva de galpones industriales listos para operar bajo la Ley de Maquila.</p>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
