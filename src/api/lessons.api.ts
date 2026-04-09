import type { LessonView, LessonDocument } from '@models/lessonModel';
import { toLessonView } from '@models/lessonModel';

// Mock Imports
import { mockLessons } from '@mocks/lessons.mock';
import { mockCourseProgressList } from '@mocks/courseProgress.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import {
  collection,
  doc,
  type DocumentSnapshot,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';
import type { CourseProgressDocument } from '@models/courseProgressModel';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetLessonsByCourse(
  courseId: string,
  uid: string
): Promise<LessonView[]> {
  await delay(300);
  void uid;
  const lessons = mockLessons[courseId] ?? [];
  const progress = mockCourseProgressList.find((p) => p.courseId === courseId);
  const completedIds = new Set(progress?.completedLessonsIds ?? []);
  return lessons.map((l) => ({
    ...l,
    isCompleted: completedIds.has(l.lessonId),
  }));
}

async function mockGetLesson(
  courseId: string,
  lessonId: string
): Promise<LessonView> {
  await delay(300);
  const lesson = (mockLessons[courseId] ?? []).find(
    (lesson) => lesson.lessonId === lessonId
  );
  if (!lesson) throw new Error(`Lesson not found: ${lessonId}`);
  return lesson;
}

// Firebase Implementation

async function fbGetLessonsByCourse(
  courseId: string,
  uid: string
): Promise<LessonView[]> {
  try {
    const [lessonsSnap, progressSnap] = await Promise.all([
      getDocs(
        query(
          collection(db, 'courses', courseId, 'lessons'),
          orderBy('createdAt', 'asc')
        )
      ),
      getDoc(doc(db, 'users', uid, 'courseProgress', courseId)),
    ]);

    const completedIds = new Set<string>(
      progressSnap.exists()
        ? (progressSnap.data() as CourseProgressDocument).completedLessonsIds
        : []
    );

    return lessonsSnap.docs.map((d) => {
      const lessonDoc = d.data() as LessonDocument;
      return toLessonView(lessonDoc, completedIds.has(lessonDoc.lessonId));
    });
  } catch (error) {
    throwFirebaseError(error);
  }
}

async function fbGetLesson(
  courseId: string,
  lessonId: string
): Promise<LessonView> {
  let snap: DocumentSnapshot;
  try {
    snap = await getDoc(doc(db, 'courses', courseId, 'lessons', lessonId));
  } catch (error) {
    throwFirebaseError(error);
  }
  if (!snap.exists()) throw new Error(`Lesson not found: ${lessonId}`);
  return toLessonView(snap.data() as LessonDocument);
}

// Export Switch

export const getLessonsByCourse = USE_MOCK
  ? mockGetLessonsByCourse
  : fbGetLessonsByCourse;
export const getLesson = USE_MOCK ? mockGetLesson : fbGetLesson;
