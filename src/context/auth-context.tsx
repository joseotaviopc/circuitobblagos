'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, pass: string): boolean => {
    // Hardcoded credentials for demonstration
    if (username === 'admin' && pass === 'password') {
      const adminUser: User = { username: 'admin', role: 'admin' };
      setUser(adminUser);
      return true;
    }
     if (username === 'user' && pass === 'password') {
      const regularUser: User = { username: 'user', role: 'user' };
      setUser(regularUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
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
