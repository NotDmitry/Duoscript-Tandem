import type { UserDashboardView } from '@models/userModel';
import { toUserDashboardView, userConverter } from '@models/userModel';
import type { ActivityLogDocument, ActivityView } from '@models/activityModel';
import { toActivityView } from '@models/activityModel';

// Mock Imports
import { mockUserDashboard } from '@mocks/user.mock';
import { mockActivityLog } from '@mocks/activity.mock';
import { delay } from '@utils/delay';

// Firebase Imports
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';

// Switch

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock Implementation

async function mockGetUserDashboard(uid: string): Promise<UserDashboardView> {
  await delay(300);
  void uid;
  return mockUserDashboard;
}

async function mockGetActivityHistory(
  uid: string,
  page: number,
  itemsPerPage: number
): Promise<{ activities: ActivityView[]; totalPages: number }> {
  await delay(300);
  void uid;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const activities = mockActivityLog.slice(startIndex, endIndex);
  const totalPages = Math.ceil(mockActivityLog.length / itemsPerPage);
  return { activities, totalPages };
}

// Firebase Implementation

const pageCursors = new Map<number, QueryDocumentSnapshot>();

async function fbGetUserDashboard(uid: string): Promise<UserDashboardView> {
  let snap;
  try {
    snap = await getDoc(doc(db, 'users', uid).withConverter(userConverter));
  } catch (error) {
    throwFirebaseError(error);
  }
  if (!snap.exists()) throw new Error('User document not found');
  return toUserDashboardView(snap.data());
}

async function fbGetActivityHistory(
  uid: string,
  page: number,
  itemsPerPage: number
): Promise<{ activities: ActivityView[]; totalPages: number }> {
  let snap;
  let totalPages;
  try {
    const logRef = collection(db, 'users', uid, 'activityLog');
    const countSnap = await getCountFromServer(logRef);
    totalPages = Math.ceil(countSnap.data().count / itemsPerPage);

    const baseQuery = query(
      logRef,
      orderBy('createdAt', 'desc'),
      limit(itemsPerPage)
    );
    const cursor = page > 1 ? pageCursors.get(page - 1) : undefined;
    const pageQuery = cursor ? query(baseQuery, startAfter(cursor)) : baseQuery;

    snap = await getDocs(pageQuery);
  } catch (error) {
    throwFirebaseError(error);
  }

  const lastDoc = snap.docs.at(-1);
  if (lastDoc) pageCursors.set(page, lastDoc);

  const activities = snap.docs.map((doc) =>
    toActivityView(doc.data() as ActivityLogDocument)
  );

  return { activities, totalPages };
}

// Export Switch

export const getUserDashboard = USE_MOCK
  ? mockGetUserDashboard
  : fbGetUserDashboard;
export const getActivityHistory = USE_MOCK
  ? mockGetActivityHistory
  : fbGetActivityHistory;
