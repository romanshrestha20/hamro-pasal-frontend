// config/env.ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

// Validate on app start
if (!env.googleClientId) {
  throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
}