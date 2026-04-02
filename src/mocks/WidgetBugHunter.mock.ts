import type { WidgetView, BugHunterConfig } from '@models/widgetModel.ts';

const htmlBugHunterWidget: WidgetView<BugHunterConfig> = {
  widgetId: 'widget_bug_hunter_html',
  type: 'bugHunter',
  topic: 'html',
  config: {
    quizName: 'HTML Bug Hunter',
    questions: [
      {
        code: '<XDX src="photo.jpg" alt="A photo">',
        answers: [['image', 'pic', 'img', 'photo']],
      },
      {
        code:
          '<a XDX="https://example.com" XDX="_blank">\n' +
          '  Click here\n' +
          '</a>',
        answers: [
          ['src', 'link', 'href', 'url'],
          ['window', 'target', 'open', 'rel'],
        ],
      },
      {
        code: '<p>First line<XDX>Second line</p>',
        answers: [['lb', 'nl', 'break', 'br']],
      },
      {
        code: '<XDX type="XDX" placeholder="Enter email">',
        answers: [
          ['entry', 'input', 'field', 'textbox'],
          ['mail', 'string', 'text', 'email'],
        ],
      },
      {
        code:
          '<XDX action="/submit" XDX="post">\n' +
          '  <input type="text" XDX="username">\n' +
          '  <button>Send</button>\n' +
          '</form>',
        answers: [
          ['form', 'action', 'submit', 'data'],
          ['type', 'method', 'action', 'mode'],
          ['id', 'name', 'label', 'value'],
        ],
      },
    ],
    rightAnswers: ['2', '21', '3', '13', '011'],
  },
};

const cssBugHunterWidget: WidgetView<BugHunterConfig> = {
  widgetId: 'widget_bug_hunter_css',
  type: 'bugHunter',
  topic: 'css',
  config: {
    quizName: 'CSS Bug Hunter',
    questions: [
      {
        code:
          '.container {\n' +
          '  display: XDX;\n' +
          '  justify-content: XDX;\n' +
          '}',
        answers: [
          ['block', 'flex', 'inline', 'grid'],
          ['middle', 'start', 'center', 'auto'],
        ],
      },
      {
        code:
          '.box {\n' +
          '  XDX: 10px;\n' +
          '  XDX: 20px;\n' +
          '  XDX: 1px solid black;\n' +
          '}',
        answers: [
          ['space', 'margin', 'gap', 'offset'],
          ['indent', 'spacing', 'padding', 'inner'],
          ['border', 'outline', 'edge', 'line'],
        ],
      },
      {
        code: '.title {\n' + '  XDX: #333;\n' + '  XDX: #f0f0f0;\n' + '}',
        answers: [
          ['font-color', 'text', 'color', 'foreground'],
          ['bg', 'fill', 'background', 'background-color'],
        ],
      },
      {
        code:
          '.modal {\n' +
          '  XDX: fixed;\n' +
          '  top: 0;\n' +
          '  left: 0;\n' +
          '  width: 100%;\n' +
          '}',
        answers: [['place', 'display', 'layout', 'position']],
      },
      {
        code: '.grid {\n' + '  display: XDX;\n' + '  XDX: 1fr 1fr 1fr;\n' + '}',
        answers: [
          ['flex', 'grid', 'table', 'block'],
          ['columns', 'grid-template-columns', 'grid-columns', 'template'],
        ],
      },
    ],
    rightAnswers: ['12', '120', '23', '3', '11'],
  },
};

