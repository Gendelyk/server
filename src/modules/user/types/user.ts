import { UserRole } from '../enums/user-role.enum.js';

export type User = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  role: UserRole;
};
