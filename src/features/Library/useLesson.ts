import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getLesson } from '@api/lessons.api';
import { getCourse } from '@api/courses.api';
import type { LessonView } from '@models/lessonModel';

interface LocationState {
  lesson?: LessonView;
  courseTitle?: string;
}

export function useLesson(courseId: string, lessonId: string) {
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? null;
  const locationLesson = state?.lesson ?? null;
  const locationCourseTitle = state?.courseTitle ?? null;

  const [lesson, setLesson] = useState<LessonView | null>(locationLesson);
  const [courseTitle, setCourseTitle] = useState<string>(
    locationCourseTitle ?? ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (locationLesson && locationCourseTitle) return;

    async function fetchLesson() {
      setIsLoading(true);
      setError(null);
      try {
        const [lessonData, courseData] = await Promise.all([
          locationLesson
            ? Promise.resolve(locationLesson)
            : getLesson(courseId, lessonId),
          locationCourseTitle ? Promise.resolve(null) : getCourse(courseId),
        ]);
        setLesson(lessonData);
        if (courseData) setCourseTitle(courseData.title);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lesson');
      } finally {
        setIsLoading(false);
      }
    }
    void fetchLesson();
  }, [courseId, lessonId, locationLesson, locationCourseTitle]);

  return { lesson, courseTitle, isLoading, error };
}
