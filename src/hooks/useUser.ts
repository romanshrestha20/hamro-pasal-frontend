import { getCurrentUser } from "@/lib/authApi";
import { User } from "@/types/Users";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        try {
            const fetchUser = async () => {
                setError(null);
                const token = localStorage.getItem('token');

                if (!token) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                const response = await getCurrentUser();
                if (response.success && response.data) {
                    setIsAuthenticated(true);
                    setUser(response.data);
                } else {
                    setIsAuthenticated(false);
                    throw new Error(response.error || "Failed to fetch user data");
                }
            };
            fetchUser();

        } catch (error) {
            console.error("Error fetching user:", error);
            setError(error instanceof Error ? error.message : "An error occurred");
            // If it's an auth error, redirect to login
            if (error instanceof Error && error.message.includes("401")) {
                setIsAuthenticated(false);
                // Clear token from localStorage
                localStorage.removeItem("token");
                router.push("/auth/login");
            }
        } finally {
            setLoading(false);
        }
    }, [router]);
    return {
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        router,
        isAuthenticated,
        setIsAuthenticated
    };
}