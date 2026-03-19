import { z } from 'zod';
export const asyncSorterBlockSchema = z.array(
  z.object({
    id: z.string(),
    code: z.string(),
    label: z.string(),
  })
);
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
  blocks: asyncSorterBlockSchema,
  answer: asyncSorterAnswerSchema,
});
export type AsyncSorterTask = z.infer<typeof asyncSorterTaskSchema>;
