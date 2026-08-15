
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  srcSet?: string;
  sizes?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "", srcSet, sizes }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-generate srcset for Unsplash images to optimize for different breakpoints
  let finalSrcSet = srcSet;
  let finalSizes = sizes || "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px";
  let avifSrcSet;

  if (!finalSrcSet && src && src.includes('images.unsplash.com')) {
    const baseUrl = src.split('?')[0];
    avifSrcSet = `${baseUrl}?auto=format&q=80&w=400&fm=avif 400w, ${baseUrl}?auto=format&q=80&w=800&fm=avif 800w, ${baseUrl}?auto=format&q=80&w=1200&fm=avif 1200w`;
    finalSrcSet = `${baseUrl}?auto=format&q=80&w=400&fm=webp 400w, ${baseUrl}?auto=format&q=80&w=800&fm=webp 800w, ${baseUrl}?auto=format&q=80&w=1200&fm=webp 1200w`;
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100" />
      )}
      <picture>
        {avifSrcSet ? <source srcSet={avifSrcSet} sizes={finalSizes} type="image/avif" /> : null}
        <img
          src={src}
          srcSet={finalSrcSet}
          sizes={finalSrcSet ? finalSizes : undefined}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      </picture>
    </div>
  );
};
