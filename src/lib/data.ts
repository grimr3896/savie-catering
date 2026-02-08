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
import type { Service, GalleryImage, Testimonial, TeamMember, SocialLinks } from './definitions';
import { PlaceHolderImages } from './placeholder-images';

export const services: Service[] = [
  {
    id: 1,
    title: 'Wedding Catering',
    short_description:
      'Create your dream wedding with our bespoke catering services. From elegant canapés to lavish banquets, we make your special day delicious.',
    long_description: '',
    icon: Sparkles,
    price: 2500,
    currency: 'Ksh',
    imageId: 'service-wedding',
    category: 'package',
    is_active: true,
    display_order: 1,
  },
  {
    id: 2,
    title: 'Corporate Events',
    short_description:
      'Impress your clients and colleagues with our professional corporate catering. Perfect for meetings, conferences, and company parties.',
    long_description: '',
    icon: Briefcase,
    price: 1000,
    currency: 'Ksh',
    imageId: 'service-corporate',
    category: 'package',
    is_active: true,
    display_order: 2,
  },
  {
    id: 3,
    title: 'Private Parties',
    short_description:
      'Celebrate in style with our private party catering. We handle everything from birthdays to anniversaries, so you can enjoy the party.',
    long_description: '',
    icon: PartyPopper,
    price: 800,
    currency: 'Ksh',
    imageId: 'service-private-party',
    category: 'package',
    is_active: true,
    display_order: 3,
  },
  {
    id: 4,
    title: 'Dessert Tables',
    short_description:
      'Indulge your guests with a stunning dessert table, featuring a wide array of cakes, pastries, and sweet treats.',
    long_description: '',
    icon: CakeSlice,
    price: 500,
    currency: 'Ksh',
    imageId: 'service-dessert-tables',
    category: 'package',
    is_active: true,
    display_order: 4,
  },
  {
    id: 5,
    title: 'Beverage Services',
    short_description:
      'Complete your event with our full-service beverage options, including custom cocktails, fine wines, and non-alcoholic refreshments.',
    long_description: '',
    icon: GlassWater,
    price: 400,
    currency: 'Ksh',
    imageId: 'service-beverage',
    category: 'package',
    is_active: true,
    display_order: 5,
  },
  {
    id: 6,
    title: 'Custom Menus',
    short_description:
      "Have a specific theme or dietary need? We'll work with you to create a completely custom menu that brings your vision to life.",
    long_description: '',
    icon: UtensilsCrossed,
    price: 1200,
    currency: 'Ksh',
    imageId: 'service-custom-menus',
    category: 'package',
    is_active: true,
    display_order: 6,
  },
];

export const guestServices: Service[] = [
  {
    id: 7,
    title: 'Professional Waiters & Servers',
    short_description:
      "Our trained and courteous staff will attend to your guests' needs with professionalism and grace. Events Supported: All event types.",
    long_description: '',
    icon: UsersRound,
    price: 300,
    currency: 'Ksh',
    imageId: 'service-waiters',
    category: 'guest',
    is_active: true,
    display_order: 1,
  },
  {
    id: 8,
    title: 'Table Setup & Clearing',
    short_description:
      'We handle the complete setup of dining tables and ensure timely clearing to maintain a pristine environment. Events Supported: Seated Dinners, Receptions.',
    long_description: '',
    icon: Table,
    price: 200,
    currency: 'Ksh',
    imageId: 'service-table-setup',
    category: 'guest',
    is_active: true,
    display_order: 2,
  },
  {
    id: 9,
    title: 'Buffet Management',
    short_description:
      'Expert management of buffet stations to ensure food is always fresh, accessible, and beautifully presented. Events Supported: Buffet-style Events, Conferences.',
    long_description: '',
    icon: Soup,
    price: 250,
    currency: 'Ksh',
    imageId: 'service-buffet-management',
    category: 'guest',
    is_active: true,
    display_order: 3,
  },
];

export const galleryImages: GalleryImage[] = PlaceHolderImages.filter((img) =>
  img.id.startsWith('gallery-image-')
).map((img, index) => ({
  id: img.id,
  image_url: img.imageUrl,
  caption: img.description,
  event_type: 'other',
  created_at: new Date().toISOString(),
  display_order: index + 1,
  is_featured: index < 4,
}));

export const testimonials: Testimonial[] = [
  {
    id: 1,
    client_name: 'Sarah & Tom',
    event: 'Wedding Celebration',
    quote:
      'SAVIE ROYAL made our wedding day absolutely perfect. The food was divine, and the service was flawless. Our guests are still raving about the duck confit!',
    rating: 5,
    source: 'Manual',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    client_name: 'John D., CEO of TechCorp',
    event: 'Annual Corporate Gala',
    quote:
      'The professionalism and quality from SAVIE ROYAL are unmatched. They handled our 500-guest gala with ease, and the food was a huge hit. Highly recommended.',
    rating: 5,
    source: 'Manual',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    client_name: 'Maria G.',
    event: '50th Birthday Party',
    quote:
      "I couldn't have asked for a better catering experience for my birthday. The team was so attentive, and the dessert table was a work of art. Thank you, SAVIE ROYAL!",
    rating: 5,
    source: 'Manual',
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

export const teamMembers: TeamMember[] = [
  { id: 1, name: 'Jane Doe', role: 'Founder & Head Chef', bio: '', imageSeed: '301', display_order: 1, is_active: true },
  { id: 2, name: 'John Smith', role: 'Events Director', bio: '', imageSeed: '302', display_order: 2, is_active: true },
  { id: 3, name: 'Emily White', role: 'Pastry Chef', bio: '', imageSeed: '303', display_order: 3, is_active: true },
];

export const socialLinks: SocialLinks = [
    { platform: 'facebook', url: '#', is_active: true },
    { platform: 'instagram', url: '#', is_active: true },
    { platform: 'twitter', url: '#', is_active: true },
];
