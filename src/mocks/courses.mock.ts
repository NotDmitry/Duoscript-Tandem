import type { CourseView } from '@models/courseModel';

export const mockCourses: CourseView[] = [
  {
    courseId: 'course_js',
    title: 'JavaScript',
    description: 'Core JS concepts, async patterns, and the event loop.',
    tag: 'js',
    lessonCount: 8,
    progressPercent: 62,
  },
  {
    courseId: 'course_ts',
    title: 'TypeScript',
    description: 'Type system, generics, utility types and more.',
    tag: 'ts',
    lessonCount: 6,
    progressPercent: 33,
  },
  {
    courseId: 'course_css',
    title: 'CSS',
    description: 'Layouts, positioning, animations and responsive design.',
    tag: 'css',
    lessonCount: 5,
    progressPercent: 0,
  },
  {
    courseId: 'course_html',
    title: 'HTML',
    description: 'Semantic markup, forms, and accessibility basics.',
    tag: 'html',
    lessonCount: 4,
    progressPercent: 100,
  },
  {
    courseId: 'course_github',
    title: 'GitHub',
    description: 'Git workflows, branching strategies and collaboration.',
    tag: 'github',
    lessonCount: 5,
    progressPercent: 20,
  },
  {
    courseId: 'course_algorithms',
    title: 'Algorithms',
    description: 'Sorting, searching, complexity and problem solving.',
    tag: 'algorithms',
    lessonCount: 10,
    progressPercent: 10,
  },
];
