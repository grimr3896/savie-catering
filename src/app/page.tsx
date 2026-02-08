'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { StaticImageData } from 'next/image';
import { ArrowRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useSiteContent } from '@/context/SiteContentContext';

export default function Home() {
  const { heroImageUrl, services, galleryImages, testimonials } = useSiteContent();
  const heroImagePlaceholder = PlaceHolderImages.find(
    (img) => img.id === 'hero-image'
  );

  const galleryPreviewImages = galleryImages.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImageUrl && heroImagePlaceholder && (
          <Image
            src={heroImageUrl}
            alt={heroImagePlaceholder.description}
            data-ai-hint={heroImagePlaceholder.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-lg">
            Exquisite Catering for Unforgettable Moments
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            From intimate gatherings to grand celebrations, we bring culinary
            excellence and impeccable service to your table.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/booking">
              Book Your Event <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We offer a range of catering services tailored to your needs.
              Every detail is crafted with care to ensure your event is a
              resounding success.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.filter(s => s.category === 'package').map((service) => (
              <Card
                key={service.id}
                className="flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/services">
                Explore All Services <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">
              From Our Events
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A glimpse into the beautiful moments and delectable spreads we've
              had the pleasure of creating.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryPreviewImages.map((img, index) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <Image
                  src={img.src as string}
                  alt={img.alt}
                  data-ai-hint={img.aiHint}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/gallery">
                View Full Gallery <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We're honored to have been a part of so many special occasions.
            </p>
          </div>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto mt-12"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="flex flex-col items-center text-center p-6">
                      <Quote className="w-8 h-8 text-primary" />
                      <p className="mt-4 text-lg md:text-xl italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>
                      <p className="mt-2 font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.event}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
