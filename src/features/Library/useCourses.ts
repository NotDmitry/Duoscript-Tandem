import { useEffect, useState } from 'react';
import { getCourses } from '@api/courses.api';
import type { CourseView } from '@models/courseModel';

export function useCourses() {
  const [courses, setCourses] = useState<CourseView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    }
    void fetchCourses();
  }, []);

  return { courses, isLoading, error };
}
