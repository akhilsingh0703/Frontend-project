import Link from 'next/link';
import { GraduationCap, Twitter, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { href: '/universities', label: 'Universities' },
    { href: '/compare', label: 'Compare' },
    { href: '/about', label: 'Contact Us' },
    { href: '#', label: 'Career' },
  ];

  const forStudentsLinks = [
    { href: '#', label: 'Login' },
    { href: '#', label: 'Register' },
    { href: '#', label: 'Dashboard' },
  ];

  return (
    <footer className="bg-muted/40 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* UniFriend Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <GraduationCap className="h-7 w-7 text-accent" />
              <span className="text-xl font-headline">UniFriend</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Connecting students and universities for a brighter future.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="font-headline text-lg font-semibold">For Students</h3>
            <ul className="mt-4 space-y-2">
              {forStudentsLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} UniFriend. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
