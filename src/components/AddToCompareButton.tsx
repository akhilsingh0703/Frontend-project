'use client';

import { useComparison } from '@/hooks/use-comparison';
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface AddToCompareButtonProps {
  universityId: string;
}

export function AddToCompareButton({ universityId }: AddToCompareButtonProps) {
  const { isInCompare, addToCompare, removeFromCompare, isCompareFull } = useComparison();
  const isAdded = isInCompare(universityId);

  const handleToggle = () => {
    if (isAdded) {
      removeFromCompare(universityId);
    } else {
      addToCompare(universityId);
    }
  };

  const isDisabled = !isAdded && isCompareFull;

  return (
    <Button
      variant={isAdded ? 'secondary' : 'default'}
      onClick={handleToggle}
      disabled={isDisabled}
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-70"
    >
      {isAdded ? (
        <>
          <MinusCircle className="mr-2 h-4 w-4" />
          Remove
        </>
      ) : (
        <>
          <PlusCircle className="mr-2 h-4 w-4" />
          Compare
        </>
      )}
    </Button>
  );
}
