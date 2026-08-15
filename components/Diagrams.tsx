
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Shield, Scale, Settings, Target, BarChart3, Users, Layout, Sprout, Beef, X, CheckCircle2, TrendingUp } from 'lucide-react';
import { translations } from '../translations.ts';

const MotionDiv = motion.div as any;

export const StrategicMapDiagram: React.FC<{ lang: string }> = ({ lang }) => {
  const t = translations[lang]?.strategy || translations.es.strategy;
  
  return (
    <div className="relative w-full max-w-5xl mx-auto p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div className="p-6 bg-ihara-red/5 border border-ihara-red/10 rounded-xl text-center">
          <div className="mb-4 flex justify-center"><Globe className="text-ihara-red" size={32}/></div>
          <h4 className="text-xs font-black uppercase mb-3 tracking-widest text-ihara-dark">{t.route1.title}</h4>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {t.route1.desc}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-ihara-red">
            <span className="text-[10px] font-bold">Mercosur</span>
            <ArrowRight size={12}/>
            <span className="text-[10px] font-bold">Paraguay</span>
            <ArrowRight size={12}/>
            <span className="text-[10px] font-bold">U.E.</span>
          </div>
        </div>

        <div className="p-6 bg-stone-50 border border-stone-200 rounded-xl text-center">
          <div className="mb-4 flex justify-center text-ihara-dark"><Globe size={32}/></div>
          <h4 className="text-xs font-black uppercase mb-3 tracking-widest text-ihara-dark">{t.route2.title}</h4>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {t.route2.desc}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-stone-400">
            <span className="text-[10px] font-bold">U.E.</span>
            <ArrowRight size={12}/>
            <span className="text-[10px] font-bold">Paraguay</span>
            <ArrowRight size={12}/>
            <span className="text-[10px] font-bold">Mercosur</span>
          </div>
        </div>

        <div className="p-6 bg-stone-50 border border-stone-200 rounded-xl text-center">
          <div className="mb-4 flex justify-center text-ihara-dark"><BarChart3 size={32}/></div>
          <h4 className="text-xs font-black uppercase mb-3 tracking-widest text-ihara-dark">{t.local.title}</h4>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {t.local.desc}
          </p>
          <div className="mt-4 inline-block px-3 py-1 bg-ihara-red rounded-full text-[9px] font-black uppercase text-white">{t.local.badge}</div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
         <div className="w-[800px] h-[800px] border border-ihara-dark rounded-full"></div>
         <div className="w-[600px] h-[600px] border border-ihara-dark rounded-full absolute"></div>
      </div>
    </div>
  );
};

export const ServiceGrid: React.FC<{ lang: string }> = ({ lang }) => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  // Close modal on lang change
  useEffect(() => {
    setSelectedService(null);
  }, [lang]);

  const tGlobal = translations[lang] || translations.es;
  const services = tGlobal.services_list || translations.es.services_list;
  const tUI = tGlobal.services || translations.es.services;

  const WHATSAPP_NUMBER = "595993282213";

  const icons = [
    <Users size={24}/>, <Layout size={24}/>, <Scale size={24}/>, <Sprout size={24}/>, 
    <Beef size={24}/>, <Shield size={24}/>, <Target size={24}/>, <Settings size={24}/>
  ];

  const handleAgendarConsultoria = (serviceTitle: string) => {
    const intro = tGlobal.whatsapp_msg;
    const details = lang === 'es' ? ` Me interesa específicamente el servicio de: ${serviceTitle}.` : ` I am specifically interested in the service: ${serviceTitle}.`;
    const text = encodeURIComponent(intro + details);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <div className="relative text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s: any, i: number) => (
          <MotionDiv 
            key={i}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedService(i)}
            className="p-8 bg-white border border-stone-200 hover:border-ihara-red/40 shadow-sm hover:shadow-xl hover:shadow-ihara-red/10 transition-all duration-300 border-b-4 hover:border-b-ihara-red cursor-pointer group rounded-xl flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 bg-ihara-red/10 text-ihara-red flex items-center justify-center mb-6 group-hover:bg-ihara-red group-hover:text-white transition-colors duration-300 rounded-lg">
                {icons[i] || <Globe size={24}/>}
              </div>
              <h3 className="font-sans text-lg font-black uppercase mb-4 tracking-tighter leading-tight text-ihara-dark">{s.title}</h3>
              <p className="text-stone-500 text-[11px] leading-relaxed font-medium mb-6">{s.shortDesc}</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ihara-red flex items-center gap-1 group-hover:gap-2 transition-all">
              {tUI.readMore} <ArrowRight size={10} />
            </span>
          </MotionDiv>
        ))}
      </div>

      <AnimatePresence>
        {selectedService !== null && services[selectedService] && (
          <>
            <MotionDiv 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-ihara-dark/80 backdrop-blur-md z-[110]"
            />

            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <MotionDiv 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="pointer-events-auto w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 max-h-[90vh] flex flex-col"
              >
                <div className="h-2 bg-ihara-red w-full"></div>
                
                <div className="relative p-8 md:p-14 overflow-y-auto custom-scrollbar text-left">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="absolute top-8 right-8 text-stone-400 hover:text-ihara-red transition-all p-2 bg-stone-50 rounded-full"
                  >
                    <X size={24} />
                  </button>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                    <div className="w-20 h-20 bg-ihara-red text-white flex items-center justify-center rounded-3xl shadow-lg shrink-0">
                      {icons[selectedService] || <Globe size={24}/>}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-ihara-dark leading-none text-center md:text-left">
                        {services[selectedService].title}
                      </h2>
                      <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
                        <TrendingUp size={14} className="text-ihara-red" />
                        <p className="text-ihara-red font-black text-[11px] uppercase tracking-[0.4em]">
                          {tUI.modalTitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <p className="text-stone-600 text-lg md:text-xl font-medium leading-relaxed italic border-l-8 border-ihara-red pl-8 py-4 bg-stone-50 rounded-r-2xl">
                      {services[selectedService].extendedDesc}
                    </p>

                    <div className="bg-white p-8 md:p-10 rounded-[1.5rem] border-2 border-stone-50 shadow-sm">
                      <h4 className="font-black text-ihara-dark uppercase text-[12px] tracking-[0.3em] mb-8 border-b border-stone-100 pb-4 flex items-center gap-3">
                         <CheckCircle2 size={18} className="text-ihara-red" /> {tUI.keyCaps}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
                        {services[selectedService].points.map((p: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 group/point">
                            <div className="w-1.5 h-1.5 bg-ihara-red mt-1.5 shrink-0 group-hover/point:scale-150 transition-transform"></div>
                            <span className="text-[12px] font-black text-stone-600 leading-tight uppercase tracking-tight">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleAgendarConsultoria(services[selectedService].title)}
                      className="flex-[2] py-5 bg-ihara-red text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-ihara-dark transition-all shadow-lg active:scale-95"
                    >
                      {tUI.modalButton}
                    </button>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="flex-1 py-5 bg-ihara-dark text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-stone-700 transition-all shadow-lg active:scale-95"
                    >
                      {tUI.close}
                    </button>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
