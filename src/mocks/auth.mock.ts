interface MockAuthUser {
  uid: string;
  displayName: string;
  email: string;
  password: string;
}

const MOCK_USERS_KEY = 'mock_auth_users';

function loadUsers(): MockAuthUser[] {
  try {
    const stored = localStorage.getItem(MOCK_USERS_KEY);
    return stored ? (JSON.parse(stored) as MockAuthUser[]) : defaultUsers;
  } catch {
    return defaultUsers;
  }
}

function saveUsers(users: MockAuthUser[]): void {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

const defaultUsers: MockAuthUser[] = [
  {
    uid: 'user_1',
    displayName: 'anelka',
    email: 'anelka@example.com',
    password: 'User123!',
  },
  {
    uid: 'user_2',
    displayName: 'developer',
    email: 'dev@example.com',
    password: 'Dev1234!',
  },
];

const mockAuthUsers: MockAuthUser[] = loadUsers();

function findByEmail(email: string): MockAuthUser | undefined {
  return mockAuthUsers.find((user) => user.email === email);
}

function findByUid(uid: string): MockAuthUser | undefined {
  return mockAuthUsers.find((user) => user.uid === uid);
}

export function mockUserEmailExists(email: string): boolean {
  return mockAuthUsers.some((user) => user.email === email);
}

export function mockIsPasswordCorrect(
  email: string,
  password: string
): boolean {
  const user = findByEmail(email);
  if (!user) return false;
  return user.password === password;
}

export function mockGetUidByEmail(email: string): string {
  const user = findByEmail(email);
  if (!user) throw new Error(`No mock user with email ${email}`);
  return user.uid;
}

export function mockGetUserByUid(uid: string): Omit<MockAuthUser, 'password'> {
  const user = findByUid(uid);
  if (!user) throw new Error(`No mock user with uid ${uid}`);
  return { uid: user.uid, displayName: user.displayName, email: user.email };
}

export function mockRegisterUser(
  email: string,
  displayName: string,
  password: string
): Omit<MockAuthUser, 'password'> {
  const newUser: MockAuthUser = {
    uid: `user_${String(mockAuthUsers.length + 1)}`,
    displayName,
    email,
    password,
  };
  mockAuthUsers.push(newUser);
  saveUsers(mockAuthUsers);
  return {
    uid: newUser.uid,
    displayName: newUser.displayName,
    email: newUser.email,
  };
}

export function mockUpdateUser(
  uid: string,
  updates: Partial<Pick<MockAuthUser, 'displayName' | 'email' | 'password'>>
): Omit<MockAuthUser, 'password'> {
  const user = findByUid(uid);
  if (!user) throw new Error(`No mock user with uid ${uid}`);
  if (updates.displayName) user.displayName = updates.displayName;
  if (updates.email) user.email = updates.email;
  if (updates.password) user.password = updates.password;
  saveUsers(mockAuthUsers);
  return { uid: user.uid, displayName: user.displayName, email: user.email };
}
