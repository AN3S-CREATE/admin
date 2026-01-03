'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="min-h-screen flex flex-col">
          <AppHeader />
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
