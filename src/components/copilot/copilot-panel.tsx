'use client';

import { CornerDownLeft, Mic, Paperclip, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '../ui/scroll-area';

export function CopilotPanel() {
  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-4 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <SheetTitle className="font-headline text-2xl">Ops Copilot</SheetTitle>
        </div>
        <SheetDescription>
          Your AI assistant for mining operations. Ask questions, get insights.
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 text-sm">
            {/* Placeholder for chat messages */}
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                    <p className="font-semibold">Ops Copilot</p>
                    <div className="p-3 rounded-lg bg-muted">
                        <p>Welcome to the Ops Copilot. How can I help you today? You can ask things like, "What changed since the last shift?" or "Show me all high-priority incidents this week."</p>
                    </div>
                </div>
            </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-primary/10">
        <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Ask the Ops Copilot..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send
              <CornerDownLeft className="h-3.5 w-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
