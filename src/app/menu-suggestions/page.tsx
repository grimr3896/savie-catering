'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, ChefHat } from 'lucide-react';
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { getMenuSuggestion } from './actions';

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'nut-free', label: 'Nut-Free' },
];

const suggestionSchema = z.object({
  eventType: z.string({ required_error: 'Please select an event type.' }),
  guestCount: z.coerce.number().int().positive('Number of guests is required.'),
  diet: z.array(z.string()).optional(),
  budget: z.coerce.number().min(10, 'Budget must be at least $10.'),
});

type SuggestionFormValues = z.infer<typeof suggestionSchema>;

type MenuSuggestion = {
    menu: {
        appetizers: string[];
        mains: string[];
        desserts: string[];
    };
    reasoning: string;
}

export default function MenuSuggestionPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState<MenuSuggestion | null>(null);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      budget: 50,
      guestCount: 50,
      diet: [],
    },
  });

  async function onSubmit(data: SuggestionFormValues) {
    setIsLoading(true);
    setSuggestion(null);
    const result = await getMenuSuggestion(data);
    setIsLoading(false);

    if (result.success) {
      setSuggestion(result.data as MenuSuggestion);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          AI Menu Planner
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Let our smart assistant craft the perfect menu for your event. Just provide a few details to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Tell us about your event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="private-party">Private Party</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="diet"
                    render={() => (
                        <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Dietary Preferences</FormLabel>
                            <FormDescription>
                            Select any dietary needs for your guests.
                            </FormDescription>
                        </div>
                        {dietaryOptions.map((item) => (
                            <FormField
                            key={item.id}
                            control={form.control}
                            name="diet"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item.id
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    {item.label}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget per Person: ${field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          min={10}
                          max={300}
                          step={5}
                          value={[field.value]}
                          onValueChange={(values) => field.onChange(values[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Menu
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center">
            {isLoading && (
                 <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                    <p className="font-semibold text-lg">Crafting your perfect menu...</p>
                 </div>
            )}
            {!isLoading && !suggestion && (
                <Card className="w-full h-full flex flex-col items-center justify-center text-center bg-muted/50 border-dashed">
                    <CardHeader>
                        <div className="mx-auto bg-background p-4 rounded-full w-fit">
                            <ChefHat className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-muted-foreground">Your Menu Awaits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Fill out the form to see your personalized menu suggestion.</p>
                    </CardContent>
                </Card>
            )}
            {suggestion && (
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Your Suggested Menu</CardTitle>
                        <CardDescription>A menu designed just for you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg font-headline">Appetizers</h3>
                            <ul className="list-disc list-inside text-muted-foreground mt-2">
                                {suggestion.menu.appetizers.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg font-headline">Main Courses</h3>
                            <ul className="list-disc list-inside text-muted-foreground mt-2">
                                {suggestion.menu.mains.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg font-headline">Desserts</h3>
                            <ul className="list-disc list-inside text-muted-foreground mt-2">
                                {suggestion.menu.desserts.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>

                         <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>AI Reasoning</AccordionTrigger>
                                <AccordionContent>
                                {suggestion.reasoning}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" asChild>
                            <a href="/booking">Looks good! Let's book it.</a>
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
