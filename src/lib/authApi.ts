// hamro-pasal-frontend/src/lib/authApi.ts
import type { User } from "../types/Users";
import { apiRequest } from "./apiClient";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface GoogleAuthPayload {
    token: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    token: string;
    newPassword: string;
}

export const googleAuth = (payload: GoogleAuthPayload) =>
    apiRequest<{ token: string; user: User }>("post", "/auth/google", payload)
        .then((response) => {
            // Optional debug log, but return the response so callers receive it
            console.log("token:", response.data?.token);
            return response;
        });

export const loginUser = (payload: LoginPayload) =>
    apiRequest<{ token: string; user: User }>("post", "/auth/login", payload);

export const registerUser = (payload: RegisterPayload) =>
    apiRequest<{ token: string; user: User }>("post", "/auth/register", payload);

export const logoutUser = () =>
    apiRequest<void>("post", "/auth/logout");


export const getCurrentUser = () =>
    apiRequest<User>("get", "/auth/me");

export const forgotPassword = (payload: ForgotPasswordPayload) =>
    apiRequest<{ message: string }>("post", "/auth/forgot-password", payload);

export const resetPassword = (payload: ResetPasswordPayload) =>
    apiRequest<{ message: string }>("post", "/auth/reset-password", payload);
