import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AxiosInstance } from 'axios';
import api from '../lib/axiosClient';

// 1. Define Data Models
export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

// 2. Define Context Shape
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signup: (email: string, password: string, captchaToken: string) => Promise<User>;
  setSession: (user: User, token: string) => void;
  logout: () => Promise<void>;
  api: AxiosInstance;
}

// 3. Create Context with initial null value
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // The shared client reads the token from localStorage on every request.
  const setToken = (value: string | null): void => {
    if (value) {
      localStorage.setItem('authToken', value);
    } else {
      localStorage.removeItem('authToken');
    }
    setTokenState(value);
  };

  // Check silent auth on initial load
  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const { data } = await api.get<AuthResponse>('/api/auth/refresh', {
          withCredentials: true,
        });
        setToken(data.accessToken);
        setUser(data.user);
      } catch (err) {
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Signup Handler
  const signup = async (
    email: string,
    password: string,
    captchaToken: string
  ): Promise<User> => {
    const { data } = await api.post<AuthResponse>(
      '/api/auth/signup',
      { email, password, captchaToken },
      { withCredentials: true }
    );

    setToken(data.accessToken);
    setUser(data.user);
    return data.user;
  };

  const setSession = (newUser: User, newToken: string): void => {
    setToken(newToken);
    setUser(newUser);
  };

  // Logout Handler
  const logout = async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout', null, { withCredentials: true });
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, setSession, logout, api }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook with non-null assertion handling
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};