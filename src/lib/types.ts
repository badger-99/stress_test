export interface Question {
  id: string;
  text: string;
  category: string;
  reverse_score: boolean;
}

export interface StressTest {
  questions: Record<string, Question>;
}

export interface Answer {
  id: string;
  value: number;
  category: string;
}