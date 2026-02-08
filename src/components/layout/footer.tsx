'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/context/SiteContentContext';

export function Footer() {
  const { socialLinks } = useSiteContent();
  const navLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Crafting unforgettable culinary experiences for your most cherished
              moments.
            </p>
            <div className="mt-4 flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={socialLinks.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Facebook />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={socialLinks.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Instagram />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={socialLinks.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label="Twitter"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold font-headline">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
               <li>
                  <Link
                    href="/about#contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-headline">Our Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  Wedding Catering
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Corporate Events
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Private Parties
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  And more...
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-headline">Contact Us</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-muted-foreground">
              <a
                href="mailto:savieroyal1@gmail.com"
                className="block hover:text-foreground transition-colors"
              >
                savieroyal1@gmail.com
              </a>
              <a
                href="tel:0718469682"
                className="block hover:text-foreground transition-colors"
              >
                0718 469 682
              </a>
              <a
                href="https://wa.me/254711665382"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-foreground transition-colors"
              >
                0711 665 382 (WhatsApp)
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SAVIE ROYAL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
