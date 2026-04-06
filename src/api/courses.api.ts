import type { CourseView, CourseDocument } from '@models/courseModel';
import { toCourseView } from '@models/courseModel';

// Mock Imports
import { mockCourses } from '@mocks/courses.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetCourses(): Promise<CourseView[]> {
  await delay(300);
  return mockCourses;
}

// Firebase Implementation

async function fbGetCourses(): Promise<CourseView[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'courses'), orderBy('createdAt', 'asc'))
    );
    return snap.docs.map((d) => toCourseView(d.data() as CourseDocument));
  } catch (error) {
    throwFirebaseError(error);
  }
}

// Export Switch

export const getCourses = USE_MOCK ? mockGetCourses : fbGetCourses;
