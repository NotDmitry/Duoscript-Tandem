import type {
  BugHunterQuiz,
  QuizTask,
} from '@/features/WidgetBugHunter/WidgetBugHunter.types.ts';

const htmlMockQuestions: QuizTask[] = [
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
  {
    code: '<XDX XDX="UTF-8">',
    answers: [
      ['info', 'meta', 'data', 'config'],
      ['encoding', 'char', 'charset', 'encode'],
    ],
  },
  {
    code: '<p>Section one</p>\n' + '<XDX>\n' + '<p>Section two</p>',
    answers: [['line', 'hr', 'separator', 'divide']],
  },
  {
    code: '<XDX XDX="app.js"></script>',
    answers: [
      ['code', 'js', 'script', 'program'],
      ['href', 'link', 'file', 'src'],
    ],
  },
  {
    code: '<link XDX="stylesheet" XDX="styles.css">',
    answers: [
      ['type', 'rel', 'kind', 'role'],
      ['href', 'src', 'link', 'url', 'file'],
    ],
  },
  {
    code: '<XDX>\n' + '  <XDX>Item 1</li>\n' + '  <li>Item 2</li>\n' + '</ul>',
    answers: [
      ['ol', 'ul', 'list', 'dl'],
      ['item', 'li', 'entry', 'el'],
    ],
  },
  {
    code:
      '<table>\n' +
      '  <XDX>\n' +
      '    <XDX>Header</th>\n' +
      '  </tr>\n' +
      '</table>',
    answers: [
      ['row', 'tr', 'line', 'td'],
      ['td', 'header', 'th', 'hd'],
    ],
  },
  {
    code: '<!XDX html>\n' + '<html lang="en">',
    answers: [['HTML5', 'html', 'DOCTYPE', 'document']],
  },
  {
    code:
      '<XDX>\n' +
      '  <XDX>\n' +
      '    <a href="/">Home</a>\n' +
      '  </nav>\n' +
      '</header>',
    answers: [
      ['heading', 'header', 'top', 'head'],
      ['menu', 'links', 'nav', 'navigation'],
    ],
  },
  {
    code: '<img XDX="photo.jpg" XDX="A beautiful photo">',
    answers: [
      ['link', 'src', 'href', 'url'],
      ['desc', 'label', 'alt', 'title', 'text'],
    ],
  },
  {
    code:
      '<XDX XDX XDX>\n' +
      '  <source src="movie.mp4" type="video/mp4">\n' +
      '</video>',
    answers: [
      ['media', 'video', 'player', 'film'],
      ['auto', 'start', 'autoplay', 'play'],
      ['buttons', 'controls', 'panel', 'ui'],
    ],
  },
  {
    code: '<XDX id="myCanvas" XDX="300" height="200">\n' + '</canvas>',
    answers: [
      ['svg', 'draw', 'canvas', 'board'],
      ['width', 'size', 'w', 'length'],
    ],
  },
  {
    code:
      '<header>...</header>\n' +
      '<XDX>\n' +
      '  <p>Main content here</p>\n' +
      '</main>',
    answers: [['content', 'section', 'main', 'body']],
  },
  {
    code:
      '<XDX>\n' +
      '  <h2>News Title</h2>\n' +
      '  <XDX>\n' +
      '    <p>Content</p>\n' +
      '  </section>\n' +
      '</article>',
    answers: [
      ['article', 'post', 'div', 'content'],
      ['part', 'div', 'block', 'section'],
    ],
  },
  {
    code:
      '<!DOCTYPE XDX>\n' +
      '<html XDX="en">\n' +
      '  <XDX>\n' +
      '    <title>Page</title>\n' +
      '  </head>\n' +
      '</html>',
    answers: [
      ['html', 'html5', 'page', 'document'],
      ['language', 'locale', 'lang', 'l'],
      ['head', 'meta', 'top', 'info'],
    ],
  },
  {
    code: '<XDX XDX="5" cols="30">\n' + '  Enter text here\n' + '</textarea>',
    answers: [
      ['input', 'textarea', 'textbox', 'field'],
      ['rows', 'lines', 'height', 'size'],
    ],
  },
  {
    code: '<p>This is <XDX>very important</strong> text.</p>',
    answers: [['bold', 'b', 'strong', 'em', 'important']],
  },
  {
    code:
      '<XDX name="color">\n' +
      '  <XDX value="red">Red</option>\n' +
      '  <option value="blue">Blue</option>\n' +
      '</select>',
    answers: [
      ['dropdown', 'list', 'select', 'menu'],
      ['option', 'item', 'choice', 'entry'],
    ],
  },
  {
    code:
      '<XDX XDX>\n' +
      '  <source src="song.mp3" type="audio/mpeg">\n' +
      '</audio>',
    answers: [
      ['sound', 'audio', 'music', 'media'],
      ['play', 'buttons', 'ui', 'controls'],
    ],
  },
  {
    code: '<XDX>\n' + '  <p>&copy; 2024 My Website</p>\n' + '</footer>',
    answers: [['foot', 'bottom', 'end', 'footer']],
  },
  {
    code:
      '<XDX XDX="https://example.com" XDX="600" height="400">\n' + '</iframe>',
    answers: [
      ['frame', 'embed', 'iframe', 'window'],
      ['href', 'link', 'url', 'src'],
      ['length', 'size', 'width', 'w'],
    ],
  },
  {
    code: '<XDX XDX="submit">Send Form</button>',
    answers: [
      ['submit', 'action', 'btn', 'button'],
      ['type', 'kind', 'action', 'role'],
    ],
  },
  {
    code:
      '<!DOCTYPE html>\n' +
      '<XDX lang="en">\n' +
      '  <head>\n' +
      '    <XDX charset="UTF-8">\n' +
      '    <XDX>My Page</title>\n' +
      '  </head>\n' +
      '  <XDX>\n' +
      '    <p>Hello!</p>\n' +
      '  </body>\n' +
      '</html>',
    answers: [
      ['page', 'html', 'document', 'root'],
      ['info', 'charset', 'meta', 'data'],
      ['name', 'heading', 'title', 'label'],
      ['main', 'content', 'body', 'page'],
    ],
  },
  {
    code:
      '<XDX>\n' +
      '  <XDX>Click to expand</summary>\n' +
      '  <p>Hidden content here</p>\n' +
      '</details>',
    answers: [
      ['expand', 'toggle', 'details', 'collapse'],
      ['title', 'header', 'label', 'summary'],
    ],
  },
  {
    code: '<XDX XDX="70" max="100">70%</progress>',
    answers: [
      ['bar', 'meter', 'loading', 'progress'],
      ['value', 'amount', 'level', 'current'],
    ],
  },
  {
    code:
      '<XDX>\n' +
      '  <XDX srcset="photo.webp" type="image/webp">\n' +
      '  <XDX src="photo.jpg" alt="Photo">\n' +
      '</picture>',
    answers: [
      ['image', 'picture', 'figure', 'photo'],
      ['src', 'file', 'source', 'media'],
      ['image', 'photo', 'img', 'pic'],
    ],
  },
];

