'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDashboardApiUrl, getAuthHeaders } from '../config/api';

interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'manager';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      checkAuthStatus(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async (token: string) => {
    try {
      console.log('Checking auth status with token:', token ? 'Present' : 'Missing');
      const response = await fetch(getDashboardApiUrl('/api/auth/profile'), {
        headers: getAuthHeaders()
      });
      
      console.log('Auth check response status:', response.status);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('User data:', responseData);
        setUser(responseData.data);
      } else {
        console.log('Auth check failed, removing token');
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', email);
      const response = await fetch(getDashboardApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login response data:', responseData);
        const { token, user } = responseData.data;
        console.log('Login successful, token received:', token ? 'Yes' : 'No');
        localStorage.setItem('authToken', token);
        setUser(user);
        return true;
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(getDashboardApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token, user } = responseData.data;
        localStorage.setItem('authToken', token);
        setUser(user);
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 