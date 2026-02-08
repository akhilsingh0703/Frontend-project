import { getUniversities } from '@/lib/data';
import { UniversityList } from './UniversityList';
import Image from 'next/image';
const PlaceHolderImages = require('@/lib/placeholder-images.json');

export default async function UniversitiesPage() {
  const universities = await getUniversities();
  const heroImage = PlaceHolderImages.placeholderImages.find((img: any) => img.id === 'ucl-banner');

  return (
    <>
      <section className="relative h-60 flex items-center justify-center text-center text-white">
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
            <h1 className="font-headline text-4xl sm:text-5xl font-bold">
                Explore Universities
            </h1>
            <p className="mt-2 text-lg text-white/90">
                Find the perfect place to shape your future.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <UniversityList allUniversities={universities} />
      </div>
    </>
  );
}
