import type { LucideIcon } from 'lucide-react';

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  price: number;
  imageId?: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  aiHint: string;
};

export type Testimonial = {
  id: number;
  name: string;
  event: string;
  quote: string;
  rating: number;
};

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
