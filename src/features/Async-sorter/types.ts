export interface AsyncSorterTask {
  id: number;
  type: string;
  codeSnippet: string[];
  blocks: AsyncSorterBlock[];
  answer: AsyncSorterAnswer;
}
export interface AsyncSorterBlock {
  id: string;
  code: string;
  label: string;
}
export interface AsyncSorterAnswer {
  callStack: string[];
  microtasks: string[];
  macrotasks: string[];
  outputOrder: string[];
}
