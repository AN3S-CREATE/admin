import { cn } from "@/lib/utils";
import React from 'react';
import Image from 'next/image';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row items-start md:items-center justify-between gap-4", className)}>
      <div className="relative grid gap-1">
        <div className="absolute -left-4 -top-2 h-16 w-16 opacity-10 blur-sm">
             <Image
              src="/veralogix-logo.png"
              width={64}
              height={64}
              alt="Veralogix Logo Watermark"
              className="rounded-full"
            />
        </div>
        <h1 className="font-headline text-3xl md:text-4xl tracking-tight relative">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground relative">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
