"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Truck, Factory, ClipboardList, ShieldAlert, Users, FileText, MapPin, Plug, Settings, Bell } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';


const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/transport', icon: Truck, label: 'Transport' },
  { href: '/dashboard/plant', icon: Factory, label: 'Plant' },
  { href: '/dashboard/operations', icon: ClipboardList, label: 'Operations' },
  { href: '/dashboard/risk', icon: ShieldAlert, label: 'Risk' },
  { href: '/dashboard/people', icon: Users, label: 'People' },
  { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
  { href: '/dashboard/tracking', icon: MapPin, label: 'Tracking' },
  { href: '/dashboard/alerts', icon: Bell, label: 'Alerts' },
  { href: '/dashboard/integrations', icon: Plug, label: 'Integrations' },
];

const bottomNavItems = [
  { href: '/dashboard/admin', icon: Settings, label: 'Admin' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-primary/10 bg-card/60">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center justify-center gap-2">
           <Image
              src="/veralogix-logo.png"
              width={160}
              height={35}
              alt="Veralogix Logo"
              className={cn(
                "group-data-[collapsible=icon]:hidden"
              )}
            />
             <Image
              src="/veralogix-logo.png"
              width={32}
              height={32}
              alt="Veralogix Logo Icon"
              className={cn(
                "hidden group-data-[collapsible=icon]:block rounded-full"
              )}
            />
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
