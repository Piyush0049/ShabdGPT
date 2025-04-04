import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  progress: {
    xp: number;
    level: number;
    completedLessons: string[];
    streak: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (progress: Partial<User['progress']>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fix: Properly retrieve and parse the token
    const token = localStorage.getItem('hindi-auth-token');
    if (token) {
      try {
        // Parse the token directly without splitting
        const userData = JSON.parse(atob(token));
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse auth token:", error);
        // Clear invalid token
        localStorage.removeItem('hindi-auth-token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email === 'test@example.com' && password === 'password123') {
        // Create user data
        const userData = { 
          id: '1', 
          name: 'Test User', 
          email, 
          progress: { 
            xp: 100, 
            level: 1, 
            completedLessons: [], 
            streak: 0 
          } 
        };
        
        // Encode and store the token
        const token = btoa(JSON.stringify(userData));
        localStorage.setItem('hindi-auth-token', token);
        
        // Set user directly from userData object
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Create user data
      const userData = { 
        id: '2', 
        name, 
        email, 
        progress: { 
          xp: 0, 
          level: 1, 
          completedLessons: [], 
          streak: 0 
        } 
      };
      
      // Encode and store the token
      const token = btoa(JSON.stringify(userData));
      localStorage.setItem('hindi-auth-token', token);
      
      // Set user directly from userData object
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('hindi-auth-token');
    setUser(null);
  };

  const updateProgress = async (progress: Partial<User['progress']>): Promise<boolean> => {
    if (!user) return false;
    try {
      const updatedUser = { ...user, progress: { ...user.progress, ...progress } };
      
      // Encode and store the updated user data
      localStorage.setItem('hindi-auth-token', btoa(JSON.stringify(updatedUser)));
      
      // Update user state
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Update progress error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
