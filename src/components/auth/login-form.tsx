"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { VeralogixLogo } from '../brand/veralogix-logo';

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('demo@veralogix.com');
  const [password, setPassword] = useState('password');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, isUserLoading } = useUser();

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The useUser hook will handle the redirect via the useEffect above
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: error.message || 'An unexpected error occurred.',
      });
      setIsLoggingIn(false);
    }
  };

  const handleDemoLogin = async () => {
    if (!auth) return;

    setIsLoggingIn(true);
    try {
      await signInAnonymously(auth);
      // The useUser hook will handle the redirect
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Demo Sign In Failed',
        description: error.message || 'Could not sign in as guest.',
      });
      setIsLoggingIn(false);
    }
  };

  const isLoading = isLoggingIn || isUserLoading;

  return (
    <Card className="w-full max-w-md glass-card">
      <CardHeader className="text-center">
        <VeralogixLogo className="h-12 mx-auto mb-4" />
        <CardTitle className="font-headline text-3xl">Veralogix Smart Mining</CardTitle>
        <CardDescription>Central nervous system for your mining operations.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full font-bold" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </Button>
          {isDemoMode && (
            <>
              <div className="relative w-full">
                <Separator className="absolute left-0 top-1/2 -translate-y-1/2" />
                <p className="text-center text-xs text-muted-foreground bg-card px-2 relative">
                  DEMO LOGIN
                </p>
              </div>
              <Button variant="outline" type="button" className="w-full" onClick={handleDemoLogin} disabled={isLoading}>
                 {isLoading ? <Loader2 className="animate-spin" /> : 'Continue as Guest'}
              </Button>
            </>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
