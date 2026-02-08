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
  Star,
  Info,
} from 'lucide-react';
import Image from 'next/image';
import {
  PlaceHolderImages,
  type ImagePlaceholder,
} from '@/lib/placeholder-images';
import type { Service, Testimonial, GalleryImage } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';
import { useSiteContent } from '@/context/SiteContentContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

const getImageUrlFromService = (service: Service | null | undefined): string | null => {
    if (!service) return null;
    const placeholderImage = PlaceHolderImages.find((p) => p.id === service.imageId);
    return service.imageUrl || placeholderImage?.imageUrl || null;
}

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
    imageUrl?: string;
  }) => void;
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description);
      setPrice(service.price);
      setImagePreview(getImageUrlFromService(service));
    } else {
      setTitle('');
      setDescription('');
      setPrice(0);
      setImagePreview(null);
    }
    setImageFile(null); // Reset file on open
  }, [service, open]);

  React.useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleSaveClick = () => {
    const saveData: {
      title: string;
      description: string;
      price: number;
      imageUrl?: string;
    } = { title, description, price: Number(price) };
    
    const initialImageUrl = getImageUrlFromService(service);

    if (imagePreview && imagePreview !== initialImageUrl) {
      saveData.imageUrl = imagePreview;
    }

    onSave(saveData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {service ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
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
            <Label htmlFor="service-price">Starting Price (Ksh)</Label>
            <Input
              id="service-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="e.g., 1000"
            />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            {imagePreview && (
              <div className="my-2 rounded-lg overflow-hidden relative aspect-video">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <ImageUploader onFileChange={setImageFile} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveClick}>Save Service</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const GalleryEditDialog = ({
  open,
  onOpenChange,
  image,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: GalleryImage | null | undefined;
  onSave: (imageData: { alt: string; src?: string }) => void;
}) => {
  const [alt, setAlt] = React.useState('');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (image) {
      setAlt(image.alt);
      setImagePreview(image.src); // Show current image
    } else {
      setAlt('');
      setImagePreview(null);
    }
    setImageFile(null); // Reset file on open
  }, [image, open]);

  React.useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleSaveClick = () => {
    const saveData: { alt: string; src?: string } = { alt };
    if (imagePreview && imagePreview !== image?.src) {
      saveData.src = imagePreview;
    }
    onSave(saveData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {image ? 'Edit Gallery Image' : 'Add Gallery Image'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="gallery-alt">Image Caption</Label>
            <Input
              id="gallery-alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="e.g., A beautiful summer wedding"
            />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            {imagePreview && (
              <div className="my-2 rounded-lg overflow-hidden relative aspect-video">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <ImageUploader onFileChange={setImageFile} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveClick}>Save Image</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TestimonialEditDialog = ({
  open,
  onOpenChange,
  testimonial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial: Testimonial | null | undefined;
  onSave: (testimonialData: {
    name: string;
    event: string;
    quote: string;
    rating: number;
  }) => void;
}) => {
  const [name, setName] = React.useState('');
  const [event, setEvent] = React.useState('');
  const [quote, setQuote] = React.useState('');
  const [rating, setRating] = React.useState(5);

  React.useEffect(() => {
    if (testimonial) {
      setName(testimonial.name);
      setEvent(testimonial.event);
      setQuote(testimonial.quote);
      setRating(testimonial.rating);
    } else {
      setName('');
      setEvent('');
      setQuote('');
      setRating(5);
    }
  }, [testimonial, open]);

  const handleSaveClick = () => {
    onSave({ name, event, quote, rating });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial-name">Client Name</Label>
            <Input
              id="testimonial-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Client Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-event">Event/Role</Label>
            <Input
              id="testimonial-event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="e.g., Wedding Client"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-quote">Quote</Label>
            <Textarea
              id="testimonial-quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Client quote..."
            />
          </div>
          <div className="space-y-3 pt-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveClick}>Save Testimonial</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function ControllerPage() {
  const { toast } = useToast();
  const {
    heroImageUrl,
    setHeroImageUrl,
    aboutUsImageUrl,
    setAboutUsImageUrl,
    services,
    setServices,
    galleryImages,
    setGalleryImages,
    testimonials,
    setTestimonials,
  } = useSiteContent();

  const heroImagePlaceholder = PlaceHolderImages.find(
    (p) => p.id === 'hero-image'
  );
  const aboutUsImagePlaceholder = PlaceHolderImages.find(
    (p) => p.id === 'about-us-image'
  );

  const [heroImageFile, setHeroImageFile] = React.useState<File | null>(null);
  const [aboutImageFile, setAboutImageFile] = React.useState<File | null>(null);

  const [heroImagePreview, setHeroImagePreview] = React.useState<string | null>(
    null
  );
  const [aboutImagePreview, setAboutImagePreview] =
    React.useState<string | null>(null);

  React.useEffect(() => {
    if (heroImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImagePreview(reader.result as string);
      };
      reader.readAsDataURL(heroImageFile);
    } else {
      setHeroImagePreview(null);
    }
  }, [heroImageFile]);

  React.useEffect(() => {
    if (aboutImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutImagePreview(reader.result as string);
      };
      reader.readAsDataURL(aboutImageFile);
    } else {
      setAboutImagePreview(null);
    }
  }, [aboutImageFile]);

  const handleUpdateSiteImages = () => {
    let imageUpdated = false;
    if (heroImageFile && heroImagePreview) {
      setHeroImageUrl(heroImagePreview);
      imageUpdated = true;
    }
    if (aboutImageFile && aboutImagePreview) {
      setAboutUsImageUrl(aboutImagePreview);
      imageUpdated = true;
    }

    if (imageUpdated) {
      toast({
        title: 'Images Updated',
        description:
          'Your new images are now live. Changes are temporary and will be lost on refresh.',
      });
      if (heroImageFile) setHeroImageFile(null);
      if (aboutImageFile) setAboutImageFile(null);
    } else {
      toast({
        title: 'No Changes',
        description: 'No new images were selected to update.',
      });
    }
  };

  // --- State for Services ---
  const [isServiceDialogOpen, setServiceDialogOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<
    Service | null | undefined
  >(undefined);
  const [serviceToDelete, setServiceToDelete] = React.useState<Service | null>(
    null
  );

  // --- State for Gallery ---
  const [galleryImageToDelete, setGalleryImageToDelete] =
    React.useState<GalleryImage | null>(null);
  const [isGalleryDialogOpen, setGalleryDialogOpen] = React.useState(false);
  const [editingGalleryImage, setEditingGalleryImage] = React.useState<
    GalleryImage | null | undefined
  >(undefined);

  // --- State for Testimonials ---
  const [testimonialToDelete, setTestimonialToDelete] =
    React.useState<Testimonial | null>(null);
  const [isTestimonialDialogOpen, setTestimonialDialogOpen] =
    React.useState(false);
  const [editingTestimonial, setEditingTestimonial] = React.useState<
    Testimonial | null | undefined
  >(undefined);

  const getImageUrl = (
    imageId: string | undefined
  ): ImagePlaceholder | undefined => {
    if (!imageId) return undefined;
    return PlaceHolderImages.find((p) => p.id === imageId);
  };

  const handleSaveService = (serviceData: {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
  }) => {
    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                ...serviceData,
                imageId: serviceData.imageUrl ? undefined : s.imageId,
              }
            : s
        )
      );
      toast({
        title: 'Service Updated',
        description: `${serviceData.title} has been updated.`,
      });
    } else {
      const newService: Service = {
        id: Date.now(),
        title: serviceData.title,
        description: serviceData.description,
        price: serviceData.price,
        imageUrl: serviceData.imageUrl,
        icon: UtensilsCrossed, // Default icon for new services
        category: 'package', // Default category
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

  const handleSaveGalleryImage = (imageData: {
    alt: string;
    src?: string;
  }) => {
    if (editingGalleryImage) {
      setGalleryImages(
        galleryImages.map((img) =>
          img.id === editingGalleryImage.id ? { ...img, ...imageData } : img
        )
      );
      toast({
        title: 'Gallery Image Updated',
        description: `The image has been updated.`,
      });
    } else {
      const newImage: GalleryImage = {
        id: `gallery-image-${Date.now()}`,
        src: imageData.src || `https://picsum.photos/seed/${Date.now()}/600/400`,
        alt: imageData.alt,
        aiHint: 'custom image',
      };
      setGalleryImages([newImage, ...galleryImages]);
      toast({
        title: 'Gallery Image Added',
        description: `The new image has been added.`,
      });
    }
    setGalleryDialogOpen(false);
    setEditingGalleryImage(undefined);
  };

  const confirmDeleteGalleryImage = () => {
    if (galleryImageToDelete) {
      setGalleryImages(
        galleryImages.filter((img) => img.id !== galleryImageToDelete.id)
      );
      toast({
        title: 'Gallery Image Deleted',
        description: `The image has been removed.`,
      });
      setGalleryImageToDelete(null);
    }
  };

  const handleSaveTestimonial = (testimonialData: {
    name: string;
    event: string;
    quote: string;
    rating: number;
  }) => {
    if (editingTestimonial) {
      setTestimonials(
        testimonials.map((t) =>
          t.id === editingTestimonial.id
            ? { ...t, ...testimonialData }
            : t
        )
      );
      toast({
        title: 'Testimonial Updated',
        description: `The testimonial from ${testimonialData.name} has been updated.`,
      });
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now(),
        ...testimonialData,
      };
      setTestimonials([newTestimonial, ...testimonials]);
      toast({
        title: 'Testimonial Added',
        description: `The testimonial from ${testimonialData.name} has been added.`,
      });
    }
    setTestimonialDialogOpen(false);
    setEditingTestimonial(undefined);
  };

  const confirmDeleteTestimonial = () => {
    if (testimonialToDelete) {
      setTestimonials(
        testimonials.filter((t) => t.id !== testimonialToDelete.id)
      );
      toast({
        title: 'Testimonial Deleted',
        description: `The testimonial by ${testimonialToDelete.name} has been removed.`,
      });
      setTestimonialToDelete(null);
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

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
              <div className="my-2 rounded-lg overflow-hidden relative aspect-video">
                <Image
                  src={heroImagePreview || heroImageUrl}
                  alt={heroImagePlaceholder?.description || 'Hero image preview'}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImagePlaceholder?.imageHint}
                />
              </div>
              <ImageUploader onFileChange={setHeroImageFile} />
            </div>
            <div>
              <Label htmlFor="about-us-image">About Us Page Image</Label>
              <div className="my-2 rounded-lg overflow-hidden relative aspect-video">
                <Image
                  src={aboutImagePreview || aboutUsImageUrl}
                  alt={
                    aboutUsImagePlaceholder?.description ||
                    'About us image preview'
                  }
                  fill
                  className="object-cover"
                  data-ai-hint={aboutUsImagePlaceholder?.imageHint}
                />
              </div>
              <ImageUploader onFileChange={setAboutImageFile} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleUpdateSiteImages}>
              Update Site Images
            </Button>
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
              <Button
                className="w-full"
                onClick={() => {
                  setEditingGalleryImage(null);
                  setGalleryDialogOpen(true);
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add to Archive
              </Button>
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingGalleryImage(image);
                            setGalleryDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setGalleryImageToDelete(image)}
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
                {services.map((service) => {
                  const placeholderImage = getImageUrl(service.imageId);
                  const imageSrc = service.imageUrl || placeholderImage?.imageUrl;
                  const imageAlt = placeholderImage?.description || service.title;
                  const imageHint = placeholderImage?.imageHint || 'custom image';
                  return (
                    <Card
                      key={service.id}
                      className="flex flex-col overflow-hidden"
                    >
                      {imageSrc && (
                        <div className="relative h-40 w-full">
                          <Image
                            src={imageSrc}
                            alt={imageAlt}
                            data-ai-hint={imageHint}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <service.icon className="w-6 h-6 text-primary" />
                          <h3 className="text-lg font-headline">
                            {service.title}
                          </h3>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground h-24">
                          {service.description}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Starting from Ksh {service.price}
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
                  );
                })}
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
            <CardDescription>
              Add or remove client testimonials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={() => {
                setEditingTestimonial(null);
                setTestimonialDialogOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
            <div className="space-y-2 pt-4">
              <h4 className="font-semibold">Current Testimonials</h4>
              <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                {testimonials.map((testimonial) => (
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingTestimonial(testimonial);
                          setTestimonialDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setTestimonialToDelete(testimonial)}
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
      <ServiceEditDialog
        open={isServiceDialogOpen}
        onOpenChange={setServiceDialogOpen}
        service={editingService}
        onSave={handleSaveService}
      />
      <TestimonialEditDialog
        open={isTestimonialDialogOpen}
        onOpenChange={setTestimonialDialogOpen}
        testimonial={editingTestimonial}
        onSave={handleSaveTestimonial}
      />
      <GalleryEditDialog
        open={isGalleryDialogOpen}
        onOpenChange={setGalleryDialogOpen}
        image={editingGalleryImage}
        onSave={handleSaveGalleryImage}
      />
      <AlertDialog
        open={!!serviceToDelete}
        onOpenChange={() => setServiceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              service {'"'}
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

      <AlertDialog
        open={!!galleryImageToDelete}
        onOpenChange={() => setGalleryImageToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              gallery image with caption "{galleryImageToDelete?.alt}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={confirmDeleteGalleryImage}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!testimonialToDelete}
        onOpenChange={() => setTestimonialToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              testimonial by "{testimonialToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={confirmDeleteTestimonial}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
