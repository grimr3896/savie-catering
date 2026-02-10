'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Service, GalleryImage, Testimonial, TeamMember, SocialLinks } from '@/lib/definitions';
import { services as initialServices, galleryImages as initialGalleryImages, testimonials as initialTestimonials, teamMembers as initialTeamMembers, socialLinks as initialSocialLinks } from '@/lib/data';

const heroImagePlaceholder = PlaceHolderImages.find(
  (p) => p.id === 'hero-image'
);
const aboutUsImagePlaceholder = PlaceHolderImages.find(
  (p) => p.id === 'about-us-image'
);

const HERO_IMAGE_STORAGE_KEY = 'savie-royal-heroImageUrl';
const ABOUT_US_IMAGE_STORAGE_KEY = 'savie-royal-aboutUsImageUrl';
const SOCIAL_LINKS_STORAGE_KEY = 'savie-royal-socialLinks';
const SERVICES_STORAGE_KEY = 'savie-royal-services';
const GALLERY_IMAGES_STORAGE_KEY = 'savie-royal-galleryImages';
const TESTIMONIALS_STORAGE_KEY = 'savie-royal-testimonials';
const TEAM_MEMBERS_STORAGE_KEY = 'savie-royal-teamMembers';


type SiteContentContextType = {
  heroImageUrl: string;
  setHeroImageUrl: (url: string) => void;
  aboutUsImageUrl: string;
  setAboutUsImageUrl: (url: string) => void;
  services: Service[];
  setServices: (services: Service[]) => void;
  galleryImages: GalleryImage[];
  setGalleryImages: (images: GalleryImage[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  teamMembers: TeamMember[];
  setTeamMembers: (members: TeamMember[]) => void;
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
  const [services, setServices] = useState<Service[]>(initialServices);
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
    
    try {
      const storedSocialLinks = localStorage.getItem(SOCIAL_LINKS_STORAGE_KEY);
      if (storedSocialLinks) {
        const parsed = JSON.parse(storedSocialLinks);
        if (Array.isArray(parsed) && parsed.length > 0) setSocialLinks(parsed);
      }

      const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
      if (storedServices) {
        const parsed = JSON.parse(storedServices);
        if (Array.isArray(parsed) && parsed.length > 0) setServices(parsed);
      }

      const storedGalleryImages = localStorage.getItem(GALLERY_IMAGES_STORAGE_KEY);
      if (storedGalleryImages) {
        const parsed = JSON.parse(storedGalleryImages);
        if (Array.isArray(parsed) && parsed.length > 0) setGalleryImages(parsed);
      }

      const storedTestimonials = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
      if (storedTestimonials) {
        const parsed = JSON.parse(storedTestimonials);
        if (Array.isArray(parsed) && parsed.length > 0) setTestimonials(parsed);
      }

      const storedTeamMembers = localStorage.getItem(TEAM_MEMBERS_STORAGE_KEY);
      if (storedTeamMembers) {
        const parsed = JSON.parse(storedTeamMembers);
        if (Array.isArray(parsed) && parsed.length > 0) setTeamMembers(parsed);
      }
    } catch (error) {
      console.error("Failed to parse content from localStorage", error);
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

  const handleSetServices = (updatedServices: Service[]) => {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updatedServices));
    setServices(updatedServices);
  };

  const handleSetGalleryImages = (updatedImages: GalleryImage[]) => {
    localStorage.setItem(GALLERY_IMAGES_STORAGE_KEY, JSON.stringify(updatedImages));
    setGalleryImages(updatedImages);
  };

  const handleSetTestimonials = (updatedTestimonials: Testimonial[]) => {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updatedTestimonials));
    setTestimonials(updatedTestimonials);
  };

  const handleSetTeamMembers = (updatedMembers: TeamMember[]) => {
    localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(updatedMembers));
    setTeamMembers(updatedMembers);
  };


  return (
    <SiteContentContext.Provider
      value={{
        heroImageUrl,
        setHeroImageUrl: handleSetHeroImageUrl,
        aboutUsImageUrl,
        setAboutUsImageUrl: handleSetAboutUsImageUrl,
        services,
        setServices: handleSetServices,
        galleryImages,
        setGalleryImages: handleSetGalleryImages,
        testimonials,
        setTestimonials: handleSetTestimonials,
        teamMembers,
        setTeamMembers: handleSetTeamMembers,
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
