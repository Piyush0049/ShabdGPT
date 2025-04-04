export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  audioUrl?: string;
}

export interface Challenge {
  id: number;
  type: 'word' | 'sentence' | 'paragraph';
  hindi: string;
  english: string;
  pronunciation?: string;
}

export interface LearningLevel {
  id: number;
  name: string;
  description: string;
  challenges: Challenge[];
  isUnlocked: boolean;
  isCompleted: boolean;
}