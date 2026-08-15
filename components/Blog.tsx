
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, X, MessageCircle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { translations } from '../translations.ts';
import { LazyImage } from './LazyImage.tsx';

const MotionDiv = motion.div as any;

export const BlogSection: React.FC<{ lang: string }> = ({ lang }) => {
  const [selectedArticleIdx, setSelectedArticleIdx] = useState<number | null>(null);
  const [showFullLibrary, setShowFullLibrary] = useState(false);
  
  useEffect(() => {
    setSelectedArticleIdx(null);
  }, [lang]);

  const tGlobal = translations[lang] || translations.es;
  const allArticles = tGlobal.blog_articles || translations.es.blog_articles || [];
  const tUI = tGlobal.blog || translations.es.blog;

  const WHATSAPP_NUMBER = "595993282213";
  const articlesInGrid = showFullLibrary ? allArticles : allArticles.slice(0, 3);

  const handleConsultancy = (articleTitle: string) => {
    const intro = tGlobal.whatsapp_msg;
    const interestText = tUI.wa_interest;
    const text = encodeURIComponent(`${intro}${interestText}${articleTitle}.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  if (!allArticles.length) return null;

  return (
    <section id="insights" className="py-24 bg-stone-50 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <MotionDiv 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-ihara-dark">
              {tUI.title} <br/> <span className="text-ihara-red">{tUI.accent}</span>
            </h2>
            <p className="text-ihara-gray font-medium italic max-w-md">
              {tUI.subtitle}
            </p>
          </MotionDiv>
          
          <MotionDiv 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => setShowFullLibrary(!showFullLibrary)}
            className="flex items-center gap-4 border-b-2 border-ihara-dark pb-2 cursor-pointer hover:border-ihara-red hover:text-ihara-red transition-all group"
          >
            <BookOpen size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">
              {showFullLibrary ? (tUI.showLess || "Ver Menos") : tUI.explore}
            </span>
            {showFullLibrary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </MotionDiv>
        </div>

        <MotionDiv layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {articlesInGrid.map((post: any, i: number) => (
              <MotionDiv
                key={post.title} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedArticleIdx(i)}
                className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm flex flex-col overflow-hidden group hover:border-ihara-red cursor-pointer transition-all duration-500 h-full text-left"
              >
                <div className="relative h-56 overflow-hidden">
                  <LazyImage 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ihara-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-ihara-red px-4 py-1.5 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-10 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 group-hover:text-ihara-red transition-colors">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-stone-300">
                        <Clock size={12} /> {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight text-ihara-dark">
                      {post.title}
                    </h3>
                    <p className="text-ihara-gray text-sm leading-relaxed mb-8 italic line-clamp-3">
                      "{post.excerpt}"
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(post.keywords || []).map((kw: string, idx: number) => (
                        <span key={idx} className="text-[9px] font-bold text-ihara-red uppercase">#{kw}</span>
                      ))}
                    </div>
                    <button className="w-full py-4 border-2 border-stone-100 rounded-xl group-hover:border-ihara-red group-hover:bg-ihara-red group-hover:text-white transition-all flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
                      {tUI.readArticle} <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </AnimatePresence>
        </MotionDiv>

        {!showFullLibrary && allArticles.length > 3 && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 flex justify-center">
            <button 
              onClick={() => setShowFullLibrary(true)}
              className="px-12 py-5 bg-ihara-dark text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-ihara-red transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              {tUI.explore} <BookOpen size={16} />
            </button>
          </MotionDiv>
        )}
      </div>

      <AnimatePresence>
        {selectedArticleIdx !== null && articlesInGrid[selectedArticleIdx] && (
          <>
            <MotionDiv 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedArticleIdx(null)}
              className="fixed inset-0 bg-ihara-dark/95 backdrop-blur-md z-[150]"
            />
            
            <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <MotionDiv 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="pointer-events-auto w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/20 max-h-[90vh] flex flex-col"
              >
                <div className="h-2 bg-ihara-red w-full shrink-0"></div>
                
                <div className="relative overflow-y-auto custom-scrollbar flex-1 text-left">
                  <button 
                    onClick={() => setSelectedArticleIdx(null)}
                    className="absolute top-8 right-8 text-ihara-gray hover:text-ihara-red transition-all p-2 bg-stone-100 rounded-full z-[170]"
                  >
                    <X size={24} />
                  </button>

                  <div className="h-64 md:h-80 w-full relative">
                    <LazyImage 
                      src={articlesInGrid[selectedArticleIdx].image} 
                      alt={articlesInGrid[selectedArticleIdx].title}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-14">
                      <span className="text-ihara-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
                         {articlesInGrid[selectedArticleIdx].category}
                      </span>
                      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-ihara-dark leading-none">
                        {articlesInGrid[selectedArticleIdx].title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-8 md:p-14 pt-0">
                    <div className="flex items-center gap-6 mb-12 py-6 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-stone-300" />
                        <span className="text-[10px] font-black uppercase text-stone-400">{articlesInGrid[selectedArticleIdx].readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <TrendingUp size={16} className="text-ihara-red" />
                         <span className="text-[10px] font-black uppercase text-ihara-red">{tUI.analysis_label}</span>
                      </div>
                    </div>

                    <div className="prose prose-stone max-w-none">
                      <p className="text-ihara-gray text-lg md:text-2xl font-medium leading-relaxed italic border-l-8 border-ihara-red pl-8 mb-12">
                        {articlesInGrid[selectedArticleIdx].excerpt}
                      </p>
                      <div className="text-ihara-gray text-sm md:text-base leading-relaxed space-y-6 font-medium whitespace-pre-line">
                         {articlesInGrid[selectedArticleIdx].content}
                      </div>
                    </div>

                    <div className="mt-16 pt-12 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-8">
                       <div className="flex items-center gap-4 text-left">
                          <div className="w-12 h-12 bg-ihara-red rounded-xl flex items-center justify-center text-white shadow-lg">
                             <TrendingUp size={24} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-ihara-dark">{tUI.modal_prompt}</p>
                             <p className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter">{tUI.modal_subprompt}</p>
                          </div>
                       </div>
                       
                       <button 
                         onClick={() => handleConsultancy(articlesInGrid[selectedArticleIdx].title)}
                         className="w-full md:w-auto px-10 py-5 bg-ihara-dark text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-ihara-red transition-all flex items-center justify-center gap-4 group shadow-xl"
                       >
                         {tUI.whatsappAction} <MessageCircle size={18} />
                       </button>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
