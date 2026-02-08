'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  uniqueCountries: string[];
}

export function FilterSidebar({
  filters,
  setFilters,
  uniqueCountries,
}: FilterSidebarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleCountryChange = (value: string) => {
    setFilters({ ...filters, country: value });
  };

  const handleTuitionChange = (value: number[]) => {
    setFilters({ ...filters, tuition: value[0] });
  };

  const handleTypeChange = (type: 'Public' | 'Private') => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter((t: string) => t !== type)
      : [...filters.type, type];
    setFilters({ ...filters, type: newTypes });
  };
  
  const handleAcceptanceRateChange = (value: number[]) => {
    setFilters({ ...filters, acceptanceRate: value[0] });
  };

  return (
    <div className="space-y-6 sticky top-24">
      <h3 className="font-headline text-xl font-semibold">Filters</h3>
      
      <div className="space-y-2">
        <Label htmlFor="search-name">Search by name</Label>
        <div className="relative">
          <Input
            id="search-name"
            placeholder="e.g., Stanford"
            value={filters.name}
            onChange={handleInputChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="country">Country/Region</Label>
        <Select value={filters.country} onValueChange={handleCountryChange}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {uniqueCountries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>University Type</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-public"
              checked={filters.type.includes('Public')}
              onCheckedChange={() => handleTypeChange('Public')}
            />
            <Label htmlFor="type-public" className="font-normal">Public</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-private"
              checked={filters.type.includes('Private')}
              onCheckedChange={() => handleTypeChange('Private')}
            />
            <Label htmlFor="type-private" className="font-normal">Private</Label>
          </div>
        </div>
      </div>
      
      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between items-center">
            <Label>Max. Tuition (UG)</Label>
            <span className="text-sm font-medium text-accent">₹{filters.tuition.toLocaleString('en-IN')}</span>
        </div>
        <Slider
          defaultValue={[100000]}
          max={100000}
          step={1000}
          onValueChange={handleTuitionChange}
        />
      </div>

      <Separator />
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
            <Label>Max. Acceptance Rate</Label>
            <span className="text-sm font-medium text-accent">{filters.acceptanceRate}%</span>
        </div>
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          onValueChange={handleAcceptanceRateChange}
        />
      </div>
    </div>
  );
}
