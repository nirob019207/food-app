export type UserStatus = 'ACTIVATE' | 'INACTIVATE' | 'BLOCKED';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}