import { User } from './user.js';

type AllowedFields = Partial<
  Omit<User, 'id' | 'password' | 'status' | 'pointsAmount'>
>;

type EditUserData = AllowedFields & {
  newPassword?: string;
  oldPassword?: string;
};

export type EditUserParams = {
  data: EditUserData;
  id: number;
};
