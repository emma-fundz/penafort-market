
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase, signIn, signUp, signOut, getCurrentUser } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

// Define types
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
    const getInitialSession = async () => {
      try {
        const { user, error } = await getCurrentUser();
        
        if (error) {
          console.error('Error getting current user:', error);
        }
        
        setUser(user || null);
      } catch (error) {
        console.error('Error during authentication check:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    getInitialSession();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return false;
      }
      
      if (data.user) {
        setUser(data.user);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in",
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected error during login:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await signUp(email, password, { full_name: name });
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return false;
      }
      
      if (data.user) {
        setUser(data.user);
        toast({
          title: "Account created!",
          description: "Your account has been successfully created",
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await signOut();
      
      if (error) {
        console.error('Error during sign out:', error);
        toast({
          title: "Logout failed",
          description: "An error occurred while logging out",
          variant: "destructive"
        });
        return;
      }
      
      setUser(null);
      toast({
        title: "Logged out",
        description: "You've been successfully logged out",
      });
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      toast({
        title: "Logout failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
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
