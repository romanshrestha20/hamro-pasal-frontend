import { useAuth } from "./useAuth";

export const useUser = () => {
    const {
        user,
        isAuthenticated, 
        loading,
        error,
    } = useAuth();
    
    return {
       user,
        isAuthenticated, 
        loading,
        error,
    };
}