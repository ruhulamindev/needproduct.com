"use client";

import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Simulate API verification
      setTimeout(() => {
        const storedUser = JSON.parse(localStorage.getItem("user_data") || "{}");
        if (storedUser?.id) setUser(storedUser);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 500));

    // Example login logic
    if (email === "admin@manfare.com" && password === "admin123") {
      const adminUser = { id: "1", name: "Admin User", email, role: "admin" as const };
      setUser(adminUser);
      localStorage.setItem("auth_token", "admin_token");
      localStorage.setItem("user_data", JSON.stringify(adminUser));
      return true;
    } else if (email === "user@example.com" && password === "user123") {
      const regularUser = { id: "2", name: "Regular User", email, role: "customer" as const };
      setUser(regularUser);
      localStorage.setItem("auth_token", "user_token");
      localStorage.setItem("user_data", JSON.stringify(regularUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 500));
    const newUser = { id: Date.now().toString(), name, email, role: "customer" as const };
    setUser(newUser);
    localStorage.setItem("auth_token", "new_user_token");
    localStorage.setItem("user_data", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
  };

  return <AuthContext.Provider value={{ user, login, logout, register, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
