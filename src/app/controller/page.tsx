'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { services, galleryImages, testimonials } from '@/lib/data';

// An upload component that opens the file dialog and handles drag-and-drop
const ImageUploader = () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = React.useState(false);

    const handleFileSelect = (file: File) => {
        // For now, we'll just log the file name and show an alert.
        // The next step would be to upload this file and update the UI.
        console.log('Selected file:', file.name);
        alert(`Selected file: ${file.name}. Upload functionality is being developed!`);
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    return (
        <div 
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center text-muted-foreground h-48 cursor-pointer transition-colors ${dragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/50 hover:border-primary hover:bg-primary/5'}`}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <Upload className="w-8 h-8 mb-2" />
            <p>Click to upload or drag and drop</p>
        </div>
    );
};

const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image');
const aboutUsImage = PlaceHolderImages.find((p) => p.id === 'about-us-image');


export default function ControllerPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Content Controller
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Manage your website's content from one central location.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Site-Wide Imagery */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Site-Wide Imagery</CardTitle>
            <CardDescription>
              Manage key images across the site. Upload an image to change it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="hero-image">Homepage Hero Image</Label>
              {heroImage && (
                <div className="my-2 rounded-lg overflow-hidden relative aspect-video">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                  />
                </div>
              )}
              <ImageUploader />
            </div>
            <div>
              <Label htmlFor="about-us-image">About Us Page Image</Label>
              {aboutUsImage && (
                <div className="my-2 rounded-lg overflow-hidden relative aspect-video">
                  <Image
                    src={aboutUsImage.imageUrl}
                    alt={aboutUsImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={aboutUsImage.imageHint}
                  />
                </div>
              )}
              <ImageUploader />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Update Site Images</Button>
          </CardFooter>
        </Card>

        <div className="col-span-1 space-y-8">
            {/* Visual Archive -> Gallery */}
            <Card>
            <CardHeader>
                <CardTitle>Visual Archive (Gallery)</CardTitle>
                <CardDescription>Manage your event portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                <Label htmlFor="image-caption">Image Caption</Label>
                <Input id="image-caption" placeholder="e.g., A beautiful summer wedding setup" />
                </div>
                <div>
                <Label>Upload Image</Label>
                <ImageUploader />
                </div>
                 <Button className="w-full">Add to Archive</Button>
                <div className="space-y-2 pt-4">
                    <h4 className="font-semibold">Current Gallery Images</h4>
                    <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                        {galleryImages.map(image => (
                             <div key={image.id} className="border rounded-lg p-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 overflow-hidden">
                                <Image src={image.src} alt={image.alt} width={40} height={40} className="rounded flex-shrink-0" data-ai-hint={image.aiHint} />
                                <span className="text-sm truncate">{image.alt}</span>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            </Card>
        </div>
        
        {/* Manage Services */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Manage Services</CardTitle>
                <CardDescription>Add, edit, or remove service offerings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map(service => (
                             <Card key={service.id}>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <service.icon className="w-6 h-6 text-primary"/>
                                        <h3 className="text-lg font-headline">{service.title}</h3>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground h-20">{service.description}</p>
                                    <p className="text-sm font-semibold mt-2">Starting from ${service.price}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm"><Edit className="w-4 h-4 mr-2" />Edit</Button>
                                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                                </CardFooter>
                            </Card>
                        ))}
                         <Card className="flex items-center justify-center border-dashed min-h-[200px]">
                            <Button variant="outline" className="w-full h-full">Add New Service</Button>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Manage Testimonials */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Testimonials</CardTitle>
            <CardDescription>Add or remove client testimonials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Client Name" />
            <Input placeholder="Client Role (e.g. Wedding Client)" />
            <Textarea placeholder="Client quote..."/>
            <Button className="w-full">Add Testimonial</Button>
             <div className="space-y-2 pt-4">
                <h4 className="font-semibold">Current Testimonials</h4>
                <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="border rounded-lg p-3 flex items-center justify-between">
                            <div className="overflow-hidden">
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground truncate">"{testimonial.quote}"</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            {/* n8n Automation Bridge */}
            <Card>
            <CardHeader>
                <CardTitle>n8n Automation Bridge</CardTitle>
                <CardDescription>Connect to your n8n automation backend.</CardDescription>
            </CardHeader>
            <CardContent>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your.n8n.instance/webhook-url" />
            </CardContent>
            <CardFooter>
                <Button>Save Settings</Button>
            </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
