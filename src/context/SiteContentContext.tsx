'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImagePlaceholder = PlaceHolderImages.find(
  (p) => p.id === 'hero-image'
);
const aboutUsImagePlaceholder = PlaceHolderImages.find(
  (p) => p.id === 'about-us-image'
);

const HERO_IMAGE_STORAGE_KEY = 'savie-royal-heroImageUrl';
const ABOUT_US_IMAGE_STORAGE_KEY = 'savie-royal-aboutUsImageUrl';


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

  useEffect(() => {
    const storedHeroImage = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
    if (storedHeroImage) {
      setHeroImageUrl(storedHeroImage);
    }
    const storedAboutUsImage = localStorage.getItem(ABOUT_US_IMAGE_STORAGE_KEY);
    if (storedAboutUsImage) {
      setAboutUsImageUrl(storedAboutUsImage);
    }
  }, []);

  const handleSetHeroImageUrl = (url: string) => {
    localStorage.setItem(HERO_IMAGE_STORAGE_KEY, url);
    setHeroImageUrl(url);
  };

  const handleSetAboutUsImageUrl = (url: string) => {
    localStorage.setItem(ABOUT_US_IMAGE_STORAGE_KEY, url);
    setAboutUsImageUrl(url);
  };


  return (
    <SiteContentContext.Provider
      value={{
        heroImageUrl,
        setHeroImageUrl: handleSetHeroImageUrl,
        aboutUsImageUrl,
        setAboutUsImageUrl: handleSetAboutUsImageUrl,
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
