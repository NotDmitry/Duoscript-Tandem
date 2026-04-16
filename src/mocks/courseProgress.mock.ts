import type { CourseProgressView } from '@models/courseProgressModel';
import { mockLessons } from '@mocks/lessons.mock';
import { mockCourses } from '@mocks/courses.mock';

function buildCourseProgress(): CourseProgressView[] {
  return mockCourses
    .map((course) => {
      const lessons = mockLessons[course.courseId] ?? [];
      const completedLessonsIds = lessons
        .filter((lesson) => lesson.isCompleted)
        .map((lesson) => lesson.lessonId);
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
    .filter(
      (progressEntry): progressEntry is CourseProgressView =>
        progressEntry !== null
    );
}

export const mockCourseProgressList: CourseProgressView[] =
  buildCourseProgress();
