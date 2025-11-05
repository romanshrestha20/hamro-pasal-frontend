import { googleAuth } from "@/lib/api/auth";
import type { User } from "@/lib/types";
import type { CredentialResponse } from "@react-oauth/google";

interface GoogleAuthHandlerParams {
    credentialResponse: CredentialResponse;
    onSuccess?: (user: User) => void;
    onFailure?: (error: unknown) => void;
    onRedirect?: (path: string) => void;
}

/**
 * Handles Google authentication logic.
 * - Sends the Google credential to your backend.
 * - Backend sets a secure HTTP-only cookie.
 * - Returns the user data for optional local use.
 */
export async function handleGoogleAuth({
    credentialResponse,
    onSuccess,
    onFailure,
    onRedirect,
}: GoogleAuthHandlerParams) {
    try {
        const token = credentialResponse?.credential;
        if (!token) throw new Error("No Google credential received");

        const response = await googleAuth({ token });

        if (!response.success || !response.data?.user) {
            throw new Error(response.error || "Invalid backend response");
        }

        const user = response.data.user;

        // Optionally call user-defined success handler
        onSuccess?.(user);
        // Optional redirect after login
        onRedirect?.("/dashboard");

        return { success: true, user } as const;
    } catch (error) {
        console.error("Google authentication error:", error);
        onFailure?.(error);
        return { success: false, error } as const;
    }
}
