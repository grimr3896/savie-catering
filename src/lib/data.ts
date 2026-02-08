import {
  UtensilsCrossed,
  CakeSlice,
  Briefcase,
  PartyPopper,
  GlassWater,
  Sparkles,
  UsersRound,
  Table,
  Soup,
} from 'lucide-react';
import type { Service } from './definitions';
import { PlaceHolderImages } from './placeholder-images';

export const services: Service[] = [
  {
    id: 1,
    title: 'Wedding Catering',
    description:
      'Create your dream wedding with our bespoke catering services. From elegant canapés to lavish banquets, we make your special day delicious.',
    icon: Sparkles,
    price: 2500,
    imageId: 'service-wedding',
  },
  {
    id: 2,
    title: 'Corporate Events',
    description:
      'Impress your clients and colleagues with our professional corporate catering. Perfect for meetings, conferences, and company parties.',
    icon: Briefcase,
    price: 1000,
    imageId: 'service-corporate',
  },
  {
    id: 3,
    title: 'Private Parties',
    description:
      'Celebrate in style with our private party catering. We handle everything from birthdays to anniversaries, so you can enjoy the party.',
    icon: PartyPopper,
    price: 800,
    imageId: 'service-private-party',
  },
  {
    id: 4,
    title: 'Dessert Tables',
    description:
      'Indulge your guests with a stunning dessert table, featuring a wide array of cakes, pastries, and sweet treats.',
    icon: CakeSlice,
    price: 500,
    imageId: 'service-dessert-tables',
  },
  {
    id: 5,
    title: 'Beverage Services',
    description:
      'Complete your event with our full-service beverage options, including custom cocktails, fine wines, and non-alcoholic refreshments.',
    icon: GlassWater,
    price: 400,
    imageId: 'service-beverage',
  },
  {
    id: 6,
    title: 'Custom Menus',
    description:
      "Have a specific theme or dietary need? We'll work with you to create a completely custom menu that brings your vision to life.",
    icon: UtensilsCrossed,
    price: 1200,
    imageId: 'service-custom-menus',
  },
];

export const guestServices: Service[] = [
  {
    id: 7,
    title: 'Professional Waiters & Servers',
    description:
      "Our trained and courteous staff will attend to your guests' needs with professionalism and grace. Events Supported: All event types.",
    icon: UsersRound,
    price: 300,
    imageId: 'service-waiters',
  },
  {
    id: 8,
    title: 'Table Setup & Clearing',
    description:
      'We handle the complete setup of dining tables and ensure timely clearing to maintain a pristine environment. Events Supported: Seated Dinners, Receptions.',
    icon: Table,
    price: 200,
    imageId: 'service-table-setup',
  },
  {
    id: 9,
    title: 'Buffet Management',
    description:
      'Expert management of buffet stations to ensure food is always fresh, accessible, and beautifully presented. Events Supported: Buffet-style Events, Conferences.',
    icon: Soup,
    price: 250,
    imageId: 'service-buffet-management',
  },
];

export const galleryImages: GalleryImage[] = PlaceHolderImages.filter((img) =>
  img.id.startsWith('gallery-image-')
).map((img) => ({
  id: img.id,
  src: img.imageUrl,
  alt: img.description,
  aiHint: img.imageHint,
}));

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah & Tom',
    event: 'Wedding Celebration',
    quote:
      'CaterEase made our wedding day absolutely perfect. The food was divine, and the service was flawless. Our guests are still raving about the duck confit!',
    rating: 5,
  },
  {
    id: 2,
    name: 'John D., CEO of TechCorp',
    event: 'Annual Corporate Gala',
    quote:
      'The professionalism and quality from CaterEase are unmatched. They handled our 500-guest gala with ease, and the food was a huge hit. Highly recommended.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Maria G.',
    event: '50th Birthday Party',
    quote:
      "I couldn't have asked for a better catering experience for my birthday. The team was so attentive, and the dessert table was a work of art. Thank you, CaterEase!",
    rating: 5,
  },
];
