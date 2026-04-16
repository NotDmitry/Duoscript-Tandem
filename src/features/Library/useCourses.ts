import { useEffect, useState } from 'react';
import { getCourses, getCoursesWithProgress } from '@api/courses.api';
import type { CourseView, CourseWithProgressView } from '@models/courseModel';

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

export function useCoursesWithProgress(uid: string) {
  const [courses, setCourses] = useState<CourseWithProgressView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    async function fetchCoursesWithProgress() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCoursesWithProgress(uid);
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    }
    void fetchCoursesWithProgress();
  }, [uid]);

  return { courses, isLoading, error };
}
