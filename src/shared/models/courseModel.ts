export interface Course {
  id: string;
  title: string;
  description?: string;
  iconUrl?: string;
  tag: 'js' | 'ts' | 'css' | 'html';
}
