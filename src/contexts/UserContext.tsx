"use client";

import { getProfile } from "@/lib/profileApi";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export interface User {
  full_name: string;
  email: string;
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
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, fetchUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
