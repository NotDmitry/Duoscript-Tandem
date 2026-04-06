import type { LessonView, LessonDocument } from '@models/lessonModel';
import { toLessonView } from '@models/lessonModel';

// Mock Imports
import { mockLessons } from '@mocks/lessons.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetLessonsByCourse(courseId: string): Promise<LessonView[]> {
  await delay(300);
  return mockLessons[courseId] ?? [];
}

// Firebase Implementation

async function fbGetLessonsByCourse(courseId: string): Promise<LessonView[]> {
  try {
    const snap = await getDocs(
      query(
        collection(db, 'courses', courseId, 'lessons'),
        orderBy('createdAt', 'asc')
      )
    );
    return snap.docs.map((d) => toLessonView(d.data() as LessonDocument));
  } catch (error) {
    throwFirebaseError(error);
  }
}

// Export Switch

export const getLessonsByCourse = USE_MOCK
  ? mockGetLessonsByCourse
  : fbGetLessonsByCourse;
