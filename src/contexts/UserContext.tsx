
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

// Define types
export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('penafort_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email with password "password"
      if (password !== "password") {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password",
          variant: "destructive"
        });
        setLoading(false);
        return false;
      }
      
      // Create a mock user
      const newUser: User = {
        id: Math.random().toString(36).substring(2),
        email,
        name: email.split('@')[0],
      };
      
      // Save user to state and localStorage
      setUser(newUser);
      localStorage.setItem('penafort_user', JSON.stringify(newUser));
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in",
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      setLoading(false);
      return false;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2),
        email,
        name,
      };
      
      // Save user to state and localStorage
      setUser(newUser);
      localStorage.setItem('penafort_user', JSON.stringify(newUser));
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created",
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('penafort_user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the auth context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
