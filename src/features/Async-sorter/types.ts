import { z } from 'zod';
export const asyncSorterBlockArraySchema = z.array(
  z.object({
    id: z.string(),
    code: z.string(),
    label: z.string(),
  })
);
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
export const asyncSorterTaskSchema = z.object({
  id: z.number(),
  type: z.string(),
  codeSnippet: z.array(z.string()),
  blocks: asyncSorterBlockArraySchema,
  answer: asyncSorterAnswerSchema,
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
export interface DropZones {
  zone: Zone;
  title: string;
  items: AsyncSorterBlock[];
  answerColors: ('green' | 'red')[] | undefined;
}
export const asyncSorterTasksArraySchema = z.array(asyncSorterTaskSchema);
export type AsyncSorterTask = z.infer<typeof asyncSorterTaskSchema>;
export type AsyncSorterBlock = z.infer<typeof asyncSorterBlockSchema>;
export type AsyncSorterTasksArray = z.infer<typeof asyncSorterTasksArraySchema>;
export type AsyncSorterAnswer = z.infer<typeof asyncSorterAnswerSchema>;
export type DropZone = 'Call Stack' | 'Microtasks' | 'Macrotasks';
