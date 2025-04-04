
// Simple authentication utility functions
import jwt from 'jsonwebtoken';

// In a real app, this would be stored in a secure environment variable
const JWT_SECRET = 'hindi-learning-app-secret';

export interface User {
  id: string;
  name: string;
  email: string;
  progress: {
    level: number;
    xp: number;
    streak: number;
    completedLessons: string[];
  };
}

// Mock user database for demo
const mockUsers: Record<string, User> = {
  'user1@example.com': {
    id: 'user1',
    name: 'Demo User',
    email: 'user1@example.com',
    progress: {
      level: 1,
      xp: 0,
      streak: 0,
      completedLessons: [],
    },
  },
};

export const loginUser = (email: string, password: string): { token: string } | null => {
  // In a real app, you would verify password here
  const user = mockUsers[email];
  
  if (!user) return null;
  
  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  return { token };
};

export const registerUser = (name: string, email: string, password: string): { token: string } | null => {
  // Check if user already exists
  if (mockUsers[email]) return null;
  
  // Create new user
  const newUser: User = {
    id: `user${Object.keys(mockUsers).length + 1}`,
    name,
    email,
    progress: {
      level: 1,
      xp: 0,
      streak: 0,
      completedLessons: [],
    },
  };
  
  // In a real app, you would hash the password and save to a database
  mockUsers[email] = newUser;
  
  // Generate JWT token
  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  return { token };
};

export const getUserFromToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, email: string };
    const user = mockUsers[decoded.email];
    return user || null;
  } catch (error) {
    return null;
  }
};

export const updateUserProgress = (userId: string, progress: Partial<User['progress']>): User | null => {
  const userEntry = Object.entries(mockUsers).find(([_, user]) => user.id === userId);
  
  if (!userEntry) return null;
  
  const [email, user] = userEntry;
  mockUsers[email] = {
    ...user,
    progress: {
      ...user.progress,
      ...progress,
    },
  };
  
  return mockUsers[email];
};
