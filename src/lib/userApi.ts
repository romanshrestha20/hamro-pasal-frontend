import type { User } from "../types/Users";
import { apiRequest } from "./apiClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const loginUser = (payload: LoginPayload) =>
  apiRequest<{ token: string; user: User }>("post", "/auth/login", payload);

export const registerUser = (payload: RegisterPayload) =>
  apiRequest<{ token: string; user: User }>("post", "/auth/register", payload);

export const logoutUser = () =>
  apiRequest<void>("post", "/auth/logout");


export const getCurrentUser = () =>
  apiRequest<User>("get", "/auth/me");

export const updateUser = (userId: string, updatedData: Partial<User>) =>
  apiRequest<User>("put", `/users/${userId}`, updatedData);

export const deleteUser = (userId: string) =>
  apiRequest<void>("delete", `/users/${userId}`);

export const getAllUsers = () =>
  apiRequest<User[]>("get", "/users/all");
