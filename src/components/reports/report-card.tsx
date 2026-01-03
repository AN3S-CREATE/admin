'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

type ReportCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function ReportCard({ title, description, href, icon: Icon }: ReportCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="glass-card h-full transition-all hover:border-primary/50 hover:shadow-primary/10">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <div className="flex justify-end p-4 pt-0">
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Card>
    </Link>
  );
}
