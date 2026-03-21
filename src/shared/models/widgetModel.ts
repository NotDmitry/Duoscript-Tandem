import type { Timestamp } from 'firebase/firestore';
import type { CourseTag } from '@/shared/models/courseModel.ts';

export type WidgetType = 'quiz';

export interface WidgetDocument<T> {
  widgetId: string;
  type: WidgetType;
  config: T;
  createdAt: Timestamp;
}

export type WidgetView<T> = Omit<WidgetDocument<T>, 'createdAt'>;

// Concrete widgets

export interface QuizQuestion {
  isText: boolean;
  question: string;
  code?: string;
  answers: [number, string][];
}

export interface QuizConfig {
  quizName: string;
  type: CourseTag;
  questions: QuizQuestion[];
  rightAnswers: (number | null)[];
}
