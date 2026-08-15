import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2, TrendingUp, Briefcase, Globe } from 'lucide-react';
import { translations } from '../translations';
import { LazyImage } from './LazyImage';

interface InvestorPassProps {
  lang: string;
}

export const InvestorPassSection: React.FC<InvestorPassProps> = ({ lang }) => {
  const t = useMemo(() => translations[lang] || translations.es, [lang]);
  const content = t.investor_pass;

  if (!content) return null;

  const WHATSAPP_LINK = `https://wa.me/595993282213?text=${encodeURIComponent(t.whatsapp_msg + " - " + content.title)}`;

  return (
    <section className="py-24 bg-stone-50 overflow-hidden border-t border-stone-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content */}
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-ihara-red/10 border border-ihara-red/20 mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-ihara-red flex items-center gap-2">
                  <Globe size={12} />
                  PARAGUAY INVESTOR PASS
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter text-ihara-dark leading-tight">
                {content.title}
              </h2>
              
              <p className="text-stone-500 text-lg font-medium leading-relaxed italic border-l-4 border-ihara-red pl-6 mb-10">
                {content.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm mb-8"
            >
              <h3 className="text-xl font-black uppercase tracking-tight text-ihara-dark mb-4 flex items-center gap-3">
                <Briefcase className="text-ihara-red" size={24} />
                {content.howItWorksTitle}
              </h3>
              <p className="text-stone-600 font-medium mb-6">
                {content.howItWorksDesc}
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-ihara-red shrink-0 mt-0.5" size={18} />
                  <span className="text-stone-600 font-medium">{content.point1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-ihara-red shrink-0 mt-0.5" size={18} />
                  <span className="text-stone-600 font-medium">{content.point2}</span>
                </li>
              </ul>
              
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-sm text-ihara-dark font-bold italic">
                  {content.conclusion}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Content / Image & Extra Info */}
          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] mb-8"
            >
              <LazyImage 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" 
                alt="Paraguay Investor Pass Concept" 
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ihara-dark/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <h4 className="text-white text-2xl font-black uppercase tracking-tight mb-2">
                  {content.importanceTitle}
                </h4>
                <p className="text-white/90 text-sm font-medium mb-2">
                  {content.importanceDesc1}
                </p>
                <p className="text-white/70 text-xs italic">
                  {content.importanceDesc2}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-ihara-dark p-8 rounded-3xl border border-white/10 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <TrendingUp size={64} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-4">
                {content.interestTitle}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                {content.interestDesc}
              </p>
              
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-white hover:text-[#25D366] transition-all shadow-lg"
              >
                <MessageCircle size={18} />
                {content.cta}
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
