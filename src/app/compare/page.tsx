import { ComparisonClient } from './ComparisonClient';

export default function ComparePage() {
  return (
    <>
      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-2">
                Compare Universities
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground mb-8">
                Select up to 3 universities to compare their features side-by-side.
            </p>
            <ComparisonClient />
        </div>
      </main>
    </>
  );
}
