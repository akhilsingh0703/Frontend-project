import Link from 'next/link';
import {
  ArrowRight,
  Search,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UniversityCard } from '@/components/UniversityCard';
import { getUniversities } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
const PlaceHolderImages = require('@/lib/placeholder-images.json');

export default async function Home() {
  const universities = await getUniversities();
  const topColleges = universities.slice(0, 3);
  const heroImage = PlaceHolderImages.placeholderImages.find((img: any) => img.id === 'stanford-banner');
  
  const studyGoals = [
    {
      title: 'Engineering',
      courses: ['BE/B.Tech', 'Diploma in Engineering', 'ME/M.Tech'],
    },
    {
      title: 'Management',
      courses: ['MBA/PGDM', 'BBA/BMS', 'Executive MBA'],
    },
    {
      title: 'Commerce',
      courses: ['B.Com', 'M.Com'],
    },
    {
      title: 'Arts',
      courses: ['BA', 'MA', 'BFA', 'BSW'],
    }
  ];

  const getStreamCount = (stream: string) => {
    return universities.filter(uni => 
      uni.programs.some(program => program.department === stream)
    ).length;
  };

  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
        {heroImage && (
            <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold">
            Discover. Decide. Succeed — with UniFriend.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            UniFriend helps students become Engineers, Doctors, and Business Leaders — without financial barriers.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#search-section">Find Your University</Link>
          </Button>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="-mt-32 relative z-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold">Find your perfect university</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                        type="text"
                        placeholder="Search universities, courses, or exams..."
                        className="h-12 text-base pl-10"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                        <Select>
                            <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Course Type" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Stream" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="engineering">Engineering</SelectItem>
                                <SelectItem value="management">Management</SelectItem>
                                <SelectItem value="commerce">Commerce</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Fee Range" />
                            </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="low">Less than ₹1,00,000</SelectItem>
                                <SelectItem value="medium">₹1,00,000 - ₹3,00,000</SelectItem>
                                <SelectItem value="high">More than ₹3,00,000</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full h-12">
                            <Filter className="mr-2 h-5 w-5" />
                            Filter
                        </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Select Your Study Goal Section */}
      <section id="study-goal" className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Select Your Study Goal
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {studyGoals.map((goal) => (
              <Card key={goal.title} className="p-6 transition-shadow hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-xl font-bold">{goal.title}</h3>
                  <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-full">{getStreamCount(goal.title)}</span>
                </div>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  {goal.courses.map(course => (
                    <p key={course}>
                      <Link href={`/universities?course=${encodeURIComponent(course)}`} className="hover:text-accent hover:underline">
                        {course}
                      </Link>
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
           <div className="mt-12 text-center">
            <Button variant="outline">
              See More
            </Button>
          </div>
        </div>
      </section>

      {/* Top Colleges Section */}
      <section id="top-colleges" className="py-16 sm:py-24 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Top Colleges
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A curated list of the best colleges in India.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {topColleges.map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/universities">
                Browse All Universities <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="relative isolate overflow-hidden bg-accent/90 px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16">
            <h2 className="font-headline mx-auto max-w-2xl text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-accent-foreground/80">
              Begin your search today and take the first step towards your
              future. Our comparison tool is waiting to help you decide.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/compare">
                  Start Comparing Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
             <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx="512" cy="512" r="512" fill="url(#8d958450-c69f-4251-94bc-4e09d5c44437)" fillOpacity="0.7"></circle>
              <defs>
                <radialGradient id="8d958450-c69f-4251-94bc-4e09d5c44437">
                  <stop stopColor="#A7D1FF"></stop>
                  <stop offset="1" stopColor="#4B0082" stopOpacity="0"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
