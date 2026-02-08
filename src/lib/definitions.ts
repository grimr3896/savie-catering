import type { LucideIcon } from 'lucide-react';

export type Service = {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  price: number;
  currency: 'Ksh';
  imageId?: string;
  image_url?: string;
  is_active: boolean;
  display_order: number;
  icon: LucideIcon;
  category: 'package' | 'guest';
};

export type GalleryImage = {
  id: string;
  image_url: string;
  caption: string;
  event_type: 'wedding' | 'corporate' | 'private-party' | 'other';
  created_at: string; // ISO date string
  display_order: number;
  is_featured: boolean;
};

export type Testimonial = {
  id: number;
  client_name: string;
  event: string;
  quote: string;
  rating: number; // numeric
  source: 'Google' | 'WhatsApp' | 'Facebook' | 'Manual';
  is_featured: boolean;
  created_at: string; // ISO date string
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo_url?: string;
  imageSeed?: string; // Keep for placeholders
  display_order: number;
  is_active: boolean;
};

export type SocialLink = {
    platform: 'facebook' | 'instagram' | 'twitter';
    url: string;
    is_active: boolean;
};

export type SocialLinks = SocialLink[];


export type BookingRequest = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: Date;
  guestCount: number;
  venue: string;
  details?: string;
};

export type ContactRequest = {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export type MenuSuggestionRequest = {
  eventType: string;
  guestCount: number;
  diet?: string[];
  budget: number;
};
