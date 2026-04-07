import type { CourseProgressView } from '@models/courseProgressModel';

export const mockCourseProgressList: CourseProgressView[] = [
  {
    courseId: 'course_js',
    completedLessonsIds: [
      'lesson_js_1',
      'lesson_js_2',
      'lesson_js_3',
      'lesson_js_4',
      'lesson_js_5',
    ],
    progressPercent: 62,
    updatedAt: new Date().toISOString(),
  },
  {
    courseId: 'course_ts',
    completedLessonsIds: ['lesson_ts_1', 'lesson_ts_2'],
    progressPercent: 33,
    updatedAt: new Date().toISOString(),
  },
  {
    courseId: 'course_html',
    completedLessonsIds: [
      'lesson_html_1',
      'lesson_html_2',
      'lesson_html_3',
      'lesson_html_4',
    ],
    progressPercent: 100,
    updatedAt: new Date().toISOString(),
  },
  {
    courseId: 'course_github',
    completedLessonsIds: ['lesson_github_1'],
    progressPercent: 20,
    updatedAt: new Date().toISOString(),
  },
  {
    courseId: 'course_algorithms',
    completedLessonsIds: ['lesson_algorithms_1'],
    progressPercent: 10,
    updatedAt: new Date().toISOString(),
  },
];
