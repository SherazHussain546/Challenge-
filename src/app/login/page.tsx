
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldAlert, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please use your authorized Dublin AI Systems account.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <Card className="w-full max-w-md border-white/10 glass-card relative z-10 overflow-hidden">
        <div className="h-1 bg-accent w-full" />
        <CardHeader className="text-center space-y-4 pt-10">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">Staff Access</CardTitle>
          <CardDescription className="text-lg">
            Authorized personnel only. Please sign in with your Dublin AI Systems credentials.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-10 pt-6">
          <Button 
            onClick={handleLogin}
            className="w-full bg-white text-background hover:bg-white/90 font-bold h-14 rounded-xl flex items-center justify-center gap-3 text-lg"
          >
            <LogIn className="w-6 h-6" />
            Sign in with Google
          </Button>
          <p className="mt-8 text-center text-xs text-muted-foreground uppercase tracking-widest">
            Protected by multi-factor authentication
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
