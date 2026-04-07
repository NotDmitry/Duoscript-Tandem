import type { CourseView } from '@models/courseModel';

export const mockCourses: CourseView[] = [
  {
    courseId: 'course_js',
    title: 'JavaScript',
    description: 'Core JS concepts, async patterns, and the event loop.',
    tag: 'js',
    lessonCount: 8,
  },
  {
    courseId: 'course_ts',
    title: 'TypeScript',
    description: 'Type system, generics, utility types and more.',
    tag: 'ts',
    lessonCount: 6,
  },
  {
    courseId: 'course_css',
    title: 'CSS',
    description: 'Layouts, positioning, animations and responsive design.',
    tag: 'css',
    lessonCount: 5,
  },
  {
    courseId: 'course_html',
    title: 'HTML',
    description: 'Semantic markup, forms, and accessibility basics.',
    tag: 'html',
    lessonCount: 4,
  },
  {
    courseId: 'course_github',
    title: 'GitHub',
    description: 'Git workflows, branching strategies and collaboration.',
    tag: 'github',
    lessonCount: 5,
  },
  {
    courseId: 'course_algorithms',
    title: 'Algorithms',
    description: 'Sorting, searching, complexity and problem solving.',
    tag: 'algorithms',
    lessonCount: 10,
  },
];
