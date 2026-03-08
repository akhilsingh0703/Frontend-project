import { getUniversityById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  DollarSign,
  Globe,
  MapPin,
  Building,
  Users,
  Percent,
  GraduationCap,
  Scale,
  Calendar,
  BookOpen,
  Home,
  FileText,
  Landmark,
  ClipboardCheck,
  Star,
  Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddToCompareButton } from '@/components/AddToCompareButton';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Summary } from './Summary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoursesAndFees } from './CoursesAndFees';

export default async function UniversityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const university = await getUniversityById(params.id);

  if (!university) {
    notFound();
  }

  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');

  const quickFacts = [
    { label: 'Acceptance Rate', value: `${university.quickFacts.acceptanceRate}%`, icon: Percent },
    { label: 'GPA', value: university.quickFacts.gpa || 'N/A', icon: GraduationCap },
    { label: 'SAT Range', value: university.quickFacts.satRange || 'N/A', icon: ClipboardCheck },
    { label: 'Student-Faculty Ratio', value: university.quickFacts.studentFacultyRatio, icon: Scale },
    { label: 'Graduation Rate', value: `${university.quickFacts.graduationRate}%`, icon: GraduationCap },
    { label: 'Student Population', value: university.studentPopulation.toLocaleString(), icon: Users },
  ];

  const admissionInfo = [
    { label: 'Application Deadline', value: university.admissions.deadline },
    { label: 'Application Fee', value: `₹${university.admissions.applicationFee.toLocaleString('en-IN')}` },
    { label: 'Required Documents', value: university.admissions.requiredDocuments.join(', ') },
    { label: 'International Students', value: university.admissions.internationalRequirements },
  ];

  const navItems = [
    'Info', 'Courses & Fees', 'Admission 2026', 'Reviews', 'CutOff', 'Placement',
    'Ranking', 'Gallery', 'Scholarship', 'Faculty', 'News & Articles', 'Hostel', 'Profile'
  ];

  return (
    <div className="bg-background">
      {/* Header Section */}
      <header className="bg-[#3A4A58] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden border-4 border-background bg-background shadow-lg shrink-0">
              <Image
                src={university.images?.logo || 'https://via.placeholder.com/150'}
                alt={`${university.name} logo`}
                fill
                className="object-contain p-2"
                data-ai-hint="logo crest"
              />
            </div>
            <div className="flex-grow">
              <h1 className="font-headline text-2xl md:text-4xl font-bold">
                {university.name} Courses &amp; Fees
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-300 mt-2 gap-x-4 gap-y-1">
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" /> {university.location.city}, {university.location.state}</span>
                <span className="flex items-center"><Building className="h-4 w-4 mr-1.5" /> {university.type} University</span>
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" /> Estd {university.establishedYear}</span>
                <span className="flex items-center"><Award className="h-4 w-4 mr-1.5" /> NAAC Grade A</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 shrink-0 self-start md:self-center">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">3.9</span>
                <div className="flex flex-col">
                  <div className="flex text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-300">(21 Reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-gray-800">Will You Get In</Button>
                <Button variant="secondary" className="bg-white text-gray-800 hover:bg-gray-200">Get Contact Details</Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Subnav and Content */}
      <Tabs defaultValue="courses" className="sticky top-0 bg-background z-10 shadow-sm">
        <div className="border-b">
          <div className="container mx-auto">
            <TabsList className="bg-transparent p-0 h-14 -mb-px rounded-none">
              {navItems.map(item => (
                <TabsTrigger
                  key={item}
                  value={item.toLowerCase().split(' ')[0]}
                  className="pb-3 rounded-none border-b-2 border-transparent text-muted-foreground data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:shadow-none"
                >
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <main className="container mx-auto px-4 py-12">
          <TabsContent value="info">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">

                {/* Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center"><BookOpen className="mr-3 text-accent" />Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                      <Badge variant="outline" className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Est. {university.establishedYear}</Badge>
                      <Badge variant="outline" className="flex items-center gap-2"><Building className="h-4 w-4" /> {university.type}</Badge>
                      <Badge variant="outline" className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {university.setting}</Badge>
                    </div>
                    <Summary description={university.description} />
                  </CardContent>
                </Card>

                {/* Programs & Majors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center"><GraduationCap className="mr-3 text-accent" />Programs & Majors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {university.programs.map((program) => (
                        <div key={program.name} className="p-4 border rounded-lg bg-background">
                          <h4 className="font-semibold">{program.name}</h4>
                          <p className="text-sm text-muted-foreground">{program.department}</p>
                          <p className="text-xs text-muted-foreground mt-2">{program.duration}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tuition & Aid */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center"><DollarSign className="mr-3 text-accent" />Tuition & Financial Aid</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Undergraduate</p>
                      <p className="text-2xl font-bold font-headline">₹{university.fees?.tuitionFee?.toLocaleString('en-IN') || 'N/A'}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Graduate</p>
                      <p className="text-2xl font-bold font-headline">N/A</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Room & Board</p>
                      <p className="text-2xl font-bold font-headline">N/A</p>
                    </div>
                    <div className="md:col-span-3">
                      <h4 className="font-semibold flex items-center justify-center"><Landmark className="mr-2" />Financial Aid</h4>
                      <p className="text-muted-foreground mt-2 text-sm">{university.financialAid.details}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Campus Life */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center"><Home className="mr-3 text-accent" />Campus Life</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {university.images.campus.map((imgSrc, i) => (
                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                          <Image src={imgSrc} alt={`Campus life ${i + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Admissions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center"><FileText className="mr-3 text-accent" />Admission Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {admissionInfo.map(info => (
                        <li key={info.label} className="flex flex-col sm:flex-row">
                          <strong className="w-full sm:w-1/3 shrink-0">{info.label}</strong>
                          <span className="text-muted-foreground">{info.value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {quickFacts.map((fact) => (
                        <li key={fact.label} className="flex items-start">
                          <fact.icon className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
                          <div>
                            <span className="font-semibold">{fact.value}</span>
                            <p className="text-sm text-muted-foreground">{fact.label}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">Campus Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{university.map.address}</p>
                    {mapImage && (
                      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <a href={`https://www.google.com/maps?q=${university.map.lat},${university.map.lng}`} target="_blank" rel="noopener noreferrer">
                          <Image
                            src={mapImage.imageUrl}
                            alt="Campus map"
                            width={1200}
                            height={400}
                            className="object-cover"
                            data-ai-hint={mapImage.imageHint}
                          />
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <div className="mt-4 md:mt-0 w-full md:w-auto">
                  <AddToCompareButton universityId={university.id} />
                </div>
              </aside>
            </div>
          </TabsContent>
          <TabsContent value="courses">
            <CoursesAndFees university={university} />
          </TabsContent>
          {/* Add other TabsContent components here */}
        </main>
      </Tabs>
    </div>
  );
}
