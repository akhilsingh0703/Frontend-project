import Image from 'next/image';
import Link from 'next/link';
import type { University } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  // Format fee without rupee symbol
  const formatFee = (fee: number | undefined) => {
    if (!fee) return 'N/A';
    return fee.toLocaleString('en-IN');
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/universities/${university.id}`}>
          <div className="relative h-48 w-full">
            <Image
              src={university.images?.banner || 'https://via.placeholder.com/800x400'}
              alt={`${university.name} banner`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden border-2 border-background bg-background shadow-md">
                <Image
                  src={university.images?.logo || 'https://via.placeholder.com/150'}
                  alt={`${university.name} logo`}
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-6 flex-grow">
        <Link href={`/universities/${university.id}`}>
          <CardTitle className="font-headline text-xl hover:text-accent transition-colors mb-2">
            {university.name}
          </CardTitle>
        </Link>

        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {university.location.city}, {university.location.state}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{university.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Approval:</span>
            <span className="font-medium">{university.approval}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fees:</span>
            <span className="font-medium">
              {formatFee(university.fees?.tuitionFee)} per year
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t">
        <Link href={`/universities/${university.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
