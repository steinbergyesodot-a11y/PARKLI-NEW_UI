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

interface LoginResponse {
  success?: boolean;
  data?: {
    token?: string;
    accessToken?: string;
    user?: User;
    payload?: User;
  };
  token?: string;
  accessToken?: string;
  user?: User;
  payload?: User;
  error?: string | { message?: string };
}

// 2. Define Context Shape
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
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

  const setSession = (newUser: User, newToken: string): void => {
    setToken(newToken);
    setUser(newUser);
  };

  const login = async (email: string, password: string): Promise<User> => {
    const { data: response } = await api.post<LoginResponse>(
      '/api/users/login',
      { email, password },
      { withCredentials: true }
    );
    const session = response.data ?? response;
    const sessionToken = session.token ?? session.accessToken;
    const sessionUser = session.user ?? session.payload;

    if (response.success === false || !sessionToken || !sessionUser) {
      throw new Error(
        typeof response.error === 'string'
          ? response.error
          : response.error?.message || 'Login failed. Please try again.'
      );
    }

    setSession(sessionUser, sessionToken);
    return sessionUser;
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

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, setSession, logout, api }}>
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