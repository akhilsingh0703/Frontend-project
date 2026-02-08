
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  University,
  Scale,
  Sparkles,
  FileText,
  User,
  Settings,
  Menu,
  Search,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useComparison } from '@/hooks/use-comparison';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Footer } from './Footer';


const navLinks = [
  { href: '/', label: 'Home', icon: University },
  { href: '/universities', label: 'Universities', icon: University },
  { href: '/compare', label: 'Compare', icon: Scale },
  { href: '/about', label: 'Contact', icon: FileText },
];

function NavLink({ href, icon: Icon, label, badge, count }: {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
  count?: number;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        isActive && 'font-bold text-foreground'
      )}
    >
      {label}
    </Link>
  );
}


function SidebarNav() {
    return (
        <nav className="grid items-start gap-2 text-sm font-medium">
            {navLinks.map(link => (
                <NavLink key={link.href} {...link} />
            ))}
        </nav>
    );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { comparisonList } = useComparison();
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-accent px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-6 w-6 text-accent-foreground" />
          <span className="text-lg font-headline text-accent-foreground">UniFriend</span>
        </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ml-auto">
            {navLinks.map(link => (
                <Link 
                    key={link.href} 
                    href={link.href}
                    className={cn(
                        "transition-colors",
                        pathname === link.href ? "text-accent-foreground font-semibold" : "text-accent-foreground/80 hover:text-accent-foreground"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
         <div className="hidden md:flex items-center gap-2 ml-4">
            <Button asChild variant="ghost" className="text-accent-foreground hover:bg-white/10 hover:text-accent-foreground">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-accent-foreground text-accent">
              <Link href="/register">Register</Link>
            </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden ml-auto bg-accent text-accent-foreground"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 -mx-4 mb-4">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                  <GraduationCap className="h-6 w-6 text-accent" />
                  <span className="text-accent">UniFriend</span>
                  </Link>
              </div>
              <nav className="grid gap-2 text-base font-medium">
                {navLinks.map(link => (
                    <Link 
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === link.href && 'text-primary'
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
              </nav>
               <div className="flex flex-col gap-2 mt-auto">
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
