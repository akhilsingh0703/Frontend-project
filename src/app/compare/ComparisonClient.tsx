'use client';

import { useState, useEffect } from 'react';
import { useComparison } from '@/hooks/use-comparison';
import { getUniversityById } from '@/lib/data';
import type { University } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  XCircle,
  MapPin,
  Building,
  Calendar,
  Users,
  Percent,
  BookOpen,
  GraduationCap,
  Scale,
  DollarSign,
  Landmark,
  Home,
  FileText,
  ClipboardCheck,
  Globe,
} from 'lucide-react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function ComparisonClient() {
  const { comparisonList, removeFromCompare } = useComparison();
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      const universityPromises = comparisonList.map((id) => getUniversityById(id));
      const resolvedUniversities = await Promise.all(universityPromises);
      setUniversities(resolvedUniversities.filter((uni): uni is University => uni !== undefined));
    };

    fetchUniversities();
  }, [comparisonList]);

  if (universities.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg">
        <Scale className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">
          Your comparison list is empty
        </h2>
        <p className="mt-2 text-muted-foreground">
          Add some universities to start comparing.
        </p>
        <Button asChild className="mt-6">
          <Link href="/universities">
            Browse Universities <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  const comparisonCategories = [
    {
      title: 'Location',
      icon: MapPin,
      render: (uni: University) => `${uni.location.city}, ${uni.location.country}`,
    },
    {
      title: 'University Type',
      icon: Building,
      render: (uni: University) => uni.type,
    },
    {
      title: 'Established',
      icon: Calendar,
      render: (uni: University) => uni.establishedYear,
    },
    {
      title: 'Student Population',
      icon: Users,
      render: (uni: University) => uni.studentPopulation.toLocaleString(),
    },
    {
      separator: 'Key Metrics'
    },
    {
      title: 'Acceptance Rate',
      icon: Percent,
      render: (uni: University) => `${uni.quickFacts.acceptanceRate}%`,
    },
    {
      title: 'Graduation Rate',
      icon: GraduationCap,
      render: (uni: University) => `${uni.quickFacts.graduationRate}%`,
    },
    {
      title: 'Student-Faculty Ratio',
      icon: Scale,
      render: (uni: University) => uni.quickFacts.studentFacultyRatio,
    },
    {
      separator: 'Academics'
    },
    {
      title: 'Popular Programs',
      icon: BookOpen,
      render: (uni: University) => (
        <div className="flex flex-wrap gap-1">
          {uni.popularPrograms.slice(0, 3).map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
        </div>
      ),
    },
    {
      separator: 'Finances'
    },
    {
      title: 'UG Tuition',
      icon: DollarSign,
      render: (uni: University) => `₹${uni.tuition.undergraduate.toLocaleString('en-IN')}`,
    },
    {
      title: 'Room & Board',
      icon: Home,
      render: (uni: University) => `₹${uni.tuition.roomAndBoard.toLocaleString('en-IN')}`,
    },
    {
      title: 'Scholarships',
      icon: Landmark,
      render: (uni: University) => uni.financialAid.scholarshipsAvailable ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-destructive" />,
    },
    {
      separator: 'Admissions'
    },
    {
      title: 'Application Fee',
      icon: FileText,
      render: (uni: University) => `₹${uni.admissions.applicationFee.toLocaleString('en-IN')}`,
    },
    {
      title: 'SAT Range',
      icon: ClipboardCheck,
      render: (uni: University) => uni.quickFacts.satRange || 'N/A',
    },
    {
      title: 'Website',
      icon: Globe,
      render: (uni: University) => <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">Visit Site</a>,
    },
  ];

  const handlePrint = () => window.print();

  return (
    <div>
      <div className="flex justify-end gap-2 mb-6">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-headline text-lg w-1/4">Feature</TableHead>
              {universities.map((uni) => (
                <TableHead key={uni.id} className="w-1/4">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={uni.images.logo}
                        alt={`${uni.name} logo`}
                        fill
                        className="object-contain"
                        data-ai-hint="logo crest"
                      />
                    </div>
                    <div>
                      <Link href={`/universities/${uni.id}`}>
                        <h3 className="font-headline font-bold text-base text-foreground hover:text-accent">
                          {uni.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground">{`${uni.location.city}, ${uni.location.country}`}</p>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 mt-1 text-destructive"
                        onClick={() => removeFromCompare(uni.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </TableHead>
              ))}
               {Array(3 - universities.length).fill(0).map((_, i) => (
                    <TableHead key={`placeholder-${i}`} className="w-1/4">
                         <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg p-4">
                            <div className="text-center text-muted-foreground">
                                <p>Add another university</p>
                                <Button asChild variant="link" size="sm" className="mt-1">
                                    <Link href="/universities">Browse</Link>
                                </Button>
                            </div>
                        </div>
                    </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonCategories.map((cat, index) => (
                cat.separator ? (
                     <TableRow key={`sep-${index}`} className="bg-primary/5 hover:bg-primary/5">
                        <TableCell colSpan={4} className="py-2">
                             <div className="flex items-center">
                                <Separator className="flex-grow"/>
                                <h4 className="mx-4 font-headline text-sm font-semibold text-accent">{cat.separator}</h4>
                                <Separator className="flex-grow"/>
                            </div>
                        </TableCell>
                    </TableRow>
                ) :
              <TableRow key={cat.title}>
                <TableCell className="font-semibold">
                  <div className="flex items-center">
                    {cat.icon && <cat.icon className="mr-3 h-5 w-5 text-muted-foreground" />}
                    <span>{cat.title}</span>
                  </div>
                </TableCell>
                {universities.map((uni) => (
                  <TableCell key={`${cat.title}-${uni.id}`} className="align-top">
                    {cat.render(uni)}
                  </TableCell>
                ))}
                {Array(3 - universities.length).fill(0).map((_, i) => (
                    <TableCell key={`placeholder-cell-${i}`}></TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
