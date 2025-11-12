import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { User } from "@/lib/types";
import { updateUser, deleteUser, getAllUsers } from "@/lib/api/auth/index";

export type UserResult =
  | { success: true; data: User | User[] }
  | { success: false; error: string };

export interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchAllUsers: (signal?: AbortSignal) => Promise<void>;
  updateUser: (
    userId: string,
    updatedData: Partial<User>
  ) => Promise<UserResult>;
  deleteUser: (userId: string) => Promise<UserResult>;
}

export const UserContext = createContext<UserContextType>({
  users: [],
  loading: true,
  error: null,
  fetchAllUsers: async () => {},
  updateUser: async () => ({ success: false, error: "Not implemented" }),
  deleteUser: async () => ({ success: false, error: "Not implemented" }),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const usersAbortRef = useRef<AbortController | null>(null);

  const fetchAllUsers = async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await getAllUsers({ signal });
      if (response.success && Array.isArray(response.data)) {
        setUsers(response.data);
        setError(null);
      } else {
        setError(response.error || "Failed to fetch users");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch users";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    usersAbortRef.current = new AbortController();
    fetchAllUsers(usersAbortRef.current.signal);

    return () => {
      usersAbortRef.current?.abort();
    };
  }, []);
  const handleUpdateUser = async (
    userId: string,
    updatedData: Partial<User>
  ): Promise<UserResult> => {
    try {
      const response = await updateUser(userId, updatedData);
      if (response.success && response.data) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? (response.data as User) : user
          )
        );
        toast.success("User updated successfully");
        return { success: true, data: response.data };
      }
      return {
        success: false,
        error: response.error || "Failed to update user",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update user";
      return { success: false, error: message };
    }
  };

  const handleDeleteUser = async (userId: string): Promise<UserResult> => {
    try {
      const response = await deleteUser(userId);
      if (response.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        toast.success("User deleted successfully");
        return { success: true, data: [] };
      }
      return {
        success: false,
        error: response.error || "Failed to delete user",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete user";
      return { success: false, error: message };
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        fetchAllUsers,
        updateUser: handleUpdateUser,
        deleteUser: handleDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
