import type { Timestamp } from 'firebase/firestore';
import type { CourseTag } from '@/shared/models/courseModel.ts';

export type WidgetType = 'quiz' | 'meaningMatcher';

export interface WidgetDocument<T> {
  widgetId: string;
  type: WidgetType;
  topic: CourseTag;
  config: T;
  createdAt: Timestamp;
}

export type WidgetView<T> = Omit<WidgetDocument<T>, 'createdAt'>;

// Quiz Widget

export interface QuizQuestion {
  isText: boolean;
  question: string;
  code?: string;
  answers: [number, string][];
}

export interface QuizConfig {
  quizName: string;
  questions: QuizQuestion[];
  rightAnswers: (number | null)[];
}

// Meaning Matcher Widget

export type MeaningMatcherDifficulty = 'easy' | 'medium' | 'hard';

export interface MatcherPair {
  id: number;
  left: string;
  right: string;
}

export interface MatcherLevelData {
  title: string;
  pairs: MatcherPair[];
}

export type MeaningMatcherConfig = Record<
  MeaningMatcherDifficulty,
  MatcherLevelData
>;
