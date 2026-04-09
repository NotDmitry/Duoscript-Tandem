import type {
  CourseView,
  CourseDocument,
  CourseWithProgressView,
} from '@models/courseModel';
import { toCourseView, toCourseWithProgressView } from '@models/courseModel';
import type {
  CourseProgressDocument,
  CourseProgressView,
} from '@models/courseProgressModel';
import { toCourseProgressView } from '@models/courseProgressModel';

// Mock Imports
import { mockCourses } from '@mocks/courses.mock';
import { mockCourseProgressList } from '@mocks/courseProgress.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetCourses(): Promise<CourseView[]> {
  await delay(300);
  return mockCourses;
}

async function mockGetCourseProgressList(): Promise<CourseProgressView[]> {
  await delay(300);
  return mockCourseProgressList;
}

async function mockGetCoursesWithProgress(
  uid: string
): Promise<CourseWithProgressView[]> {
  await delay(300);
  void uid;
  const courseProgressMap = new Map(
    mockCourseProgressList.map((courseProgress) => [
      courseProgress.courseId,
      courseProgress,
    ])
  );
  return mockCourses.map((course) => {
    const courseProgress = courseProgressMap.get(course.courseId);
    return toCourseWithProgressView(
      course,
      courseProgress?.progressPercent ?? 0,
      courseProgress?.completedLessonsIds.length ?? 0
    );
  });
}

async function mockGetCourse(courseId: string): Promise<CourseView | null> {
  await delay(300);
  return mockCourses.find((c) => c.courseId === courseId) ?? null;
}

// Firebase Implementation

async function fbGetCourse(courseId: string): Promise<CourseView | null> {
  try {
    const snap = await getDoc(doc(db, 'courses', courseId));
    if (!snap.exists()) return null;
    return toCourseView(snap.data() as CourseDocument);
  } catch (error) {
    throwFirebaseError(error);
  }
}

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

async function fbGetCourseProgressList(
  uid: string
): Promise<CourseProgressView[]> {
  try {
    const snap = await getDocs(
      query(
        collection(db, 'users', uid, 'courseProgress'),
        orderBy('updatedAt', 'desc')
      )
    );
    return snap.docs.map((d) =>
      toCourseProgressView(d.data() as CourseProgressDocument)
    );
  } catch (error) {
    throwFirebaseError(error);
  }
}

async function fbGetCoursesWithProgress(
  uid: string
): Promise<CourseWithProgressView[]> {
  try {
    const [courses, courseProgressList] = await Promise.all([
      fbGetCourses(),
      fbGetCourseProgressList(uid),
    ]);

    const courseProgressMap = new Map(
      courseProgressList.map((courseProgress) => [
        courseProgress.courseId,
        courseProgress,
      ])
    );

    return courses.map((course) => {
      const courseProgress = courseProgressMap.get(course.courseId);
      return toCourseWithProgressView(
        course,
        courseProgress?.progressPercent ?? 0,
        courseProgress?.completedLessonsIds.length ?? 0
      );
    });
  } catch (error) {
    throwFirebaseError(error);
  }
}

// Export Switch

export const getCourses = USE_MOCK ? mockGetCourses : fbGetCourses;
export const getCourse = USE_MOCK ? mockGetCourse : fbGetCourse;
export const getCoursesWithProgress = USE_MOCK
  ? mockGetCoursesWithProgress
  : fbGetCoursesWithProgress;
export const getCourseProgressList = USE_MOCK
  ? mockGetCourseProgressList
  : fbGetCourseProgressList;
