import type { WidgetView } from '@models/widgetModel';
import { bugHunterWidgetMocks } from '@mocks/widgetBugHunter.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import { doc, getDoc, type DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetBugHunterWidget(
  widgetId: string
): Promise<WidgetView<'bugHunter'>> {
  await delay(300);
  return bugHunterWidgetMocks[widgetId];
}

// Firebase Implementation

interface StoredBugHunterQuestion {
  code: string;
  answers: { options: string[] }[];
}

function toBugHunterView(
  data: Record<string, unknown>
): WidgetView<'bugHunter'> {
  const config = data.config as {
    quizName: string;
    questions: StoredBugHunterQuestion[];
    rightAnswers: string[];
  };
  return {
    ...(data as Omit<WidgetView<'bugHunter'>, 'config'>),
    config: {
      ...config,
      questions: config.questions.map((question) => ({
        ...question,
        answers: question.answers.map(({ options }) => options),
      })),
    },
  };
}

async function fbGetBugHunterWidget(
  widgetId: string
): Promise<WidgetView<'bugHunter'>> {
  let snap: DocumentSnapshot;
  try {
    snap = await getDoc(doc(db, 'widgets', widgetId));
  } catch (error) {
    throwFirebaseError(error);
  }
  if (!snap.exists())
    throw new Error(`BugHunter widget not found: ${widgetId}`);
  return toBugHunterView(snap.data() as Record<string, unknown>);
}

// Export Switch

export const getBugHunterWidget = USE_MOCK
  ? mockGetBugHunterWidget
  : fbGetBugHunterWidget;
