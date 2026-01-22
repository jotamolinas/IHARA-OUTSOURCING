/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import { HeroScene } from './components/QuantumScene';
import { StrategicMapDiagram, ServiceGrid } from './components/Diagrams';
import { OlgaChat } from './components/OlgaChat';
import { InteractiveMap } from './components/InteractiveMap';
import { Phone, MapPin, Loader2 } from 'lucide-react';
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
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key no configurada");
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Busca 2 noticias de negocios reales en Paraguay de 2024. Formato JSON: [{title, summary, source, url}].",
        config: { tools: [{ googleSearch: {} }] },
      });
      
      const raw = response.text || "[]";
      const start = raw.indexOf('[');
      const end = raw.lastIndexOf(']') + 1;
      if (start !== -1) {
        setNewsItems(JSON.parse(raw.substring(start, end)));
      }
    } catch (e) { 
      setNewsItems([{
        title: "Paraguay mantiene estabilidad económica",
        summary: "El país se consolida como destino líder para inversiones industriales.",
        source: "BCP",
        url: "#"
      }]);
    } finally {
      setIsNewsLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  return (
    <div className="min-h-screen bg-white text-ihara-dark selection:bg-ihara-red selection:text-white">
      <OlgaChat />
      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className={`font-bold text-xl ${scrolled ? 'text-ihara-dark' : 'text-white'}`}>
              IHARA <span className="text-ihara-red">OUTSOURCING</span>
            </span>
          </div>
          <button 
            onClick={() => window.open(WHATSAPP_LINK, "_blank")} 
            className="bg-ihara-red text-white px-6 py-2 rounded font-bold text-xs tracking-widest uppercase hover:bg-ihara-dark transition-all"
          >
            CONTACTAR
          </button>
        </div>
      </nav>

      <header className="relative h-screen flex items-center bg-ihara-dark overflow-hidden">
        <HeroScene />
        <div className="relative z-10 container mx-auto px-6">
          <MotionDiv 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase leading-none mb-6 tracking-tighter">
              Traiga sus <br/>
              <span className="text-ihara-red">Negocios</span> <br/>
              a Paraguay
            </h1>
            <p className="max-w-xl text-lg text-white/70 mb-10 border-l-4 border-ihara-red pl-6 font-medium">
              Consultoría estratégica de alto nivel para el desembarco seguro de capitales internacionales.
            </p>
            <button 
              onClick={() => window.open(WHATSAPP_LINK, "_blank")} 
              className="px-10 py-4 bg-white text-ihara-dark font-black uppercase tracking-widest text-xs hover:bg-ihara-red hover:text-white transition-all shadow-xl"
            >
              CONSULTAR AHORA
            </button>
          </MotionDiv>
        </div>
      </header>

      <main>
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-black mb-12 uppercase tracking-tighter">
              Nuestros <span className="text-ihara-red">Servicios</span>
            </h2>
            <ServiceGrid />
          </div>
        </section>

        <section id="maquila" className="py-24 bg-ihara-dark text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter">
              Estrategia <span className="text-ihara-red">Maquila</span>
            </h2>
            <StrategicMapDiagram />
          </div>
        </section>

        <section id="location" className="py-24 bg-stone-50">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">
                Ciudad del <span className="text-ihara-red">Este</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-ihara-red" size={24}/>
                  <span className="font-bold text-ihara-dark uppercase text-sm">Sede Central, Alto Paraná, Paraguay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-ihara-red" size={24}/>
                  <span className="font-bold text-ihara-dark uppercase text-sm">+595 993 282 213</span>
                </div>
              </div>
            </div>
            <div className="h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <InteractiveMap />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ihara-dark text-white/40 py-12 text-center border-t border-white/5">
        <p className="font-bold text-white mb-4 uppercase tracking-tighter text-lg">
          IHARA <span className="text-ihara-red">OUTSOURCING</span>
        </p>
        <p className="text-[10px] uppercase tracking-widest opacity-60">© 2024 Ihara Group. Paraguay.</p>
      </footer>
    </div>
  );
};

export default App;
