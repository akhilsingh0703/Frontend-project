'use client';

import { useEffect, useState } from 'react';
import { summarizeUniversityDetails } from '@/ai/flows/summarize-university-details';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

interface SummaryProps {
  description: string;
}

export function Summary({ description }: SummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        setError(null);
        const result = await summarizeUniversityDetails({
          universityDetails: description,
        });
        setSummary(result.summary);
      } catch (e) {
        console.error('Failed to generate summary:', e);
        setError('Could not generate AI summary. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [description]);

  if (loading) {
    return (
      <div className="space-y-2 prose prose-lg max-w-none text-foreground/90">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (error) {
     return (
       <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
     )
  }

  return (
    <div className="prose prose-lg max-w-none text-foreground/90">
        <p>{summary || description}</p>
    </div>
  );
}
