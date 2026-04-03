import type { MeaningMatcherConfig, WidgetView } from '@models/widgetModel';

// Mock Imports
import { meaningMatcherWidgetMocks } from '@mocks/widgetMeaningMatcher.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

export async function mockGetMeaningMatcherWidget(
  widgetId: string
): Promise<WidgetView<MeaningMatcherConfig>> {
  await delay(300);
  return meaningMatcherWidgetMocks[widgetId];
}

// Firebase Implementation

async function fbGetMeaningMatcherWidget(
  widgetId: string
): Promise<WidgetView<MeaningMatcherConfig>> {
  const snap = await getDoc(doc(db, 'widgets', widgetId));
  if (!snap.exists())
    throw new Error(`MeaningMatcher widget not found: ${widgetId}`);
  return snap.data() as WidgetView<MeaningMatcherConfig>;
}

// Export Switch

export const getMeaningMatcherWidget = USE_MOCK
  ? mockGetMeaningMatcherWidget
  : fbGetMeaningMatcherWidget;
