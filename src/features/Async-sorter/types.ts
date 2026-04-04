import { z } from 'zod';

export const asyncSorterBlockSchema = z.object({
  id: z.string(),
  code: z.string(),
  label: z.string(),
});
export const asyncSorterAnswerSchema = z.object({
  callStack: z.array(z.string()),
  microtasks: z.array(z.string()),
  macrotasks: z.array(z.string()),
  outputOrder: z.array(z.string()),
});
export interface AnswerColor {
  callStackBlock: ('green' | 'red')[];
  microBlock: ('green' | 'red')[];
  macroBlock: ('green' | 'red')[];
}
export interface DropIndicator {
  zone: Zone;
  insertBefore: number;
}
export type Zone = 'Call Stack' | 'Microtasks' | 'Macrotasks';
export type FocusZone = Zone | 'source';
export interface DropZones {
  zone: Zone;
  title: string;
  items: AsyncSorterBlock[];
  answerColors: ('green' | 'red')[] | undefined;
}
export type AsyncSorterBlock = z.infer<typeof asyncSorterBlockSchema>;
export type AsyncSorterAnswer = z.infer<typeof asyncSorterAnswerSchema>;
