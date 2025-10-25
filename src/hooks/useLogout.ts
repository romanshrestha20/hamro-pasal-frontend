import { logoutUser } from "@/lib/authApi";
import { useRouter } from "next/navigation";


export const useLogout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser();
            // Clear token from localStorage
            localStorage.removeItem("token");
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout error:", error);
            // Even if API call fails, clear local storage and redirect
            localStorage.removeItem("token");
            router.push("/auth/login");
        }
    };

    return {
        handleLogout
    };
};

