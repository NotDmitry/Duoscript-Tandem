import type { WidgetView, QuizQuestion } from '@models/widgetModel';

// Mock Imports
import { quizWidgetMocks } from '@mocks/widgetQuiz.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import { doc, getDoc, type DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetQuizWidget(
  widgetId: string
): Promise<WidgetView<'quiz'>> {
  await delay(300);
  return quizWidgetMocks[widgetId];
}

// Firebase Implementation

type StoredQuizQuestion = Omit<QuizQuestion, 'answers'> & {
  answers: { index: number; text: string }[];
};

function toQuizView(data: Record<string, unknown>): WidgetView<'quiz'> {
  const config = data.config as {
    quizName: string;
    questions: StoredQuizQuestion[];
    rightAnswers: (number | null)[];
  };
  return {
    ...(data as Omit<WidgetView<'quiz'>, 'config'>),
    config: {
      ...config,
      questions: config.questions.map((question) => ({
        ...question,
        answers: question.answers.map(
          ({ index, text }) => [index, text] as [number, string]
        ),
      })),
    },
  };
}

async function fbGetQuizWidget(widgetId: string): Promise<WidgetView<'quiz'>> {
  let snap: DocumentSnapshot;
  try {
    snap = await getDoc(doc(db, 'widgets', widgetId));
  } catch (error) {
    throwFirebaseError(error);
  }
  if (!snap.exists()) throw new Error(`Quiz widget not found: ${widgetId}`);
  return toQuizView(snap.data() as Record<string, unknown>);
}

// Export Switch

export const getQuizWidget = USE_MOCK ? mockGetQuizWidget : fbGetQuizWidget;