const jsBugHunterWidget: WidgetView<BugHunterConfig> = {
  widgetId: 'widget_bug_hunter_js',
  type: 'bugHunter',
  topic: 'js',
  config: {
    quizName: 'JavaScript Bug Hunter',
    questions: [
      {
        code: 'XDX(value){\n' + '    return value * value\n' + '}',
        answers: [['fun', 'bun', 'def', 'function', 'const']],
      },
      {
        code: 'XDX(value){\n' + '    XDX value * 10\n' + '}',
        answers: [
          ['fun', 'bun', 'def', 'function', 'const'],
          ['give', 'return', 'send'],
        ],
      },
      {
        code:
          'const arr = [1, 2, 3, 4, 5];\n' +
          'const filtered = arr.XDX(n => n > 3);\n' +
          'console.XDX(filtered);',
        answers: [
          ['map', 'find', 'filter', 'reduce'],
          ['log', 'warn', 'print', 'write', 'out'],
        ],
      },
      {
        code:
          'XDX function getData() {\n' +
          '  XDX {\n' +
          "    const res = XDX fetch('/api');\n" +
          '    return res.json();\n' +
          '  } XDX (err) {\n' +
          '    console.log(err);\n' +
          '  }\n' +
          '}',
        answers: [
          ['static', 'sync', 'async', 'defer'],
          ['do', 'try', 'run', 'begin'],
          ['get', 'then', 'await', 'wait'],
          ['error', 'handle', 'except', 'catch'],
        ],
      },
      {
        code:
          'XDX Animal {\n' +
          '  XDX(name) {\n' +
          '    XDX.name = name;\n' +
          '  }\n' +
          '}',
        answers: [
          ['struct', 'class', 'def', 'function'],
          ['create', 'new', 'init', 'constructor', 'setup'],
          ['it', 'self', 'this', 'that'],
        ],
      },
    ],
    rightAnswers: ['3', '31', '20', '2123', '132'],
  },
};

const tsBugHunterWidget: WidgetView<BugHunterConfig> = {
  widgetId: 'widget_bug_hunter_ts',
  type: 'bugHunter',
  topic: 'ts',
  config: {
    quizName: 'TypeScript Bug Hunter',
    questions: [
      {
        code: "let name: XDX = 'Alice';",
        answers: [['text', 'str', 'String', 'string']],
      },
      {
        code:
          'function add(a: XDX, b: XDX): number {\n' +
          '  return a + b;\n' +
          '}',
        answers: [
          ['int', 'num', 'number', 'float'],
          ['int', 'float', 'num', 'number'],
        ],
      },
      {
        code: 'XDX User {\n' + '  name: XDX;\n' + '  age: XDX;\n' + '}',
        answers: [
          ['interface', 'class', 'struct', 'type'],
          ['text', 'string', 'str', 'String'],
          ['number', 'int', 'num', 'Number'],
        ],
      },
      {
        code:
          'const nums: XDX[] = [1, 2, 3];\n' +
          "const names: Array<XDX> = ['a', 'b'];",
        answers: [
          ['number', 'int', 'num', 'Number'],
          ['str', 'String', 'string', 'text'],
        ],
      },
      {
        code:
          'XDX Direction {\n' +
          '  Up,\n' +
          '  Down,\n' +
          '  Left,\n' +
          '  XDX,\n' +
          '}',
        answers: [
          ['type', 'class', 'const', 'enum'],
          ['Right', 'Forward', 'Ahead', 'East'],
        ],
      },
    ],
    rightAnswers: ['3', '23', '010', '02', '30'],
  },
};

const gitHubBugHunterWidget: WidgetView<BugHunterConfig> = {
  widgetId: 'widget_bug_hunter_github',
  type: 'bugHunter',
  topic: 'github',
  config: {
    quizName: 'GitHub Bug Hunter',
    questions: [
      {
        code: 'git XDX .',
        answers: [['stage', 'save', 'add', 'include']],
      },
      {
        code: 'git XDX -m "Fix login bug"',
        answers: [['save', 'commit', 'push', 'store']],
      },
      {
        code:
          'git add .\n' +
          'git commit -m "Add feature"\n' +
          'git XDX origin main',
        answers: [['upload', 'send', 'deploy', 'push']],
      },
      {
        code: 'git XDX origin develop',
        answers: [['pull', 'fetch', 'download', 'sync']],
      },
      {
        code: 'git XDX https://github.com/user/repo.git',
        answers: [['copy', 'clone', 'fork', 'download']],
      },
    ],
    rightAnswers: ['2', '1', '3', '0', '1'],
  },
};

export const bugHunterWidgetMocks: Record<
  string,
  WidgetView<BugHunterConfig>
> = {
  widget_quiz_html: htmlBugHunterWidget,
  widget_quiz_css: cssBugHunterWidget,
  widget_quiz_js: jsBugHunterWidget,
  widget_quiz_ts: tsBugHunterWidget,
  widget_quiz_github: gitHubBugHunterWidget,
};
