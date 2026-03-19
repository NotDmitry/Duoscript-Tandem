export type MeaningMatcherType =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'github';

export interface Pair {
  id: number;
  left: string;
  right: string;
}

export interface MeaningMatcherProps {
  title: string;
  pairs: Pair[];
}