const cssMockQuestions: QuizTask[] = [
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
  {
    code:
      'body {\n' +
      '  XDX: 16px;\n' +
      '  XDX: 1.5;\n' +
      '  XDX: sans-serif;\n' +
      '}',
    answers: [
      ['text-size', 'size', 'font-size', 'font'],
      ['spacing', 'line-height', 'height', 'leading'],
      ['font-family', 'typeface', 'font-type', 'font-face'],
    ],
  },
  {
    code:
      '.button {\n' +
      '  XDX: all 0.3s ease;\n' +
      '}\n' +
      '.button:XDX {\n' +
      '  opacity: 0.8;\n' +
      '}',
    answers: [
      ['change', 'transition', 'animation', 'transform'],
      ['hover', 'under', 'fly', 'over', 'mouse'],
    ],
  },
  {
    code:
      '@XDX (max-width: 768px) {\n' +
      '  .sidebar {\n' +
      '    XDX: none;\n' +
      '  }\n' +
      '}',
    answers: [
      ['responsive', 'media', 'screen', 'query'],
      ['render', 'display', 'visibility', 'show'],
    ],
  },
  {
    code:
      '.nav {\n' +
      '  XDX: flex;\n' +
      '  XDX: row;\n' +
      '  XDX: center;\n' +
      '  XDX: 10px;\n' +
      '}',
    answers: [
      ['type', 'display', 'layout', 'mode'],
      ['flex-direction', 'direction', 'align', 'flow'],
      ['text-align', 'place', 'align-items', 'align-self'],
      ['space', 'gutter', 'margin', 'gap'],
    ],
  },
  {
    code:
      '.card {\n' +
      '  XDX: relative;\n' +
      '  XDX: scale(1.05);\n' +
      '  XDX: 0 4px 6px rgba(0,0,0,0.1);\n' +
      '}',
    answers: [
      ['position', 'display', 'place', 'layout'],
      ['resize', 'change', 'transform', 'scale'],
      ['box-shadow', 'shadow', 'drop-shadow', 'shade'],
    ],
  },
];

