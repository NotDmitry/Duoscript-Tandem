import type { WidgetView } from '@models/widgetModel';

// Mock Imports
import { meaningMatcherWidgetMocks } from '@mocks/widgetMeaningMatcher.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import { doc, getDoc, type DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

export async function mockGetMeaningMatcherWidget(
  widgetId: string
): Promise<WidgetView<'meaningMatcher'>> {
  await delay(300);
  return meaningMatcherWidgetMocks[widgetId];
}

// Firebase Implementation

async function fbGetMeaningMatcherWidget(
  widgetId: string
): Promise<WidgetView<'meaningMatcher'>> {
  let snap: DocumentSnapshot;
  try {
    snap = await getDoc(doc(db, 'widgets', widgetId));
  } catch (error) {
    throwFirebaseError(error);
  }
  if (!snap.exists())
    throw new Error(`MeaningMatcher widget not found: ${widgetId}`);
  return snap.data() as WidgetView<'meaningMatcher'>;
}

// Export Switch

export const getMeaningMatcherWidget = USE_MOCK
  ? mockGetMeaningMatcherWidget
  : fbGetMeaningMatcherWidget;
