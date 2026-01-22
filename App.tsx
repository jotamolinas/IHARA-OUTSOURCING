
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import { HeroScene } from './components/QuantumScene';
import { StrategicMapDiagram, ServiceGrid } from './components/Diagrams';
import { OlgaChat } from './components/OlgaChat';
import { InteractiveMap } from './components/InteractiveMap';
import { Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// Declaración para que Deno/TypeScript no fallen en el CI
declare global {
  interface Window {
    process: { env: { [key: string]: string } };
  }
}

// Aseguramos acceso a process.env incluso si no existe globalmente
const processEnv = typeof process !== 'undefined' ? process.env : (window.process?.env || {});

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
      const apiKey = processEnv.API_KEY;
      if (!apiKey) throw new Error("API Key no configurada");
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Busca 2 noticias de negocios reales en Paraguay de 2024. Responde en formato JSON: [{\"title\": \"...\", \"summary\": \"...\"}].",
        config: { tools: [{ googleSearch: {} }] },
      });
      
      const raw = response.text || "[]";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks
        .filter((c: any) => c.web)
        .map((c: any) => ({
          title: c.web.title,
          url: c.web.uri
        }));

      const start = raw.indexOf('[');
      const end = raw.lastIndexOf(']') + 1;
      if (start !== -1) {
        const parsed = JSON.parse(raw.substring(start, end));
        setNewsItems(parsed.map((item: any, idx: number) => ({
          ...item,
          sources: idx === 0 ? sources : (sources.length > 1 ? [sources[1]] : [])
        })));
      }
    } catch (e) { 
      setNewsItems([{
        title: "Paraguay mantiene estabilidad económica",
        summary: "El país se consolida como destino líder para inversiones industriales.",
        sources: [{ title: "Banco Central del Paraguay", url: "https://www.bcp.gov.py" }]
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
            <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-ihara-dark' : 'text-white'}`}>
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
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase leading-[0.9] mb-6 tracking-tighter">
              Traiga sus <br/>
              <span className="text-ihara-red">Negocios</span> <br/>
              a Paraguay
            </h1>
            <p className="max-w-xl text-lg text-white/70 mb-10 border-l-4 border-ihara-red pl-6 font-medium leading-relaxed italic">
              Consultoría estratégica de alto nivel para el desembarco seguro de capitales internacionales.
            </p>
            <button 
              onClick={() => window.open(WHATSAPP_LINK, "_blank")} 
              className="px-10 py-4 bg-white text-ihara-dark font-black uppercase tracking-widest text-xs hover:bg-ihara-red hover:text-white transition-all shadow-xl rounded-sm"
            >
              CONSULTAR AHORA
            </button>
          </MotionDiv>
        </div>
      </header>

      <main>
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-black mb-12 uppercase tracking-tighter">
              Nuestros <span className="text-ihara-red">Servicios</span>
            </h2>
            <ServiceGrid />
          </div>
        </section>

        <section id="news" className="py-24 bg-stone-50">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <Globe className="text-ihara-red" size={32} />
              <h2 className="text-4xl font-black uppercase tracking-tighter">
                Market <span className="text-ihara-red">Intelligence</span>
              </h2>
            </div>
            {isNewsLoading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="animate-pulse text-ihara-gray font-bold uppercase tracking-widest">Analizando región...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {newsItems.map((news, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{news.title}</h3>
                    <p className="text-ihara-gray text-sm leading-relaxed mb-6 italic">{news.summary}</p>
                    {news.sources && news.sources.length > 0 && (
                      <div className="space-y-2 border-t border-stone-100 pt-4">
                        <p className="text-[10px] font-black uppercase text-ihara-red mb-2 tracking-widest">Fuentes Externas:</p>
                        <div className="flex flex-wrap gap-4">
                          {news.sources.map((src: any, j: number) => (
                            <a key={j} href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ihara-dark hover:text-ihara-red transition-colors group">
                              <span className="text-[11px] font-bold uppercase underline underline-offset-4">{src.title}</span>
                              <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="strategy" className="py-24 bg-ihara-dark text-white">
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
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter text-ihara-dark">
                Ciudad del <span className="text-ihara-red">Este</span>
              </h2>
              <p className="text-ihara-gray mb-8 font-medium italic">Punto neurálgico del comercio en el Mercosur.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-stone-100">
                  <MapPin className="text-ihara-red" size={24}/>
                  <span className="font-bold text-ihara-dark uppercase text-xs tracking-wider">Sede Central, Alto Paraná, Paraguay</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-stone-100">
                  <Phone className="text-ihara-red" size={24}/>
                  <span className="font-bold text-ihara-dark uppercase text-xs tracking-wider">+595 993 282 213</span>
                </div>
              </div>
            </div>
            <div className="h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <InteractiveMap />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ihara-dark text-white/40 py-16 text-center border-t border-white/5">
        <div className="mb-8">
           <span className="font-bold text-white text-2xl tracking-tighter uppercase">
            IHARA <span className="text-ihara-red">OUTSOURCING</span>
          </span>
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] opacity-50">© 2024 Ihara Group. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
