"use client";

import { Bell, MessageSquare, Search, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment } from 'react';

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    router.replace('/login');
  };

  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-primary/10 bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />

      <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-headline text-foreground">Veralogix</span>
        {pathSegments.map((segment, index) => (
          <Fragment key={segment}>
            <ChevronRight className="h-4 w-4" />
            <span className={index === pathSegments.length - 1 ? 'text-foreground capitalize' : 'capitalize'}>
              {segment}
            </span>
          </Fragment>
        ))}
      </div>

      <div className="flex-1">
        <form className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Natural Language to Insights..."
            className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px] font-sans"
          />
        </form>
      </div>

      <Button variant="ghost" size="icon" className="rounded-full">
        <MessageSquare className="h-5 w-5" />
        <span className="sr-only">AI Copilot</span>
      </Button>
      
      <Button variant="ghost" size="icon" className="relative rounded-full">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-badge rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="sr-only">Notifications</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/seed/10/40/40" alt="User Avatar" data-ai-hint="person face" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
