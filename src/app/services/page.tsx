import { services } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Our Catering Services
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whatever the occasion, CaterEase provides exceptional food and
          impeccable service. Explore our offerings to find the perfect fit
          for your event.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <service.icon className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="font-headline mt-4 text-2xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Starting from ${service.price}
              </p>
              <Button asChild className="w-full">
                <Link href="/about#contact">Inquire Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
