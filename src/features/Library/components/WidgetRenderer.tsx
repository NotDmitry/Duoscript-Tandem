import type { LessonView } from '@models/lessonModel';
import WidgetQuiz from '@features/WidgetQuiz/WidgetQuiz';
import { MeaningMatcher } from '@features/MeaningMatcher/MeaningMatcher';
import WidgetBugHunter from '@features/WidgetBugHunter/WidgetBugHunter';
import AsyncSorter from '@features/Async-sorter/AsyncSorter';

interface WidgetRendererProps {
  lesson: LessonView;
  onComplete: () => void;
}

export function WidgetRenderer({ lesson, onComplete }: WidgetRendererProps) {
  switch (lesson.widgetType) {
    case 'quiz':
      return <WidgetQuiz widgetId={lesson.widgetId} onComplete={onComplete} />;
    case 'meaningMatcher':
      return (
        <MeaningMatcher widgetId={lesson.widgetId} onComplete={onComplete} />
      );
    case 'bugHunter':
      return (
        <WidgetBugHunter widgetId={lesson.widgetId} onComplete={onComplete} />
      );
    case 'asyncSorter':
      return <AsyncSorter widgetId={lesson.widgetId} onComplete={onComplete} />;
  }
}
