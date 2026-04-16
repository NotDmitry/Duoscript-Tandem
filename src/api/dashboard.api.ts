import type { UserDashboardView, UserDocument } from '@models/userModel';
import { toUserDashboardView, userConverter } from '@models/userModel';
import type { ActivityView } from '@models/activityModel';
import { toActivityView, activityConverter } from '@models/activityModel';

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
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { throwFirebaseError } from '@utils/firebaseError';
import { fbRefreshDailyStats } from '@api/progress.api.ts';

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
): Promise<{
  activities: ActivityView[];
  totalPages: number;
  cursor: undefined;
}> {
  await delay(300);
  void uid;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const activities = mockActivityLog.slice(startIndex, endIndex);
  const totalPages = Math.ceil(mockActivityLog.length / itemsPerPage) || 1;
  return { activities, totalPages, cursor: undefined };
}

// Firebase Implementation

async function fbGetUserDashboard(uid: string): Promise<UserDashboardView> {
  await fbRefreshDailyStats(uid);
  let snap: DocumentSnapshot<UserDocument>;
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
  _page: number,
  itemsPerPage: number,
  cursor?: QueryDocumentSnapshot
): Promise<{
  activities: ActivityView[];
  totalPages: number;
  cursor: QueryDocumentSnapshot | undefined;
}> {
  try {
    const logRef = collection(db, 'users', uid, 'activityLog');
    const countSnap = await getCountFromServer(logRef);
    const totalPages = Math.ceil(countSnap.data().count / itemsPerPage) || 1;

    const baseQuery = query(
      logRef.withConverter(activityConverter),
      orderBy('createdAt', 'desc'),
      limit(itemsPerPage)
    );
    const pageQuery = cursor ? query(baseQuery, startAfter(cursor)) : baseQuery;
    const snap = await getDocs(pageQuery);

    return {
      activities: snap.docs.map((document) => toActivityView(document.data())),
      totalPages,
      cursor: snap.docs.at(-1),
    };
  } catch (error) {
    throwFirebaseError(error);
  }
}

// Export Switch

export const getUserDashboard = USE_MOCK
  ? mockGetUserDashboard
  : fbGetUserDashboard;
export const getActivityHistory = USE_MOCK
  ? mockGetActivityHistory
  : fbGetActivityHistory;
