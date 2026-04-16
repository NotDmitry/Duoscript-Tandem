import { useEffect, useState } from 'react';
import { getLessonsByCourse } from '@api/lessons.api';
import type { LessonView } from '@models/lessonModel';

export function useLessons(courseId: string, uid: string) {
  const [lessons, setLessons] = useState<LessonView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLessons() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getLessonsByCourse(courseId, uid);
        setLessons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lessons');
      } finally {
        setIsLoading(false);
      }
    }
    void fetchLessons();
  }, [courseId, uid]);

  return { lessons, isLoading, error };
}
