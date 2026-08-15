/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { translations } from '../translations.ts';

export const TestimonialsSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const testimonials = t.testimonials;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // approx width of one card + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!testimonials || !testimonials.items || testimonials.items.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 bg-stone-50 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-ihara-dark">
              {testimonials.title} <span className="text-ihara-red">{testimonials.accent}</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 hidden md:flex">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-400 hover:text-ihara-dark hover:border-ihara-dark transition-colors"
              aria-label="Previous Testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-400 hover:text-ihara-dark hover:border-ihara-dark transition-colors"
              aria-label="Next Testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbars no-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.items.map((item: any, idx: number) => (
            <div 
              key={idx} 
              className="min-w-[320px] max-w-[400px] w-[85vw] md:w-auto flex-shrink-0 snap-start bg-white p-10 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-between"
            >
              <div>
                <div className="text-ihara-red mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.439 12.353H11.539L11.539 3H21.539L21.539 12.353L19.017 21H14.017ZM4.01701 21L6.43901 12.353H1.53901L1.53901 3H11.539L11.539 12.353L9.01701 21H4.01701Z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl text-stone-600 font-medium italic leading-relaxed mb-8">
                  "{item.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-stone-200 flex flex-shrink-0 items-center justify-center text-stone-500 font-bold text-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-ihara-dark">{item.name}</h4>
                  <p className="text-sm text-stone-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile-only scroll buttons (optional, since it's swipeable) */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-400 active:bg-stone-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-400 active:bg-stone-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
