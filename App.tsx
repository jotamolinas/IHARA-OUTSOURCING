import React, { useState, useEffect, useCallback } from 'react';
import { HeroScene } from './components/QuantumScene';
import { StrategicMapDiagram, ServiceGrid } from './components/Diagrams';
import { OlgaChat } from './components/OlgaChat';
import { InteractiveMap } from './components/InteractiveMap';
import { X, Phone, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const MotionDiv = motion.div as any;

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  const WHATSAPP_LINK = `https://wa.me/595993282213?text=Hola,%20me%20gustaría%20solicitar%20una%20consultoría.`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Busca 2 noticias de negocios en Paraguay 2024. Formato JSON: [{title, summary, source, url}].",
        config: { tools: [{ googleSearch: {} }] },
      });
      const raw = response.text || "[]";
      setNewsItems(JSON.parse(raw.substring(raw.indexOf('['), raw.lastIndexOf(']') + 1)));
      setIsNewsLoading(false);
    } catch (e) { setIsNewsLoading(false); }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  return (
    <div className="min-h-screen bg-white text-ihara-dark">
      <OlgaChat />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className={`font-bold text-xl ${scrolled ? 'text-ihara-dark' : 'text-white'}`}>IHARA <span className="text-ihara-red">OUTSOURCING</span></span>
          <button onClick={() => window.open(WHATSAPP_LINK, "_blank")} className="bg-ihara-red text-white px-6 py-2 rounded font-bold text-xs">CONTACTAR</button>
        </div>
      </nav>

      <header className="relative h-screen flex items-center bg-ihara-dark">
        <HeroScene />
        <div className="relative z-10 container mx-auto px-6">
          <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase leading-none mb-6">Traiga sus <br/><span className="text-ihara-red">Negocios</span> <br/>a Paraguay</h1>
            <button onClick={() => window.open(WHATSAPP_LINK, "_blank")} className="px-8 py-4 bg-white text-ihara-dark font-black hover:bg-ihara-red hover:text-white transition-all">CONSULTAR AHORA</button>
          </MotionDiv>
        </div>
      </header>

      <main>
        <section id="about" className="py-24"><div className="container mx-auto px-6"><h2 className="text-5xl font-black mb-12 uppercase">Nuestros <span className="text-ihara-red">Servicios</span></h2><ServiceGrid /></div></section>
        <section className="py-24 bg-ihara-dark text-white"><div className="container mx-auto px-6 text-center"><h2 className="text-4xl font-black mb-12 uppercase">Estrategia <span className="text-ihara-red">Maquila</span></h2><StrategicMapDiagram /></div></section>
        <section className="py-24 bg-stone-50"><div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"><div><h2 className="text-5xl font-black mb-6 uppercase">Ciudad del <span className="text-ihara-red">Este</span></h2><p className="font-bold flex items-center gap-2"><MapPin className="text-ihara-red"/> Sede Central, Alto Paraná</p></div><div className="h-[400px]"><InteractiveMap /></div></div></section>
      </main>

      <footer className="bg-ihara-dark text-white/40 py-12 text-center border-t border-white/5">
        <p className="font-bold text-white mb-4">IHARA OUTSOURCING</p>
        <p className="text-[10px] uppercase tracking-widest">© 2024 Ihara Group. Paraguay.</p>
      </footer>
    </div>
  );
};

export default App;
