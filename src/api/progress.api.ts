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

export interface CompleteLessonPayload {
  uid: string;
  lesson: LessonView;
  courseTitle: string;
  score?: number;
  maxScore?: number;
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
      score: payload.score ?? 0,
      maxScore: payload.maxScore ?? 0,
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

async function fbUpdateUserProgress(uid: string): Promise<void> {
  try {
    const [progressSnap, coursesSnap] = await Promise.all([
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

    await updateDoc(doc(db, 'users', uid), {
      'overallProgress.progressPercent': overallPercent,
      'overallProgress.updatedAt': serverTimestamp(),
      'dailyStats.activitiesCompleted': increment(1),
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
    fbUpdateUserProgress(payload.uid),
  ]);
}

export const completeLesson = fbCompleteLesson;
