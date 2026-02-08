'use client';

import type { University, Course } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CoursesAndFeesProps {
  university: University;
}

export function CoursesAndFees({ university }: CoursesAndFeesProps) {
  const courseCategories = Array.from(
    new Set(university.courses.map((c) => c.category))
  );
  const [activeCategory, setActiveCategory] = useState(courseCategories[0] || '');

  const coursesByCategory = university.courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const activeCourses = coursesByCategory[activeCategory] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses &amp; Fees</CardTitle>
        <CardDescription>
          Based on 155 views last year. 15 students have shown interest in the
          last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Course</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="space-y-1">
                        {courseCategories.map((category) => {
                            const courseCount = coursesByCategory[category]?.length || 0;
                            return (
                                <li key={category}>
                                    <button
                                        onClick={() => setActiveCategory(category)}
                                        className={cn(
                                            'w-full text-left p-4 hover:bg-muted/50 transition-colors',
                                            activeCategory === category && 'bg-primary/10 text-accent font-semibold'
                                        )}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{category}</span>
                                            <Badge variant="secondary">{courseCount}</Badge>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
          </div>
          <div className="md:col-span-3">
            <div className="overflow-x-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/10">
                    <TableHead className="font-bold text-foreground">{activeCategory} Courses</TableHead>
                    <TableHead className="font-bold text-foreground">Fees</TableHead>
                    <TableHead className="font-bold text-foreground">Application Date</TableHead>
                    <TableHead className="font-bold text-foreground">Cutoff (Rank)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCourses.map((course) => (
                    <TableRow key={course.name}>
                      <TableCell>
                        <p className="font-semibold text-accent hover:underline cursor-pointer">
                          {course.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{course.rating}</span>
                            <span>({course.reviews} Reviews)</span>
                          </div>
                           <span>|</span>
                          <span>{course.views} Viewed</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-lg">
                          ₹{course.fees.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Total Fees
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{course.applicationDate}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-semibold">{course.cutoffRank}</p>
                        <p className="text-xs text-muted-foreground">{course.cutoffExam}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
