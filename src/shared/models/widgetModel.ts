import type { Timestamp } from 'firebase/firestore';
import type { CourseTag } from '@models/courseModel';

export interface WidgetConfigMap {
  quiz: QuizConfig;
  meaningMatcher: MeaningMatcherConfig;
  bugHunter: BugHunterConfig;
  asyncSorter: AsyncSorterConfig;
}

export type WidgetType = keyof WidgetConfigMap;

export interface WidgetDocument<T extends WidgetType> {
  widgetId: string;
  type: T;
  topic: CourseTag;
  config: WidgetConfigMap[T];
  createdAt: Timestamp;
}

export type WidgetView<T extends WidgetType> = Omit<
  WidgetDocument<T>,
  'createdAt'
>;

// Quiz Widget

export type UserAnswer = number | null;

export interface QuizQuestion {
  isText: boolean;
  question: string;
  code?: string;
  answers: [number, string][];
}

export interface QuizConfig {
  quizName: string;
  questions: QuizQuestion[];
  rightAnswers: UserAnswer[];
}

// Bug Hunter Widget

export interface BugHunterTask {
  code: string;
  answers: string[][];
}

export interface BugHunterConfig {
  quizName: string;
  questions: BugHunterTask[];
  rightAnswers: string[];
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

// Async Sorter
export interface AsyncSorterTask {
  id: number;
  codeSnippet: string[];
  blocks: {
    id: string;
    code: string;
    label: string;
  }[];
  answer: {
    callStack: string[];
    microtasks: string[];
    macrotasks: string[];
    outputOrder: string[];
  };
}
export interface AsyncSorterConfig {
  tasks: AsyncSorterTask[];
}
