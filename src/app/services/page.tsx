'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { useSiteContent } from '@/context/SiteContentContext';

export default function ServicesPage() {
  const { services } = useSiteContent();

  const cateringPackages = services.filter((s) => s.category === 'package');
  const guestServices = services.filter((s) => s.category === 'guest');

  const getImageUrl = (
    imageId: string | undefined
  ): ImagePlaceholder | undefined => {
    if (!imageId) return undefined;
    return PlaceHolderImages.find((p) => p.id === imageId);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Our Catering Services
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whatever the occasion, SAVIE ROYAL provides exceptional food and
          impeccable service. Explore our offerings to find the perfect fit for
          your event.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-headline font-semibold text-center mb-12">
          Catering Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cateringPackages.map((service) => {
            const imagePlaceholder = getImageUrl(service.imageId);
            const imageSrc = service.imageUrl || imagePlaceholder?.imageUrl;

            return (
              <Card
                key={service.id}
                className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {imageSrc && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageSrc}
                      alt={imagePlaceholder?.description || service.title}
                      data-ai-hint={imagePlaceholder?.imageHint || 'custom image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader className="items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full -mt-12 bg-background z-10 border">
                    <service.icon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4 text-2xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription>{service.description}</CardDescription>
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
          <h2 className="text-3xl font-headline font-semibold">
            Guest Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ensure your event runs smoothly with our professional on-site staff
            and services.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guestServices.map((service) => {
            const imagePlaceholder = getImageUrl(service.imageId);
            const imageSrc = service.imageUrl || imagePlaceholder?.imageUrl;
            
            return (
              <Card
                key={service.id}
                className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {imageSrc && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={imageSrc}
                      alt={imagePlaceholder?.description || service.title}
                      data-ai-hint={imagePlaceholder?.imageHint || 'custom image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader className="items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full -mt-12 bg-background z-10 border">
                    <service.icon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4 text-2xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription>{service.description}</CardDescription>
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
  );
}
