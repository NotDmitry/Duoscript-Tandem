import type { CourseView } from '@models/courseModel';
import { mockLessons } from '@mocks/lessons.mock';

function lessonCount(courseId: string): number {
  return mockLessons[courseId].length;
}

export const mockCourses: CourseView[] = [
  {
    courseId: 'course_js',
    title: 'JavaScript',
    description: 'Core JS concepts, async patterns, and the event loop.',
    tag: 'js',
    lessonCount: lessonCount('course_js'),
  },
  {
    courseId: 'course_ts',
    title: 'TypeScript',
    description: 'Type system, generics, utility types and more.',
    tag: 'ts',
    lessonCount: lessonCount('course_ts'),
  },
  {
    courseId: 'course_css',
    title: 'CSS',
    description: 'Layouts, positioning, animations and responsive design.',
    tag: 'css',
    lessonCount: lessonCount('course_css'),
  },
  {
    courseId: 'course_html',
    title: 'HTML',
    description: 'Semantic markup, forms, and accessibility basics.',
    tag: 'html',
    lessonCount: lessonCount('course_html'),
  },
  {
    courseId: 'course_github',
    title: 'GitHub',
    description: 'Git workflows, branching strategies and collaboration.',
    tag: 'github',
    lessonCount: lessonCount('course_github'),
  },
  {
    courseId: 'course_algorithms',
    title: 'Algorithms',
    description: 'Sorting, searching, complexity and problem solving.',
    tag: 'algorithms',
    lessonCount: lessonCount('course_algorithms'),
  },
];
