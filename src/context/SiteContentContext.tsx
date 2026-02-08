'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Service, GalleryImage, Testimonial, TeamMember, SocialLinks } from '@/lib/definitions';
import { services as initialServices, guestServices, galleryImages as initialGalleryImages, testimonials as initialTestimonials, teamMembers as initialTeamMembers, socialLinks as initialSocialLinks } from '@/lib/data';

const heroImagePlaceholder = PlaceHolderImages.find(
  (p) => p.id === 'hero-image'
);
const aboutUsImagePlaceholder = PlaceHolderImages.find(
  (p) => p.id === 'about-us-image'
);

const HERO_IMAGE_STORAGE_KEY = 'savie-royal-heroImageUrl';
const ABOUT_US_IMAGE_STORAGE_KEY = 'savie-royal-aboutUsImageUrl';
const SOCIAL_LINKS_STORAGE_KEY = 'savie-royal-socialLinks';


type SiteContentContextType = {
  heroImageUrl: string;
  setHeroImageUrl: (url: string) => void;
  aboutUsImageUrl: string;
  setAboutUsImageUrl: (url: string) => void;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  galleryImages: GalleryImage[];
  setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  socialLinks: SocialLinks;
  setSocialLinks: (links: SocialLinks) => void;
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
  const [services, setServices] = useState<Service[]>([...initialServices, ...guestServices]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(initialSocialLinks);


  useEffect(() => {
    const storedHeroImage = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
    if (storedHeroImage) {
      setHeroImageUrl(storedHeroImage);
    }
    const storedAboutUsImage = localStorage.getItem(ABOUT_US_IMAGE_STORAGE_KEY);
    if (storedAboutUsImage) {
      setAboutUsImageUrl(storedAboutUsImage);
    }
    const storedSocialLinks = localStorage.getItem(SOCIAL_LINKS_STORAGE_KEY);
    if (storedSocialLinks) {
      setSocialLinks(JSON.parse(storedSocialLinks));
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

  const handleSetSocialLinks = (links: SocialLinks) => {
    localStorage.setItem(SOCIAL_LINKS_STORAGE_KEY, JSON.stringify(links));
    setSocialLinks(links);
  };


  return (
    <SiteContentContext.Provider
      value={{
        heroImageUrl,
        setHeroImageUrl: handleSetHeroImageUrl,
        aboutUsImageUrl,
        setAboutUsImageUrl: handleSetAboutUsImageUrl,
        services,
        setServices,
        galleryImages,
        setGalleryImages,
        testimonials,
        setTestimonials,
        teamMembers,
        setTeamMembers,
        socialLinks,
        setSocialLinks: handleSetSocialLinks,
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
