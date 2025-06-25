"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface User {
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  gender?: boolean;
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
      const res = await fetch("http://localhost:4000/profile/get-user", {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const result = await res.json();
      if (result?.data) {
        setUser({
          full_name: result.data.full_name,
          email: result.data.email,
          phone: result.data.phone,
          address: result.data.address,
          birth_date: result.data.birth_date,
          gender: result.data.gender,
        });
      } else {
        setUser(null);
      }
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
