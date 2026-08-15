import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../translations.ts';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC<{ lang: string }> = ({ lang }) => {
  const tUI = translations[lang] || translations['en'];
  const faqData = tUI.faq;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!faqData || !faqData.items || faqData.items.length === 0) return null;

  return (
    <section id="faq" className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col mb-16 max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-ihara-dark">
              {faqData.title} <span className="text-ihara-red">{faqData.accent}</span>
            </h2>
            <p className="text-lg md:text-xl text-stone-600 font-medium">
              {faqData.desc}
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.items.map((item: any, idx: number) => {
              const isOpen = openIdx === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-stone-50 border ${isOpen ? 'border-ihara-red shadow-lg' : 'border-stone-200'} rounded-3xl overflow-hidden transition-all duration-300`}
                >
                  <button 
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-6 md:p-8 flex justify-between items-center"
                  >
                    <h3 className={`text-lg md:text-xl font-black tracking-tight pr-8 ${isOpen ? 'text-ihara-red' : 'text-ihara-dark'}`}>
                      {item.question}
                    </h3>
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-ihara-red text-white' : 'bg-white border border-stone-200 text-stone-500'}`}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 text-stone-600 font-medium leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
