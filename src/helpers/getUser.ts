import { User } from '../types/User';

export const getUser = (users: User[], id: string) => {
  return users.find(user => user.login.username === id);
}
