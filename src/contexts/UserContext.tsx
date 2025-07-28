'use client';
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
} from 'react';

export interface User {
  full_name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  order_address?: {
    detail: string;
    province: string;
    district: string;
    ward: string;
    full_address: string;
    codes: {
      province_code: string;
      district_code: string;
      ward_code: string;
    };
  };
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
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedUserRef = useRef<boolean>(false);

  const fetchUser = useCallback(async () => {
    if (hasFetchedUserRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/profile/get-user`, {
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || 'Không lấy được thông tin người dùng',
        );
      }
      const json = await res.json();
      setUser(json.data);
      hasFetchedUserRef.current = true;
    } catch (err: any) {
      setError(err.message || 'Lỗi khi lấy thông tin người dùng');
      setUser(null);
      hasFetchedUserRef.current = false;
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{ user, fetchUser, setUser, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
