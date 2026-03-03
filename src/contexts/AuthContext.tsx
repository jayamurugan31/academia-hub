import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "student" | "admin" | "seating_manager" | "club_coordinator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registerNumber?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<UserRole, User> = {
  student: { id: "s1", name: "Arun Kumar", email: "arun@college.edu", role: "student", registerNumber: "21CS101", department: "Computer Science" },
  admin: { id: "a1", name: "Dr. Priya Sharma", email: "admin@college.edu", role: "admin" },
  seating_manager: { id: "sm1", name: "Rajesh M", email: "seating@college.edu", role: "seating_manager" },
  club_coordinator: { id: "cc1", name: "Sneha R", email: "club@college.edu", role: "club_coordinator" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("ams_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (_email: string, _password: string, role: UserRole) => {
    await new Promise((r) => setTimeout(r, 500));
    const mockUser = MOCK_USERS[role];
    setUser(mockUser);
    localStorage.setItem("ams_user", JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("ams_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
