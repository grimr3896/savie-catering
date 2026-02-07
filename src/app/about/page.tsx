import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Heart, Star } from 'lucide-react';

const aboutUsImage = PlaceHolderImages.find((img) => img.id === 'about-us-image');

const teamMembers = [
    { name: 'Jane Doe', role: 'Founder & Head Chef', imageSeed: '301' },
    { name: 'John Smith', role: 'Events Director', imageSeed: '302' },
    { name: 'Emily White', role: 'Pastry Chef', imageSeed: '303' },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            About CaterEase
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Passion for Food, Dedication to Service.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-headline font-semibold">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              Founded in 2010 by Chef Jane Doe, CaterEase was born from a simple
              idea: to bring restaurant-quality culinary experiences to private
              events. What started as a small operation out of a home kitchen has
              grown into one of the city's most beloved catering companies, known
              for our creative menus, attention to detail, and unwavering
              commitment to our clients.
            </p>
            <p className="mt-4 text-muted-foreground">
              We believe that food is more than just sustenance; it's a way to
              connect, celebrate, and create lasting memories. That philosophy is at
              the heart of everything we do.
            </p>
          </div>
          <div className="order-1 md:order-2">
            {aboutUsImage && (
                 <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={aboutUsImage.imageUrl}
                        alt={aboutUsImage.description}
                        data-ai-hint={aboutUsImage.imageHint}
                        width={800}
                        height={600}
                        className="object-cover"
                    />
                 </div>
            )}
          </div>
        </div>

        <div className="mt-24">
            <h2 className="text-3xl font-headline font-semibold text-center">Our Philosophy</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                            <Star className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline mt-4">Quality Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">We source the freshest, locally-sourced ingredients to create dishes that are vibrant and delicious.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                            <Heart className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline mt-4">Impeccable Service</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Our professional team is dedicated to providing a seamless and stress-free experience for you and your guests.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                            <ChefHat className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline mt-4">Culinary Creativity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">We love pushing boundaries and creating innovative menus that surprise and delight the senses.</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-headline font-semibold text-center">
            Meet the Team
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <div className="w-32 h-32 rounded-full mx-auto overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${member.imageSeed}/200/200`}
                      alt={member.name}
                      data-ai-hint="portrait person"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold font-headline">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
