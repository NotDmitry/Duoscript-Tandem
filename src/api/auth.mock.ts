import type { User } from '@/shared/types/auth.types';

const mockUsers: User[] = [
  {
    id: '1',
    nickname: 'User1',
    password: 'User123!',
  },
  {
    id: '2',
    nickname: 'User2',
    password: 'User1234!',
  },
];

export function addUser(user: Omit<User, 'id'>): User {
  const newUser = {
    ...user,
    id: String(mockUsers.length + 1),
  };
  mockUsers.push(newUser);
  console.log('add');
  return newUser;
}
export function userExist(nickname: string): boolean {
  console.log('exist');
  return mockUsers.some((user) => nickname === user.nickname);
}
