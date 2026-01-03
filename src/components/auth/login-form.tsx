"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { HardHat } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@veramine.com');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials
    sessionStorage.setItem('isLoggedIn', 'true');
    router.replace('/dashboard');
  };

  const handleDemoLogin = () => {
    setEmail('demo@veramine.com');
    setPassword('password');
  }

  return (
    <Card className="w-full max-w-md glass-card">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <HardHat className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-3xl">Veralogix Smart Hub</CardTitle>
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
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full font-bold">Sign In</Button>
          <div className="relative w-full">
            <Separator className="absolute left-0 top-1/2 -translate-y-1/2" />
            <p className="text-center text-xs text-muted-foreground bg-card px-2 relative">
              DEMO LOGIN
            </p>
          </div>
          <Button variant="outline" type="button" className="w-full" onClick={handleDemoLogin}>
            Use Demo Credentials
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
