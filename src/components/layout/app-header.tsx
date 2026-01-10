'use client';

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
import { Fragment, useState } from 'react';
import { useAuth } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { Sheet, SheetContent } from '../ui/sheet';
import { CopilotPanel } from '../copilot/copilot-panel';
import { translateNaturalLanguageToQuery } from '@/ai/flows/natural-language-to-query';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();
  const { user } = useUser();
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
    router.replace('/login');
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const result = await translateNaturalLanguageToQuery({
        naturalLanguageQuery: searchQuery,
      });
      toast({
        title: "AI Query Generated",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(result, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("Error translating query:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not translate natural language query.",
      });
    }
  };

  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-primary/10 bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <SidebarTrigger className="md:hidden" />

        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-headline text-foreground">Veralogix</span>
          {pathSegments.map((segment, index) => (
            <Fragment key={segment}>
              <ChevronRight className="h-4 w-4" />
              <span
                className={
                  index === pathSegments.length - 1
                    ? 'text-foreground capitalize'
                    : 'capitalize'
                }
              >
                {segment}
              </span>
            </Fragment>
          ))}
        </div>

        <div className="flex-1">
          <form
            className="relative ml-auto flex-1 md:grow-0"
            onSubmit={handleSearchSubmit}
          >
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Ask for a report: 'downtime last 7 days'..."
              className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px] font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setIsCopilotOpen(true)}
        >
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
                <AvatarImage
                  src={userAvatar?.imageUrl}
                  alt={userAvatar?.description}
                  data-ai-hint={userAvatar?.imageHint}
                />
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase() ?? 'G'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {user?.displayName ?? user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Sheet open={isCopilotOpen} onOpenChange={setIsCopilotOpen}>
        <SheetContent className="w-full max-w-lg p-0">
          <CopilotPanel />
        </SheetContent>
      </Sheet>
    </>
  );
}
