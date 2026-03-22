export type MeaningMatcherType =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'github';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Pair {
  id: number;
  left: string;
  right: string;
}

export interface MeaningMatcherProps {
  title: string;
  pairs: Pair[];
  onSubmit?: (score: number, total: number) => void;
}
