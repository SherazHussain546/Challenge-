
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { submitLeadAction } from '@/app/actions/leads';
import { Loader2, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  inquiry: z.string().min(10, { message: "Please provide a bit more detail about your typical inquiries." }),
});

export function AuditForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiry: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await submitLeadAction(values);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      toast({
        title: "Audit Requested Successfully",
        description: "Our team will review your inquiry and get back to you shortly.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.error || "Something went wrong. Please try again.",
      });
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center space-y-4 py-8 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h4 className="text-2xl font-bold">Inquiry Received</h4>
        <p className="text-muted-foreground">
          Thank you for reaching out. Dublin's AI assistant is already analyzing your request. We'll be in touch within 24 hours.
        </p>
        <Button 
          variant="outline" 
          onClick={() => { setIsSuccess(false); form.reset(); }}
          className="mt-4"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agency Name / Contact Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} className="bg-white/5 border-white/10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inquiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typical Inquiry Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Paste a sample inquiry you receive from prospects..." 
                  className="min-h-[120px] bg-white/5 border-white/10 resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-accent text-background font-bold h-12 text-lg gold-glow"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing with AI...
            </>
          ) : "Request System Audit"}
        </Button>
        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
          Secured by Dublin AI Systems Encryption
        </p>
      </form>
    </Form>
  );
}
