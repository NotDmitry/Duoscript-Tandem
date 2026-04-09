import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getLesson } from '@api/lessons.api';
import type { LessonView } from '@models/lessonModel';

interface LocationState {
  lesson?: LessonView;
  courseTitle?: string;
}

export function useLesson(courseId: string, lessonId: string) {
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? null;
  const locationLesson = state?.lesson ?? null;
  const courseTitle = state?.courseTitle ?? '';

  const [lesson, setLesson] = useState<LessonView | null>(locationLesson);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (locationLesson) return;

    async function fetchLesson() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getLesson(courseId, lessonId);
        setLesson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lesson');
      } finally {
        setIsLoading(false);
      }
    }
    void fetchLesson();
  }, [courseId, lessonId, locationLesson]);

  return { lesson, courseTitle, isLoading, error };
}
