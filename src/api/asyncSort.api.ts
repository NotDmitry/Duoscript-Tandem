import type { WidgetView } from '@models/widgetModel';

// Mock Imports
import { asyncSorterWidgetMocks } from '@mocks/widgetAsyncSorter.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import { doc, getDoc, type DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetAsyncSorterWidget(
  widgetId: string
): Promise<WidgetView<'asyncSorter'>> {
  await delay(300);
  return asyncSorterWidgetMocks[widgetId];
}

// Firebase Implementation

async function fbGetAsyncSorterWidget(
  widgetId: string
): Promise<WidgetView<'asyncSorter'>> {
  let snap: DocumentSnapshot;
  try {
    snap = await getDoc(doc(db, 'widgets', widgetId));
  } catch (error) {
    throwFirebaseError(error);
  }
  if (!snap.exists())
    throw new Error(`AsyncSorter widget not found: ${widgetId}`);
  return snap.data() as WidgetView<'asyncSorter'>;
}

// Export Switch

export const getAsyncSorterWidget = USE_MOCK
  ? mockGetAsyncSorterWidget
  : fbGetAsyncSorterWidget;
