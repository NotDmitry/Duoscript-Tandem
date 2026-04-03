import type { QuizConfig, WidgetView } from '@models/widgetModel';

// Mock Imports
import { quizWidgetMocks } from '@mocks/widgetQuiz.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetQuizWidget(
  widgetId: string
): Promise<WidgetView<QuizConfig>> {
  await delay(300);
  return quizWidgetMocks[widgetId];
}

// Firebase Implementation

async function fbGetQuizWidget(
  widgetId: string
): Promise<WidgetView<QuizConfig>> {
  const snap = await getDoc(doc(db, 'widgets', widgetId));
  if (!snap.exists()) throw new Error(`Quiz widget not found: ${widgetId}`);
  return snap.data() as WidgetView<QuizConfig>;
}

// Export Switch

export const getQuizWidget = USE_MOCK ? mockGetQuizWidget : fbGetQuizWidget;
