import type { Service, GalleryImage, Testimonial, TeamMember, SocialLinks } from './definitions';

export const services: Service[] = [];

export const galleryImages: GalleryImage[] = [];

export const testimonials: Testimonial[] = [];

export const teamMembers: TeamMember[] = [];

export const socialLinks: SocialLinks = [
    {
        "id": 1,
        "platform": "facebook",
        "url": "https://www.facebook.com/savieroyal",
        "is_active": true,
        "display_order": 1
    },
    {
        "id": 2,
        "platform": "instagram",
        "url": "https://www.instagram.com/savieroyal",
        "is_active": true,
        "display_order": 2
    },
    {
        "id": 3,
        "platform": "twitter",
        "url": "https://www.twitter.com/savieroyal",
        "is_active": false,
        "display_order": 3
    }
];
