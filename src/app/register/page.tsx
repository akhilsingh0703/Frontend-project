
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-muted/20 py-12 px-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <GraduationCap className="mx-auto h-10 w-10 text-accent" />
          <CardTitle className="mt-4 text-3xl font-headline">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Join UniFriend and take the first step towards your dream university.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
           <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-accent">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
