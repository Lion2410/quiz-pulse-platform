
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Types based on UML diagram
export type UserRole = "student" | "lecturer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Student extends User {
  role: "student";
  matricNo: string;
}

export interface Lecturer extends User {
  role: "lecturer";
  staffId: string;
}

export interface Admin extends User {
  role: "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (matricOrStaffId: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock user data for demonstration
const MOCK_USERS = {
  students: [
    { id: "s1", name: "John Doe", email: "john@example.com", role: "student" as const, matricNo: "S12345" },
    { id: "s2", name: "Jane Smith", email: "jane@example.com", role: "student" as const, matricNo: "S67890" },
  ],
  lecturers: [
    { id: "l1", name: "Dr. Robert Brown", email: "robert@faculty.com", role: "lecturer" as const, staffId: "L001" },
    { id: "l2", name: "Prof. Linda Green", email: "linda@faculty.com", role: "lecturer" as const, staffId: "L002" },
  ],
  admins: [
    { id: "a1", name: "Admin User", email: "admin@school.com", role: "admin" as const },
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on load
    const storedUser = localStorage.getItem('quizUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem('quizUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (matricOrStaffId: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // For demo, we'll use our mock data
      
      // Mock authentication logic
      const foundStudent = MOCK_USERS.students.find(s => s.matricNo === matricOrStaffId);
      const foundLecturer = MOCK_USERS.lecturers.find(l => l.staffId === matricOrStaffId);
      const foundAdmin = matricOrStaffId === "admin" ? MOCK_USERS.admins[0] : null;
      
      // Simple mock authentication with fixed password
      if (password !== "password") {
        toast.error("Invalid credentials");
        setIsLoading(false);
        return false;
      }
      
      const authenticatedUser = foundStudent || foundLecturer || foundAdmin;
      
      if (!authenticatedUser) {
        toast.error("User not found");
        setIsLoading(false);
        return false;
      }

      setUser(authenticatedUser);
      localStorage.setItem('quizUser', JSON.stringify(authenticatedUser));
      toast.success(`Welcome, ${authenticatedUser.name}`);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizUser');
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
