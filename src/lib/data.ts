// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
// import { db } from './firebase'; 
import type { University } from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to transform API data to University type
const transformUniversity = (u: any): University => {
  return {
    ...u,
    programs: u.programs || (u.courses ? u.courses.map((c: any) => ({
      name: c.name,
      department: c.category || 'General',
      duration: 'N/A'
    })) : []),
  };
};

// Get all universities from Local Test Server
export const getUniversities = async (): Promise<University[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/universities`);
    if (!response.ok) {
      throw new Error(`Failed to fetch universities: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(transformUniversity);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return [];
  }
};

// Get a single university by its ID from Local Test Server
// Note: The test server returns ALL universities in one list, so we'll filter client-side 
// or simpler, fetch all and find one. Improvements can be made to the test server later.
export const getUniversityById = async (id: string): Promise<University | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/universities`);
    if (!response.ok) {
      throw new Error(`Failed to fetch universities: ${response.statusText}`);
    }
    const data = await response.json();
    const universities = data.map(transformUniversity);
    return universities.find((u: University) => u.id === id);
  } catch (error) {
    console.error(`Error fetching university ${id}:`, error);
    return undefined;
  }
};
