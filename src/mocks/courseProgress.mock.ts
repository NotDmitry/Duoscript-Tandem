import type { CourseProgressView } from '@models/courseProgressModel';
import { mockLessons } from '@mocks/lessons.mock';
import { mockCourses } from '@mocks/courses.mock';

function buildCourseProgress(): CourseProgressView[] {
  return mockCourses
    .map((course) => {
      const lessons = mockLessons[course.courseId] ?? [];
      const completedLessonsIds = lessons
        .filter((l) => l.isCompleted)
        .map((l) => l.lessonId);
      if (completedLessonsIds.length === 0) return null;
      return {
        courseId: course.courseId,
        completedLessonsIds,
        progressPercent: Math.round(
          (completedLessonsIds.length / lessons.length) * 100
        ),
        updatedAt: new Date().toISOString(),
      };
    })
    .filter((p): p is CourseProgressView => p !== null);
}

export const mockCourseProgressList: CourseProgressView[] =
  buildCourseProgress();
