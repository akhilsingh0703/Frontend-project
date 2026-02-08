import { adminDb } from '../src/lib/firebase-admin';
import { universityData } from '../src/lib/universityData';

const uploadUniversities = async () => {
  const universitiesCollection = adminDb.collection('universities');
  console.log('Starting university data upload...');

  for (const university of universityData) {
    try {
      const docRef = await universitiesCollection.add(university);
      console.log(`Successfully uploaded: ${university.name} with id ${docRef.id}`);
    } catch (error) {
      console.error(`Error uploading ${university.name}:`, error);
    }
  }

  console.log('University data upload finished.');
  process.exit(0);
};

uploadUniversities();
