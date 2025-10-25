// hamro-pasal-frontend/src/lib/userApi.ts
import type { User } from "../types/Users";
import { apiRequest } from "./apiClient";



export const updateUser = (userId: string, updatedData: Partial<User>) =>
  apiRequest<User>("put", `/users/${userId}`, updatedData);

export const deleteUser = (userId: string) =>
  apiRequest<void>("delete", `/users/${userId}`);

export const getAllUsers = () =>
  apiRequest<User[]>("get", "/users/all");
