export interface User {
  name: string;
  grade: string;
  section: string;
}

export interface GameState {
  currentLevel: number;
  score: number;
  totalQuestions: number;
  completedLevels: number[];
  isGameComplete: boolean;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  solution?: string[];
  explanation?: string;
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
}

export interface Level {
  id: number;
  name: string;
  description: string;
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
  questions: Question[];
}