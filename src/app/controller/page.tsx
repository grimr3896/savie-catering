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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Upload,
  Edit,
  Trash2,
  PlusCircle,
  UtensilsCrossed,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  services as initialServices,
  galleryImages,
  testimonials as initialTestimonials,
} from '@/lib/data';
import type { Service, Testimonial, GalleryImage } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';

const ImageUploader = ({
  onFileChange,
}: {
  onFileChange: (file: File) => void;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const handleFileSelect = (file: File) => {
    onFileChange(file);
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
      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center text-muted-foreground h-48 cursor-pointer transition-colors ${
        dragging
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/50 hover:border-primary hover:bg-primary/5'
      }`}
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

const ServiceEditDialog = ({
  open,
  onOpenChange,
  service,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null | undefined;
  onSave: (serviceData: {
    title: string;
    description: string;
    price: number;
  }) => void;
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);

  React.useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description);
      setPrice(service.price);
    } else {
      setTitle('');
      setDescription('');
      setPrice(0);
    }
  }, [service, open]);

  const handleSaveClick = () => {
    onSave({ title, description, price: Number(price) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {service ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="service-title">Title</Label>
            <Input
              id="service-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Wedding Catering"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-description">Description</Label>
            <Textarea
              id="service-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the service..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-price">Starting Price</Label>
            <Input
              id="service-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="e.g., 1000"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveClick}>Save Service</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function ControllerPage() {
  const { toast } = useToast();
  
  // --- State for Site-Wide Imagery ---
  const heroImagePlaceholder = PlaceHolderImages.find((p) => p.id === 'hero-image');
  const aboutUsImagePlaceholder = PlaceHolderImages.find((p) => p.id === 'about-us-image');

  const [heroImageFile, setHeroImageFile] = React.useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = React.useState(heroImagePlaceholder?.imageUrl);

  const [aboutImageFile, setAboutImageFile] = React.useState<File | null>(null);
  const [aboutImagePreview, setAboutImagePreview] = React.useState(aboutUsImagePlaceholder?.imageUrl);

  React.useEffect(() => {
    if (heroImageFile) {
      const objectUrl = URL.createObjectURL(heroImageFile);
      setHeroImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [heroImageFile]);

  React.useEffect(() => {
    if (aboutImageFile) {
      const objectUrl = URL.createObjectURL(aboutImageFile);
      setAboutImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [aboutImageFile]);

  const handleUpdateSiteImages = () => {
    // In a real app, you'd upload heroImageFile and aboutImageFile here.
    toast({
        title: "Images Updated (Simulated)",
        description: "In a real app, your new images would be saved.",
      });
  }


  // --- State for Services ---
  const [services, setServices] = React.useState<Service[]>(initialServices);
  const [isServiceDialogOpen, setServiceDialogOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<
    Service | null | undefined
  >(undefined);
  const [serviceToDelete, setServiceToDelete] = React.useState<Service | null>(
    null
  );

  const handleSaveService = (serviceData: {
    title: string;
    description: string;
    price: number;
  }) => {
    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id ? { ...editingService, ...serviceData } : s
        )
      );
      toast({
        title: 'Service Updated',
        description: `${serviceData.title} has been updated.`,
      });
    } else {
      const newService: Service = {
        id: Date.now(),
        ...serviceData,
        icon: UtensilsCrossed, // Default icon for new services
      };
      setServices([newService, ...services]);
      toast({
        title: 'Service Added',
        description: `${serviceData.title} has been added.`,
      });
    }
    setServiceDialogOpen(false);
    setEditingService(undefined);
  };

  const confirmDeleteService = () => {
    if (serviceToDelete) {
      setServices(services.filter((s) => s.id !== serviceToDelete.id));
      toast({
        title: 'Service Deleted',
        description: `${serviceToDelete.title} has been removed.`,
      });
      setServiceToDelete(null);
    }
  };

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
              {heroImagePreview && (
                <div className="my-2 rounded-lg overflow-hidden relative aspect-video">
                  <Image
                    src={heroImagePreview}
                    alt={heroImagePlaceholder?.description || 'Hero image preview'}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImagePlaceholder?.imageHint}
                  />
                </div>
              )}
              <ImageUploader onFileChange={setHeroImageFile} />
            </div>
            <div>
              <Label htmlFor="about-us-image">About Us Page Image</Label>
              {aboutImagePreview && (
                <div className="my-2 rounded-lg overflow-hidden relative aspect-video">
                  <Image
                    src={aboutImagePreview}
                    alt={aboutUsImagePlaceholder?.description || 'About us image preview'}
                    fill
                    className="object-cover"
                    data-ai-hint={aboutUsImagePlaceholder?.imageHint}
                  />
                </div>
              )}
              <ImageUploader onFileChange={setAboutImageFile} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleUpdateSiteImages}>Update Site Images</Button>
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
                <Input
                  id="image-caption"
                  placeholder="e.g., A beautiful summer wedding setup"
                />
              </div>
              <div>
                <Label>Upload Image</Label>
                <ImageUploader onFileChange={() => {}} />
              </div>
              <Button className="w-full">Add to Archive</Button>
              <div className="space-y-2 pt-4">
                <h4 className="font-semibold">Current Gallery Images</h4>
                <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                  {galleryImages.map((image) => (
                    <div
                      key={image.id}
                      className="border rounded-lg p-2 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={40}
                          height={40}
                          className="rounded flex-shrink-0"
                          data-ai-hint={image.aiHint}
                        />
                        <span className="text-sm truncate">{image.alt}</span>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
            <CardDescription>
              Add, edit, or remove service offerings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <service.icon className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-headline">
                          {service.title}
                        </h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground h-20">
                        {service.description}
                      </p>
                      <p className="text-sm font-semibold mt-2">
                        Starting from ${service.price}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingService(service);
                          setServiceDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setServiceToDelete(service)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <div
                  onClick={() => {
                    setEditingService(null);
                    setServiceDialogOpen(true);
                  }}
                >
                  <Card className="flex items-center justify-center border-dashed min-h-[200px] h-full cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                    <div className="text-center">
                      <PlusCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm font-semibold text-muted-foreground">
                        Add New Service
                      </p>
                    </div>
                  </Card>
                </div>
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
            <Textarea placeholder="Client quote..." />
            <Button className="w-full">Add Testimonial</Button>
            <div className="space-y-2 pt-4">
              <h4 className="font-semibold">Current Testimonials</h4>
              <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                {initialTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="border rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="overflow-hidden">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
              <CardDescription>
                Connect to your n8n automation backend.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your.n8n.instance/webhook-url"
              />
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <ServiceEditDialog
        open={isServiceDialogOpen}
        onOpenChange={setServiceDialogOpen}
        service={editingService}
        onSave={handleSaveService}
      />
      <AlertDialog
        open={!!serviceToDelete}
        onOpenChange={() => setServiceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service {'"'}
              {serviceToDelete?.title}
              {'"'}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={confirmDeleteService}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
