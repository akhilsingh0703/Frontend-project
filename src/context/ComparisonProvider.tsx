'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { University } from '@/lib/types';

const MAX_COMPARE_ITEMS = 3;

interface ComparisonContextType {
  comparisonList: string[];
  addToCompare: (universityId: string) => void;
  removeFromCompare: (universityId: string) => void;
  isInCompare: (universityId: string) => boolean;
  isCompareFull: boolean;
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const { toast } = useToast();

  const addToCompare = (universityId: string) => {
    setComparisonList((prevList) => {
      if (prevList.length >= MAX_COMPARE_ITEMS) {
        toast({
          title: 'Comparison List Full',
          description: `You can only compare up to ${MAX_COMPARE_ITEMS} universities at a time.`,
          variant: 'destructive',
        });
        return prevList;
      }
      if (!prevList.includes(universityId)) {
        return [...prevList, universityId];
      }
      return prevList;
    });
  };

  const removeFromCompare = (universityId: string) => {
    setComparisonList((prevList) =>
      prevList.filter((id) => id !== universityId)
    );
  };

  const isInCompare = (universityId: string) => {
    return comparisonList.includes(universityId);
  };
  
  const isCompareFull = useMemo(() => comparisonList.length >= MAX_COMPARE_ITEMS, [comparisonList]);

  const value = useMemo(
    () => ({
      comparisonList,
      addToCompare,
      removeFromCompare,
      isInCompare,
      isCompareFull
    }),
    [comparisonList]
  );

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
}
