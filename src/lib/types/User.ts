export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