const jsMockQuestions: QuizTask[] = [
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
  {
    code: "XDX name = 'Alice';\n" + 'console.log(name);',
    answers: [['def', 'let', 'var', 'set']],
  },
  {
    code: 'const greet = (name) XDX {\n' + '  XDX `Hello, ${name}!`;\n' + '};',
    answers: [
      ['=>', '->', ':', '='],
      ['give', 'send', 'return', 'output'],
    ],
  },
  {
    code: 'const x = 42;\n' + 'console.log(XDX x);',
    answers: [['instanceof', 'type', 'kindof', 'typeof']],
  },
  {
    code: 'XDX (let i = 0; i < 10; i++) {\n' + '  console.XDX(i);\n' + '}',
    answers: [
      ['while', 'loop', 'for', 'each'],
      ['write', 'log', 'print', 'out'],
    ],
  },
  {
    code: 'XDX count = 0;\n' + 'XDX (count < 5) {\n' + '  count XDX 1;\n' + '}',
    answers: [
      ['var', 'const', 'def', 'let'],
      ['for', 'if', 'while', 'do'],
      ['*=', '-=', '+=', '/='],
    ],
  },
  {
    code:
      "const fruits = ['apple'];\n" +
      "fruits.XDX('banana');\n" +
      'console.XDX(fruits);',
    answers: [
      ['add', 'push', 'insert', 'append', 'put'],
      ['print', 'write', 'out', 'log'],
    ],
  },
  {
    code:
      'const age = 20;\n' + "const status = age >= 18 XDX 'adult' XDX 'minor';",
    answers: [
      ['?', '&&', '||', 'if'],
      ['|', '&', ':', 'else', '??'],
    ],
  },
  {
    code:
      'XDX (color) {\n' +
      "  XDX 'red':\n" +
      "    console.log('Stop');\n" +
      '    XDX;\n' +
      '}',
    answers: [
      ['check', 'match', 'if', 'switch'],
      ['case', 'when', 'is', 'match'],
      ['stop', 'end', 'break', 'exit'],
    ],
  },
  {
    code:
      'const promise = XDX Promise((resolve) => {\n' +
      "  resolve('done');\n" +
      '});\n' +
      'promise.XDX(value => console.log(value));',
    answers: [
      ['create', 'make', 'new', 'init'],
      ['then', 'next', 'after', 'done', 'on'],
    ],
  },
  {
    code: 'XDX(() => {\n' + "  console.XDX('Hello!');\n" + '}, 1000);',
    answers: [
      ['wait', 'setTimeout', 'setInterval', 'delay'],
      ['write', 'say', 'print', 'log'],
    ],
  },
  {
    code:
      "const obj = { key: 'value' };\n" +
      'const str = JSON.XDX(obj);\n' +
      'const parsed = JSON.XDX(str);',
    answers: [
      ['encode', 'stringify', 'toString', 'serialize'],
      ['decode', 'toObject', 'parse', 'deserialize'],
    ],
  },
  {
    code:
      "const str = 'Hello World';\n" +
      'const upper = str.XDX();\n' +
      "const words = str.XDX(' ');",
    answers: [
      ['upper', 'toUpperCase', 'capitalize', 'toUpper'],
      ['divide', 'cut', 'split', 'separate', 'break'],
    ],
  },
  {
    code: 'const max = Math.XDX(10, 20, 5);\n' + 'console.log(max);',
    answers: [['max', 'biggest', 'top', 'highest']],
  },
  {
    code:
      'XDX items = [1, 2, 3];\n' +
      'items.XDX((item) => {\n' +
      '  console.XDX(item);\n' +
      '});',
    answers: [
      ['def', 'const', 'let', 'var'],
      ['loop', 'iterate', 'each', 'forEach'],
      ['log', 'print', 'write', 'say', 'out'],
    ],
  },
  {
    code:
      'XDX {\n' +
      "  JSON.parse('invalid');\n" +
      '} XDX (e) {\n' +
      '  console.log(e);\n' +
      '} XDX {\n' +
      "  console.log('done');\n" +
      '}',
    answers: [
      ['do', 'start', 'try', 'begin'],
      ['except', 'handle', 'catch', 'error'],
      ['finally', 'end', 'always', 'after'],
    ],
  },
  {
    code: "XDX { useState } from 'react';\n" + 'XDX default App;',
    answers: [
      ['require', 'include', 'import', 'load'],
      ['send', 'export', 'return', 'provide'],
    ],
  },
  {
    code:
      "function greet(name XDX 'Guest') {\n" +
      "  XDX 'Hello, ' + name;\n" +
      '}',
    answers: [
      ['||', '??', '=', ':'],
      ['give', 'return', 'send', 'output'],
    ],
  },
  {
    code:
      "const colors = ['red', 'green', 'blue'];\n" +
      'XDX (const color XDX colors) {\n' +
      '  console.log(color);\n' +
      '}',
    answers: [
      ['for', 'while', 'each', 'loop'],
      ['in', 'from', 'of', 'at'],
    ],
  },
  {
    code:
      'const nums = [10, 20, 30, 40];\n' +
      'const found = nums.XDX(n => n > 25);\n' +
      'const has20 = nums.XDX(20);',
    answers: [
      ['search', 'find', 'get', 'locate'],
      ['has', 'contains', 'includes', 'exists', 'count'],
    ],
  },
  {
    code:
      'const nums = [1, 2, 3, 4];\n' +
      'const sum = nums.XDX((acc, cur) XDX acc + cur, XDX);',
    answers: [
      ['fold', 'combine', 'reduce', 'sum'],
      ['=>', '->', ':', '='],
      ['null', '1', '[]', '0', '""'],
    ],
  },
  {
    code:
      "document.XDX('click', XDX(event) {\n" +
      '  console.log(event);\n' +
      '});',
    answers: [
      ['on', 'listen', 'addEventListener', 'bind', 'attach'],
      ['handler', 'callback', 'func', 'function'],
    ],
  },
  {
    code: 'const date = new Date();\n' + 'console.log(date XDX Date);',
    answers: [['typeof', 'instanceof', 'is', 'extends']],
  },
  {
    code:
      'const map = XDX Map();\n' +
      "map.XDX('key', 'value');\n" +
      "console.log(map.XDX('key'));",
    answers: [
      ['create', 'new', 'init', 'make'],
      ['add', 'put', 'set', 'insert'],
      ['read', 'get', 'find', 'fetch'],
    ],
  },
  {
    code:
      "XDX { name, age } = { name: 'Bob', age: 30 };\n" +
      'console.XDX(name, age);',
    answers: [
      ['let', 'const', 'var', 'def', 'set'],
      ['print', 'write', 'log', 'show'],
    ],
  },
  {
    code:
      '(XDX () => {\n' +
      '  XDX {\n' +
      "    const data = XDX fetch('/api/data');\n" +
      '    console.log(data);\n' +
      '  } XDX (err) {\n' +
      '    console.error(err);\n' +
      '  }\n' +
      '})();',
    answers: [
      ['sync', 'async', 'defer', 'lazy'],
      ['try', 'do', 'begin', 'run'],
      ['get', 'await', 'wait', 'then'],
      ['handle', 'except', 'catch', 'error'],
    ],
  },
  {
    code:
      'const obj = { a: 1, b: 2 };\n' + 'XDX obj.b;\n' + 'console.log(obj);',
    answers: [['remove', 'erase', 'unset', 'delete']],
  },
];

