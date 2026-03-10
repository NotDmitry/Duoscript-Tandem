import type { User } from '@/shared/types/auth.types';

const mockUsers: User[] = [
  {
    id: '1',
    nickname: 'User',
    password: 'User123!',
  },
  {
    id: '2',
    nickname: 'Userr',
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
export function isPasswordCorrect(password: string, nickname: string): boolean {
  const existedUser: User[] = mockUsers.filter((user) => {
    return user.nickname === nickname;
  });
  if (existedUser.length > 1) throw Error(`${nickname} is already exist`); // другое сообщение
  if (existedUser.length === 0) return false;
  return password === existedUser[0].password;
}
export function getUserId(nickname: string): string {
  const existedUser: User[] = mockUsers.filter((user) => {
    return user.nickname === nickname;
  });
  if (existedUser.length > 1)
    throw Error(`${nickname}  exists more then 1 time`); // другое сообщение
  if (existedUser.length === 0) throw Error(`${nickname} isn't registered`);
  return existedUser[0].id;
}
