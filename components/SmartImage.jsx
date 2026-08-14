'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function SmartImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  aspectRatio = '4/3',
}) {
  const [imgSrc, setImgSrc] = useState(src || 'https://picsum.photos/seed/liquor/800/600');
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('https://picsum.photos/seed/vaultbottle/800/600');
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={imgSrc}
        alt={alt || 'Liquor Locker Vault Bottle'}
        width={width}
        height={height}
        priority={priority}
        onError={handleError}
        referrerPolicy="no-referrer"
        unoptimized={imgSrc.startsWith('http') && !imgSrc.includes('picsum.photos') && !imgSrc.includes('images.unsplash.com')}
        className="h-full w-full object-contain transition-transform duration-500 hover:scale-105 p-2"
      />
    </div>
  );
}
