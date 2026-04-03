import type {
  WidgetView,
  AsyncSorterConfig,
} from '@/shared/models/widgetModel';

export const asyncSorterWidgetMock: WidgetView<AsyncSorterConfig> = {
  widgetId: 'widget_async_sorter',
  type: 'asyncSorter',
  topic: 'js',
  config: {
    tasks: [
      {
        id: 1,
        codeSnippet: [
          "console.log('1');",
          "setTimeout(() => console.log('2'), 0);",
          "Promise.resolve().then(() => console.log('3'));",
          "console.log('4');",
        ],
        blocks: [
          { id: 'b1', code: "console.log('1')", label: '1' },
          { id: 'b2', code: 'setTimeout callback', label: '2' },
          { id: 'b3', code: 'Promise.then callback', label: '3' },
          { id: 'b4', code: "console.log('4')", label: '4' },
        ],
        answer: {
          callStack: ['1', '4'],
          microtasks: ['3'],
          macrotasks: ['2'],
          outputOrder: ['1', '4', '3', '2'],
        },
      },
      {
        id: 2,
        codeSnippet: [
          "(async () => {console.log('1');",
          'await Promise.resolve();',
          "console.log('2');",
          '})();',
          "console.log('3');",
        ],
        blocks: [
          { id: 'b1', code: "console.log('1')", label: '1' },
          { id: 'b2', code: 'async/await continuation', label: '2' },
          { id: 'b3', code: "console.log('3')", label: '3' },
        ],
        answer: {
          callStack: ['1', '3'],
          microtasks: ['2'],
          macrotasks: [],
          outputOrder: ['1', '3', '2'],
        },
      },
      {
        id: 3,
        codeSnippet: [
          "console.log('1');",
          "Promise.resolve().then(() => console.log('2')).then(() => console.log('3'));",
          "setTimeout(() => console.log('4'), 0);",
        ],
        blocks: [
          { id: 'b1', code: "console.log('1')", label: '1' },
          { id: 'b2', code: 'Promise.then callback', label: '2' },
          { id: 'b3', code: 'Promise.then callback (chain)', label: '3' },
          { id: 'b4', code: 'setTimeout callback', label: '4' },
        ],
        answer: {
          callStack: ['1'],
          microtasks: ['2', '3'],
          macrotasks: ['4'],
          outputOrder: ['1', '2', '3', '4'],
        },
      },
      {
        id: 4,
        codeSnippet: [
          "console.log('1');",
          "queueMicrotask(() => console.log('2'));",
          "console.log('3');",
          "setTimeout(() => console.log('4'), 0);",
        ],
        blocks: [
          { id: 'b1', code: "console.log('1')", label: '1' },
          { id: 'b2', code: 'queueMicrotask callback', label: '2' },
          { id: 'b3', code: "console.log('3')", label: '3' },
          { id: 'b4', code: 'setTimeout callback', label: '4' },
        ],
        answer: {
          callStack: ['1', '3'],
          microtasks: ['2'],
          macrotasks: ['4'],
          outputOrder: ['1', '3', '2', '4'],
        },
      },

      {
        id: 5,
        codeSnippet: [
          "console.log('1');",
          "Promise.resolve().then(() => {console.log('2');",
          "  setTimeout(() => console.log('3'), 0);",
          '});',
          "console.log('4');",
        ],
        blocks: [
          { id: 'b1', code: "console.log('1')", label: '1' },
          { id: 'b2', code: 'Promise.then callback', label: '2' },
          { id: 'b3', code: 'setTimeout callback', label: '3' },
          { id: 'b4', code: "console.log('4')", label: '4' },
        ],
        answer: {
          callStack: ['1', '4'],
          microtasks: ['2'],
          macrotasks: ['3'],
          outputOrder: ['1', '4', '2', '3'],
        },
      },
    ],
  },
};
