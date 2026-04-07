import type { LessonView } from '@models/lessonModel';
import WidgetQuiz from '@features/WidgetQuiz/WidgetQuiz';
import { MeaningMatcher } from '@features/MeaningMatcher/MeaningMatcher';
import WidgetBugHunter from '@features/WidgetBugHunter/WidgetBugHunter';
import AsyncSorter from '@features/Async-sorter/AsyncSorter';

interface WidgetRendererProps {
  lesson: LessonView;
}

export function WidgetRenderer({ lesson }: WidgetRendererProps) {
  switch (lesson.widgetType) {
    case 'quiz':
      return <WidgetQuiz widgetId={lesson.widgetId} />;
    case 'meaningMatcher':
      return <MeaningMatcher widgetId={lesson.widgetId} />;
    case 'bugHunter':
      return <WidgetBugHunter widgetId={lesson.widgetId} />;
    case 'asyncSorter':
      return <AsyncSorter widgetId={lesson.widgetId} />;
  }
}
