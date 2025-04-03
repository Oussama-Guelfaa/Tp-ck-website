"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";

// Define available user roles
export type UserRole = "admin" | "operator" | "viewer";

// Define permissions for each component/feature
export type PermissionArea = "viewDashboard" | "controlMachines" | "viewSettings" | "changeSettings";

// User interface
export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  email: string;
  lastLogin?: string;
}

// Role permissions mapping
const rolePermissions: Record<UserRole, PermissionArea[]> = {
  admin: ["viewDashboard", "controlMachines", "viewSettings", "changeSettings"],
  operator: ["viewDashboard", "controlMachines", "viewSettings"],
  viewer: ["viewDashboard"],
};

// Mock user database - in a real app, this would be server-side
const mockUsers = [
  {
    id: "1",
    username: "admin",
    password: "password", // In a real app, this would be hashed
    fullName: "Admin User",
    role: "admin" as UserRole,
    email: "admin@tpack.com",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    username: "operator",
    password: "operator123", // In a real app, this would be hashed
    fullName: "Machine Operator",
    role: "operator" as UserRole,
    email: "operator@tpack.com",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "3",
    username: "viewer",
    password: "viewer123", // In a real app, this would be hashed
    fullName: "Dashboard Viewer",
    role: "viewer" as UserRole,
    email: "viewer@tpack.com",
    lastLogin: new Date().toISOString(),
  },
];

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: PermissionArea) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("tpack_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("tpack_user");
      }
    }
    setIsInitialized(true);
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user in mock database
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      // Create user object without password
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);

      // Store in localStorage (in a real app, you'd use cookies/JWT)
      localStorage.setItem("tpack_user", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("tpack_user");
  };

  // Check if user has specific permission
  const hasPermission = (permission: PermissionArea): boolean => {
    if (!user) return false;

    const permissions = rolePermissions[user.role];
    return permissions.includes(permission);
  };

  // Define exposed values
  const value = {
    user,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user,
  };

  if (!isInitialized) {
    return null; // Prevent flash of unauthenticated content
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
