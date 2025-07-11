"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

export interface User {
  full_name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  order_address?: string;
  birth_date?: string;
  gender?: 0 | 1 | 2;
}

interface UserContextType {
  user: User | null;
  fetchUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/profile/get-user", {
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Không lấy được thông tin user");
      }
      const json = await res.json();
      setUser(json.data);
    } catch (err: any) {
      setError(err.message || "Lỗi khi lấy thông tin user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session, fetchUser]);

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
