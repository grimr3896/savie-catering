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
  CardFooter,
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
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { useSiteContent } from '@/context/SiteContentContext';

export default function Home() {
  const { services, galleryImages, testimonials } =
    useSiteContent();

  const galleryPreviewImages = galleryImages.slice(0, 4);

  const getImageUrl = (
    imageId: string | undefined
  ): ImagePlaceholder | undefined => {
    if (!imageId) return undefined;
    return PlaceHolderImages.find((p) => p.id === imageId);
  };
  
  const cateringPackages = services.filter((s) => s.category === 'package');
  const guestServices = services.filter((s) => s.category === 'guest');

  return (
    <div className="flex flex-col">
      <section className="flex h-[60vh] md:h-[80vh] w-full flex-col items-center justify-center bg-secondary p-4 text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold animate-fade-in-up"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            Exceptional Catering. Crafted Live.
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            Weddings • Corporate • Private Dining
          </p>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            <Button asChild size="lg" className="mt-8">
              <Link href="/booking">
                Book an Event <ArrowRight />
              </Link>
            </Button>
          </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold">
              Our Catering Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whatever the occasion, SAVIE ROYAL provides exceptional food and
              impeccable service. Explore our offerings to find the perfect fit
              for your event.
            </p>
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-headline font-semibold text-center mb-12">
              Catering Packages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cateringPackages.map((service) => {
                const imagePlaceholder = getImageUrl(service.imageId);
                const imageSrc =
                  service.imageUrl || imagePlaceholder?.imageUrl;

                return (
                  <Card
                    key={service.id}
                    className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {imageSrc && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={imageSrc}
                          alt={
                            imagePlaceholder?.description || service.title
                          }
                          data-ai-hint={
                            imagePlaceholder?.imageHint || 'custom image'
                          }
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full -mt-12 bg-card z-10 border">
                        <service.icon className="w-10 h-10 text-primary" />
                      </div>
                      <CardTitle className="font-headline mt-4 text-2xl">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center">
                      <CardDescription>
                        {service.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Starting from Ksh {service.price}
                      </p>
                      <Button asChild className="w-full">
                        <Link href="/about#contact">Inquire Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mt-24">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-headline font-semibold">
                Guest Services
              </h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Ensure your event runs smoothly with our professional on-site
                staff and services.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guestServices.map((service) => {
                const imagePlaceholder = getImageUrl(service.imageId);
                const imageSrc =
                  service.imageUrl || imagePlaceholder?.imageUrl;

                return (
                  <Card
                    key={service.id}
                    className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {imageSrc && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={imageSrc}
                          alt={
                            imagePlaceholder?.description || service.title
                          }
                          data-ai-hint={
                            imagePlaceholder?.imageHint || 'custom image'
                          }
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full -mt-12 bg-card z-10 border">
                        <service.icon className="w-10 h-10 text-primary" />
                      </div>
                      <CardTitle className="font-headline mt-4 text-2xl">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center">
                      <CardDescription>
                        {service.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Starting from Ksh {service.price}
                      </p>
                      <Button asChild className="w-full">
                        <Link href="/booking">Book This Service</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 md:py-24 bg-secondary">
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
                            className={`w-5 h-5 transition-colors ${
                              i < testimonial.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-muted-foreground/50'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 font-semibold">{testimonial.name}</p>
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
