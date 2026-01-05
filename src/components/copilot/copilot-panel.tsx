'use client';

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Mic, Paperclip, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { opsCopilot } from '@/ai/flows/ops-copilot-flow';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: "Welcome to the Ops Copilot. I'm a conversational AI assistant. Right now, I'm not connected to your live operational data, but you can ask me general questions or for help with analysis. How can I assist you today?",
  },
];

export function CopilotPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom.
        // The underlying Radix component doesn't expose a direct API.
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await opsCopilot({ message: input });
      const assistantMessage: Message = { role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling copilot flow:', error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-6 text-sm p-4">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${message.role === 'assistant' ? 'bg-primary/10' : 'bg-muted'}`}>
                {message.role === 'assistant' ? <Bot className="h-5 w-5 text-primary" /> : <User className="h-5 w-5 text-foreground" />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-semibold">{message.role === 'assistant' ? 'Ops Copilot' : 'You'}</p>
                <div className={`p-3 rounded-lg ${message.role === 'assistant' ? 'bg-muted' : ''}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
               <div className="p-2 rounded-full bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                    <p className="font-semibold">Ops Copilot</p>
                    <div className="p-3 flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <p className="text-muted-foreground">Thinking...</p>
                    </div>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-primary/10">
        <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Ask the Ops Copilot..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }}
            disabled={isLoading}
          />
          <div className="flex items-center p-3 pt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading}>
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading}>
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={isLoading}>
              Send
              <CornerDownLeft className="h-3.5 w-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
