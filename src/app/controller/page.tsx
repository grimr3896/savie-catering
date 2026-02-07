'use client';

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

// A placeholder for the image upload component
const ImageUploader = () => (
  <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center text-center text-muted-foreground h-48">
    <Upload className="w-8 h-8 mb-2" />
    <p>Click to upload or drag and drop</p>
  </div>
);

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
              <ImageUploader />
            </div>
            <div>
              <Label htmlFor="premier-image">Premier Section Image</Label>
              <ImageUploader />
            </div>
            <div>
              <Label htmlFor="services-image">Services Section Image</Label>
              <ImageUploader />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Update Site Images</Button>
          </CardFooter>
        </Card>

        <div className="col-span-1 space-y-8">
            {/* Visual Archive */}
            <Card>
            <CardHeader>
                <CardTitle>Visual Archive</CardTitle>
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
            </CardContent>
            <CardFooter>
                <Button>Add to Archive</Button>
            </CardFooter>
            </Card>

            {/* Manage Packages */}
            <Card>
            <CardHeader>
                <CardTitle>Manage Packages</CardTitle>
                <CardDescription>Add or remove service packages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Package Title" />
                <Input placeholder="Guest Count (e.g. 50-100 guests)" />
                <Textarea placeholder="Package description..." />
                <Textarea placeholder="Price/features, one per line..." />
                <div>
                <Label>Package Image</Label>
                <ImageUploader />
                </div>
                <Button className="w-full">Add Package</Button>
                <div className="space-y-2 pt-4">
                    <h4 className="font-semibold">Current Packages</h4>
                    <div className="border rounded-lg p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        <Image src="https://picsum.photos/seed/p1/40/40" alt="package" width={40} height={40} className="rounded" />
                        <span>The Wedding Package</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    </div>
                     <div className="border rounded-lg p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        <Image src="https://picsum.photos/seed/p2/40/40" alt="package" width={40} height={40} className="rounded" />
                        <span>The Funeral Package</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </div>
            </CardContent>
            </Card>
        </div>
        
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
            <Label>Client Avatar</Label>
            <ImageUploader />
            <Button className="w-full">Add Testimonial</Button>
             <div className="space-y-2 pt-4">
                <h4 className="font-semibold">Current Testimonials</h4>
                <div className="border rounded-lg p-2 flex items-center justify-between">
                    <span>Amina & Juma</span>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                </div>
                 <div className="border rounded-lg p-2 flex items-center justify-between">
                    <span>David Kimani</span>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
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

            {/* Add a New Service */}
            <Card>
            <CardHeader>
                <CardTitle>Add a New Service</CardTitle>
                <CardDescription>Add a new offering to your catalog.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Service Title (e.g. Wedding Catering)" />
                <Input placeholder="Lucide Icon Name (e.g. Cake)" />
                <Textarea placeholder="Describe the service..." />
                <Input placeholder="Category (e.g. Catering Services)" />
                <Input placeholder="Event Types (e.g. Weddings, Receptions)" />
                <Label>Service Image</Label>
                <ImageUploader />
            </CardContent>
            <CardFooter>
                <Button>Add Service</Button>
            </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