const tsMockQuestions: QuizTask[] = [
  {
    code: "let name: XDX = 'Alice';",
    answers: [['text', 'str', 'String', 'string']],
  },
  {
    code:
      'function add(a: XDX, b: XDX): number {\n' + '  return a + b;\n' + '}',
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
  {
    code:
      'let value: string XDX number;\n' +
      "let status: 'active' XDX 'inactive';",
    answers: [
      ['|', '&', '||', 'or'],
      ['or', '|', '&', '||'],
    ],
  },
  {
    code: 'XDX ID = string | number;',
    answers: [['alias', 'type', 'typedef', 'define']],
  },
  {
    code: 'function identity<XDX>(arg: XDX): XDX {\n' + '  return arg;\n' + '}',
    answers: [
      ['T', 'G', 'A', 'V'],
      ['G', 'V', 'T', 'A'],
      ['A', 'T', 'G', 'V'],
    ],
  },
  {
    code:
      'class User {\n' + '  XDX name: string;\n' + '  XDX age: number;\n' + '}',
    answers: [
      ['open', 'public', 'exposed', 'visible'],
      ['private', 'hidden', 'closed', 'secret'],
    ],
  },
  {
    code: 'XDX Config {\n' + '  XDX apiUrl: string;\n' + '}',
    answers: [
      ['type', 'interface', 'class', 'struct'],
      ['const', 'final', 'readonly', 'fixed'],
    ],
  },
  {
    code:
      'interface Product {\n' +
      '  name: string;\n' +
      '  description XDX string;\n' +
      '  price: XDX;\n' +
      '}',
    answers: [
      ['?:', '|', '??:', ':'],
      ['int', 'number', 'float', 'decimal'],
    ],
  },
  {
    code: "const input = document.getElementById('name') XDX HTMLInputElement;",
    answers: [['to', 'like', 'is', 'as']],
  },
  {
    code: "let pair: [XDX, XDX] = ['hello', 42];",
    answers: [
      ['string', 'text', 'str', 'String'],
      ['int', 'Number', 'num', 'number'],
    ],
  },
  {
    code: 'XDX class Shape {\n' + '  XDX getArea(): XDX;\n' + '}',
    answers: [
      ['virtual', 'base', 'abstract', 'parent'],
      ['virtual', 'abstract', 'override', 'public'],
      ['number', 'int', 'float', 'num'],
    ],
  },
  {
    code: 'type OptionalUser = XDX<User>;\n' + 'type FullUser = XDX<User>;',
    answers: [
      ['Maybe', 'Partial', 'Optional', 'Some'],
      ['Required', 'Full', 'Complete', 'Strict'],
    ],
  },
  {
    code:
      "type NameOnly = XDX<User, 'name'>;\n" + "type NoAge = XDX<User, 'age'>;",
    answers: [
      ['Select', 'Pick', 'Choose', 'Get'],
      ['Remove', 'Exclude', 'Omit', 'Drop'],
    ],
  },
  {
    code:
      'function throwError(msg: string): XDX {\n' +
      '  throw new Error(msg);\n' +
      '}',
    answers: [['void', 'null', 'undefined', 'never']],
  },
  {
    code: "let a: XDX = 'anything';\n" + 'let b: XDX = fetchData();',
    answers: [
      ['any', 'dynamic', 'object', 'var'],
      ['mixed', 'unknown', 'dynamic', 'any'],
    ],
  },
  {
    code:
      'XDX Draggable {\n' +
      '  drag(): void;\n' +
      '}\n' +
      'XDX Resizable {\n' +
      '  resize(): void;\n' +
      '}\n' +
      'type UIElement = Draggable XDX Resizable;',
    answers: [
      ['type', 'interface', 'class', 'struct'],
      ['class', 'interface', 'type', 'struct'],
      ['|', '&&', '+', '&'],
    ],
  },
  {
    code: 'type Scores = XDX<string, XDX>;',
    answers: [
      ['Map', 'Hash', 'Dict', 'Record'],
      ['number', 'int', 'num', 'Number'],
    ],
  },
  {
    code:
      'function isString(val: unknown): val XDX XDX {\n' +
      "  return typeof val === 'string';\n" +
      '}',
    answers: [
      ['is', 'as', 'instanceof', 'typeof'],
      ['text', 'str', 'string', 'String'],
    ],
  },
  {
    code:
      'XDX Printable {\n' +
      '  print(): XDX;\n' +
      '}\n' +
      'class Doc XDX Printable {\n' +
      '  print(): void { }\n' +
      '}',
    answers: [
      ['interface', 'type', 'class', 'abstract'],
      ['void', 'nothing', 'null', 'undefined'],
      ['extends', 'implements', 'uses', 'with'],
    ],
  },
  {
    code: "const colors = ['red', 'green', 'blue'] as XDX;",
    answers: [['readonly', 'const', 'final', 'immutable']],
  },
  {
    code:
      'function getLength<T XDX { length: XDX }>(arg: T): number {\n' +
      '  return arg.length;\n' +
      '}',
    answers: [
      ['implements', 'extends', 'is', 'has'],
      ['int', 'any', 'number', 'num'],
    ],
  },
  {
    code:
      'XDX MathUtils {\n' +
      '  XDX function add(a: number, b: number): XDX {\n' +
      '    return a + b;\n' +
      '  }\n' +
      '}',
    answers: [
      ['module', 'namespace', 'package', 'scope'],
      ['export', 'public', 'expose', 'return'],
      ['int', 'number', 'num', 'float'],
    ],
  },
  {
    code: "type IsString<T> = T XDX string ? 'yes' : 'XDX';",
    answers: [
      ['is', 'instanceof', 'extends', 'typeof'],
      ['no', 'false', 'never', 'null'],
    ],
  },
  {
    code:
      'XDX Animal {\n' +
      '  XDX name: string;\n' +
      '\n' +
      '  XDX(name: string) {\n' +
      '    this.name = name;\n' +
      '  }\n' +
      '\n' +
      '  getName(): XDX {\n' +
      '    return this.name;\n' +
      '  }\n' +
      '}',
    answers: [
      ['type', 'interface', 'class', 'struct'],
      ['open', 'private', 'public', 'visible'],
      ['init', 'new', 'constructor', 'create'],
      ['text', 'string', 'str', 'String'],
    ],
  },
  {
    code:
      'type T = XDX<string | number | boolean, boolean>;\n' +
      'type U = XDX<string | number | boolean, string>;',
    answers: [
      ['Remove', 'Exclude', 'Filter', 'Without'],
      ['Get', 'Select', 'Only', 'Extract'],
    ],
  },
  {
    code:
      'XDX function fetchUser(id: number): XDX<User> {\n' +
      "  const res = XDX fetch('/api/user/' + id);\n" +
      '  return res.json();\n' +
      '}',
    answers: [
      ['defer', 'async', 'static', 'sync'],
      ['Future', 'Response', 'Result', 'Promise'],
      ['then', 'wait', 'await', 'get'],
    ],
  },
  {
    code:
      "type Color = 'red' | 'green' | 'blue';\n" +
      'const palette = {\n' +
      "  primary: 'red',\n" +
      "  secondary: 'blue',\n" +
      '} XDX XDX<string, Color>;',
    answers: [
      ['is', 'matches', 'satisfies', 'as'],
      ['Record', 'Map', 'Dict', 'Hash'],
    ],
  },
];

const gitHubMockQuestions: QuizTask[] = [
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
      'git add .\n' + 'git commit -m "Add feature"\n' + 'git XDX origin main',
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
  {
    code: 'git checkout main\n' + 'git XDX feature/login',
    answers: [['combine', 'join', 'merge', 'connect']],
  },
  {
    code: 'git XDX -b new-feature',
    answers: [['switch', 'move', 'branch', 'checkout']],
  },
  {
    code: 'git XDX\n' + 'git checkout main\n' + 'git stash pop',
    answers: [['hide', 'stash', 'save', 'store']],
  },
  {
    code: 'mkdir my-project\n' + 'cd my-project\n' + 'git XDX',
    answers: [['create', 'start', 'new', 'init']],
  },
  {
    code: 'git checkout feature\n' + 'git XDX main',
    answers: [['rebase', 'rewrite', 'replay', 'redo']],
  },
];

export const htmlBugHunterParams: BugHunterQuiz = {
  quizName: 'HTML Bug Hunter',
  tasks: htmlMockQuestions,
  rightAnswers: [
    '2',
    '21',
    '3',
    '13',
    '011',
    '12',
    '1',
    '23',
    '10',
    '11',
    '12',
    '2',
    '12',
    '12',
    '121',
    '20',
    '2',
    '03',
    '020',
    '10',
    '2',
    '20',
    '13',
    '3',
    '232',
    '30',
    '1222',
    '23',
    '30',
    '122',
  ],
};

export const cssBugHunterParams: BugHunterQuiz = {
  quizName: 'CSS Bug Hunter',
  tasks: cssMockQuestions,
  rightAnswers: [
    '12',
    '120',
    '23',
    '3',
    '11',
    '210',
    '10',
    '11',
    '1023',
    '020',
  ],
};

export const jsBugHunterParams: BugHunterQuiz = {
  quizName: 'JavaScript Bug Hunter',
  tasks: jsMockQuestions,
  rightAnswers: [
    '3',
    '31',
    '20',
    '2123',
    '132',
    '1',
    '02',
    '3',
    '21',
    '322',
    '13',
    '02',
    '302',
    '20',
    '13',
    '12',
    '12',
    '0',
    '130',
    '220',
    '21',
    '21',
    '02',
    '12',
    '203',
    '23',
    '1',
    '121',
    '12',
    '1012',
    '3',
  ],
};

export const tsBugHunterParams: BugHunterQuiz = {
  quizName: 'TypeScript Bug Hunter',
  tasks: tsMockQuestions,
  rightAnswers: [
    '3',
    '23',
    '010',
    '02',
    '30',
    '01',
    '1',
    '021',
    '10',
    '12',
    '01',
    '3',
    '03',
    '210',
    '10',
    '12',
    '3',
    '01',
    '113',
    '30',
    '02',
    '001',
    '1',
    '12',
    '101',
    '20',
    '2121',
    '13',
    '132',
    '20',
  ],
};

export const gitHubBugHunterParams: BugHunterQuiz = {
  quizName: 'GitHub Bug Hunter',
  tasks: gitHubMockQuestions,
  rightAnswers: ['2', '1', '3', '0', '1', '2', '3', '1', '3', '0'],
};
