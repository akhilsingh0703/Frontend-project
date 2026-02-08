// In UniversityList.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { University } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { UniversityCard } from '@/components/UniversityCard';
import { cn } from '@/lib/utils';

export function UniversityList({ allUniversities }: { allUniversities: University[] }) {
  const searchParams = useSearchParams();
  const courseQuery = searchParams.get('course');

  const [filters, setFilters] = useState({
    state: 'all',
    courseType: 'all',
    stream: 'all',
    feeRange: 'all',
    course: courseQuery || 'all',
  });

  useEffect(() => {
    if (courseQuery) {
      setFilters(prev => ({ ...prev, course: courseQuery }));
    }
  }, [courseQuery]);

  const filteredUniversities = useMemo(() => {
    return allUniversities.filter(uni => {
      const stateMatch = filters.state === 'all' || uni.location.state === filters.state;
      const typeMatch = filters.courseType === 'all' || uni.type === filters.courseType;
      const streamMatch = filters.stream === 'all' ||
        (uni.courses?.some(course => course.stream === filters.stream) ?? false);
      const courseMatch = filters.course === 'all' ||
        (uni.courses?.some(course => course.id === filters.course) ?? false);

      return stateMatch && typeMatch && streamMatch && courseMatch;
    });
  }, [allUniversities, filters]);

  // Extract unique filter options
  const states = useMemo(() =>
    [...new Set(allUniversities.map(uni => uni.location.state))],
    [allUniversities]
  );

  const courseTypes = useMemo(() =>
    [...new Set(allUniversities.map(uni => uni.type))],
    [allUniversities]
  );

  const streams = useMemo(() =>
    [...new Set(allUniversities.flatMap(uni =>
      uni.courses?.map(course => course.stream) || []
    ))],
    [allUniversities]
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-background/95 p-4 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            value={filters.state}
            onValueChange={value => setFilters({...filters, state: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map(state => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.courseType}
            onValueChange={value => setFilters({...filters, courseType: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Course Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {courseTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.stream}
            onValueChange={value => setFilters({...filters, stream: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              {streams.map(stream => (
                <SelectItem key={stream} value={stream}>
                  {stream}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setFilters({
              state: 'all',
              courseType: 'all',
              stream: 'all',
              feeRange: 'all',
              course: courseQuery || 'all',
            })}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>

      {/* University Cards Grid */}
      {filteredUniversities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map(university => (
            <UniversityCard
              key={university.id}
              university={university}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No universities found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
}
