import type { LessonView } from '@models/lessonModel';

// Firebase Imports
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';
import type { CourseProgressDocument } from '@models/courseProgressModel';
import { activityConverter } from '@models/activityModel';
import type { CourseDocument } from '@models/courseModel';
import type { UserStreak } from '@models/userModel';
import { userConverter } from '@models/userModel';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export interface CompleteLessonPayload {
  uid: string;
  lesson: LessonView;
  courseTitle: string;
  score: number;
  maxScore: number;
  minutesSpent: number;
}

// Mock Implementation

function mockCompleteLesson(payload: CompleteLessonPayload): Promise<void> {
  void payload;
  return Promise.resolve();
}

// Firebase Implementation

async function fbSaveActivityLog(
  payload: CompleteLessonPayload
): Promise<void> {
  try {
    const docRef = doc(collection(db, 'users', payload.uid, 'activityLog'));
    await setDoc(docRef.withConverter(activityConverter), {
      activityLogId: docRef.id,
      uid: payload.uid,
      courseId: payload.lesson.courseId,
      courseTitle: payload.courseTitle,
      lessonId: payload.lesson.lessonId,
      lessonTitle: payload.lesson.title,
      widgetType: payload.lesson.widgetType,
      score: payload.score,
      maxScore: payload.maxScore,
      status: 'completed',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throwFirebaseError(error);
  }
}

async function fbSaveCourseProgress(
  uid: string,
  lesson: LessonView
): Promise<boolean> {
  try {
    const progressRef = doc(
      db,
      'users',
      uid,
      'courseProgress',
      lesson.courseId
    );
    const courseRef = doc(db, 'courses', lesson.courseId);

    const [progressSnap, courseSnap] = await Promise.all([
      getDoc(progressRef),
      getDoc(courseRef),
    ]);

    const lessonCount = courseSnap.exists()
      ? (courseSnap.data() as CourseDocument).lessonIds.length
      : 0;

    const existingProgress = progressSnap.exists()
      ? (progressSnap.data() as CourseProgressDocument)
      : null;

    const completedLessonsIds: string[] =
      existingProgress?.completedLessonsIds ?? [];

    if (completedLessonsIds.includes(lesson.lessonId)) return false;

    const updatedIds = [...completedLessonsIds, lesson.lessonId];
    const progressPercent =
      lessonCount > 0 ? Math.round((updatedIds.length / lessonCount) * 100) : 0;

    await setDoc(progressRef, {
      courseId: lesson.courseId,
      completedLessonsIds: updatedIds,
      progressPercent,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    throwFirebaseError(error);
  }
}

function computeStreak(oldStreak: UserStreak): UserStreak {
  const today = new Date().toISOString().slice(0, 10);

  if (oldStreak.lastActiveDate === today) {
    return oldStreak;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  const newCurrent =
    oldStreak.lastActiveDate === yesterdayStr ? oldStreak.currentStreak + 1 : 1;
  const newLongest = Math.max(newCurrent, oldStreak.longestStreak);

  return {
    currentStreak: newCurrent,
    longestStreak: newLongest,
    lastActiveDate: today,
  };
}

async function fbUpdateUserProgress(
  uid: string,
  minutesSpent: number
): Promise<void> {
  try {
    const [userSnap, progressSnap, coursesSnap] = await Promise.all([
      getDoc(doc(db, 'users', uid).withConverter(userConverter)),
      getDocs(collection(db, 'users', uid, 'courseProgress')),
      getDocs(collection(db, 'courses')),
    ]);

    const totalLessons = coursesSnap.docs.reduce(
      (sum, d) => sum + (d.data() as CourseDocument).lessonIds.length,
      0
    );
    const totalCompleted = progressSnap.docs.reduce(
      (sum, d) =>
        sum + (d.data() as CourseProgressDocument).completedLessonsIds.length,
      0
    );

    const overallPercent =
      totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

    const userData = userSnap.exists() ? userSnap.data() : null;
    const oldStreak: UserStreak = userData?.streak ?? {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: '',
    };
    const streak = computeStreak(oldStreak);

    await updateDoc(doc(db, 'users', uid), {
      'overallProgress.progressPercent': overallPercent,
      'overallProgress.updatedAt': serverTimestamp(),
      'dailyStats.activitiesCompleted': increment(1),
      'dailyStats.minutesSpent': increment(minutesSpent),
      'streak.currentStreak': streak.currentStreak,
      'streak.longestStreak': streak.longestStreak,
      'streak.lastActiveDate': streak.lastActiveDate,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throwFirebaseError(error);
  }
}

export async function fbCompleteLesson(
  payload: CompleteLessonPayload
): Promise<void> {
  const isNew = await fbSaveCourseProgress(payload.uid, payload.lesson);
  if (!isNew) return;
  await Promise.all([
    fbSaveActivityLog(payload),
    fbUpdateUserProgress(payload.uid, payload.minutesSpent),
  ]);
}

export const completeLesson = USE_MOCK ? mockCompleteLesson : fbCompleteLesson;
