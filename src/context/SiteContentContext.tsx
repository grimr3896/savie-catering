'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImagePlaceholder = PlaceHolderImages.find(
  (p) => p.id === 'hero-image'
);
const aboutUsImagePlaceholder = PlaceHolderImages.find(
  (p) => p.id === 'about-us-image'
);

type SiteContentContextType = {
  heroImageUrl: string;
  setHeroImageUrl: (url: string) => void;
  aboutUsImageUrl: string;
  setAboutUsImageUrl: (url: string) => void;
};

const SiteContentContext = createContext<SiteContentContextType | undefined>(
  undefined
);

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [heroImageUrl, setHeroImageUrl] = useState<string>(
    heroImagePlaceholder?.imageUrl || ''
  );
  const [aboutUsImageUrl, setAboutUsImageUrl] = useState<string>(
    aboutUsImagePlaceholder?.imageUrl || ''
  );

  return (
    <SiteContentContext.Provider
      value={{
        heroImageUrl,
        setHeroImageUrl,
        aboutUsImageUrl,
        setAboutUsImageUrl,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
