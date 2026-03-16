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
function findUserByNickname(nickname: string): User | undefined {
  return mockUsers.find((user) => user.nickname === nickname);
}
function findUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

export function addUser(user: Omit<User, 'id'>): User {
  const newUser = {
    ...user,
    id: String(mockUsers.length + 1),
  };
  mockUsers.push(newUser);
  return newUser;
}
export function updateUser(user: User): User {
  const updatingUser = findUserById(user.id);
  if (!updatingUser) {
    throw Error("User doesn't exist");
  }
  updatingUser.nickname = user.nickname;
  updatingUser.password = user.password;

  console.log(updatingUser);
  return updatingUser;
}
export function userExist(nickname: string): boolean {
  return mockUsers.some((user) => nickname === user.nickname);
}
export function isPasswordCorrect(password: string, nickname: string): boolean {
  const existedUser: User | undefined = findUserByNickname(nickname);
  if (!existedUser) return false;
  return password === existedUser.password;
}
export function getUserId(nickname: string): string {
  const existedUser: User | undefined = findUserByNickname(nickname);

  if (!existedUser) throw Error(`${nickname} isn't registered`);
  return existedUser.id;
}
