import type { WidgetView, QuizConfig } from '@models/widgetModel';

const htmlQuizWidget: WidgetView<QuizConfig> = {
  widgetId: 'widget_quiz_html',
  type: 'quiz',
  topic: 'html',
  config: {
    quizName: 'HTML Quiz',
    questions: [
      {
        isText: false,
        question: 'Find the error in this HTML code',
        code: '<div>\n    <p>Hello World</p\n</div>',
        answers: [
          [0, 'Div tag is wrong'],
          [1, 'Missing closing bracket in p tag'],
          [2, 'Hello World text is invalid'],
        ],
      },
      {
        isText: true,
        question: 'What does the <br> tag do?',
        answers: [
          [0, 'Creates a bold text'],
          [1, 'Creates a line break'],
          [2, 'Creates a border'],
          [3, 'Creates a button'],
        ],
      },
      {
        isText: false,
        question: 'What does this HTML code create?',
        code: '<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n</ul>',
        answers: [
          [0, 'Ordered list'],
          [1, 'Table'],
          [2, 'Unordered list'],
          [3, 'Navigation menu'],
        ],
      },
      {
        isText: true,
        question: 'Is <img> a self-closing tag?',
        answers: [
          [0, 'No'],
          [1, 'Yes'],
        ],
      },
      {
        isText: true,
        question: 'Which tag is used for the largest heading?',
        answers: [
          [0, 'h1'],
          [1, 'h6'],
          [2, 'head'],
          [3, 'header'],
        ],
      },
    ],
    rightAnswers: [1, 1, 2, 1, 0],
  },
};

const cssQuizWidget: WidgetView<QuizConfig> = {
  widgetId: 'widget_quiz_css',
  type: 'quiz',
  topic: 'css',
  config: {
    quizName: 'CSS Quiz',
    questions: [
      {
        isText: false,
        question: 'Where is a problem?',
        code:
          '.container {\n' +
          '    display: flex;\n' +
          '    justify-content: center;\n' +
          '    align-items: center;\n' +
          '    width: 100%;\n' +
          '    height: 100vh;\n' +
          '    background-color: #f0f0f0;\n' +
          '    padding 20px;\n' +
          '}',
        answers: [
          [0, 'height property'],
          [1, 'display property'],
          [2, 'padding property'],
        ],
      },
      {
        isText: true,
        question: 'What will happen if you add display: none?',
        answers: [
          [0, 'Only an element with this property will be in the DOM tree'],
          [1, 'An element will disappear from the DOM tree'],
          [2, 'Nothing'],
        ],
      },
      {
        isText: true,
        question: 'What is the default value of position property?',
        answers: [
          [0, 'fixed'],
          [1, 'absolute'],
          [2, 'static'],
          [3, 'relative'],
        ],
      },
      {
        isText: true,
        question: 'Can you use negative values for margin?',
        answers: [
          [0, 'No'],
          [1, 'Yes'],
        ],
      },
      {
        isText: true,
        question: 'Which unit is relative to the viewport width?',
        answers: [
          [0, 'pt'],
          [1, 'vw'],
          [2, 'px'],
          [3, 'cm'],
        ],
      },
    ],
    rightAnswers: [2, 0, 2, 1, 1],
  },
};

const jsQuizWidget: WidgetView<QuizConfig> = {
  widgetId: 'widget_quiz_js',
  type: 'quiz',
  topic: 'js',
  config: {
    quizName: 'JavaScript Quiz',
    questions: [
      {
        isText: false,
        question: 'Find the error in this code',
        code: 'let x = 10;\nif (x = 5) {\n    console.log("Equal");\n}',
        answers: [
          [0, 'Let is not valid'],
          [1, 'Using assignment instead of comparison'],
          [2, 'Console.log syntax is wrong'],
          [3, 'If statement needs else'],
        ],
      },
      {
        isText: true,
        question: 'What is the result of: typeof null?',
        answers: [
          [0, 'null'],
          [1, 'undefined'],
          [2, 'object'],
          [3, 'number'],
        ],
      },
      {
        isText: true,
        question: 'Can const variables be reassigned?',
        answers: [
          [0, 'Yes'],
          [1, 'No'],
        ],
      },
      {
        isText: true,
        question: 'What does === check?',
        answers: [
          [0, 'Value and type'],
          [1, 'Only value'],
          [2, 'Only type'],
          [3, 'Reference equality'],
        ],
      },
      {
        isText: true,
        question: 'Which method adds element to the end of array?',
        answers: [
          [0, 'shift()'],
          [1, 'pop()'],
          [2, 'unshift()'],
          [3, 'push()'],
        ],
      },
    ],
    rightAnswers: [1, 2, 1, 0, 3],
  },
};

const tsQuizWidget: WidgetView<QuizConfig> = {
  widgetId: 'widget_quiz_ts',
  type: 'quiz',
  topic: 'ts',
  config: {
    quizName: 'TypeScript Quiz',
    questions: [
      {
        isText: true,
        question: 'What does the "unknown" type represent?',
        answers: [
          [0, 'Same as any'],
          [1, 'A type-safe alternative to any'],
          [2, 'An undefined value'],
          [3, 'A nullable type'],
        ],
      },
      {
        isText: true,
        question: 'What does "never" type represent?',
        answers: [
          [0, 'An empty object'],
          [1, 'A void return'],
          [2, 'A value that never occurs'],
          [3, 'An optional type'],
        ],
      },
      {
        isText: true,
        question: 'What does "keyof T" produce?',
        answers: [
          [0, 'An array of keys'],
          [1, 'A union of the keys of T'],
          [2, 'A mapped type'],
          [3, 'A partial type'],
        ],
      },
      {
        isText: true,
        question: 'What does Partial<T> do?',
        answers: [
          [0, 'Makes all props required'],
          [1, 'Removes all props'],
          [2, 'Makes all props optional'],
          [3, 'Picks a subset of props'],
        ],
      },
      {
        isText: true,
        question: 'What does the "readonly" modifier do?',
        answers: [
          [0, 'Makes a property optional'],
          [1, 'Prevents property mutation'],
          [2, 'Makes a property required'],
          [3, 'Hides a property'],
        ],
      },
    ],
    rightAnswers: [1, 2, 1, 2, 1],
  },
};

const githubQuizWidget: WidgetView<QuizConfig> = {
  widgetId: 'widget_quiz_github',
  type: 'quiz',
  topic: 'github',
  config: {
    quizName: 'GitHub Quiz',
    questions: [
      {
        isText: true,
        question: 'What does "git clone" do?',
        answers: [
          [0, 'Creates a new branch'],
          [1, 'Downloads a repository locally'],
          [2, 'Merges two branches'],
          [3, 'Pushes commits to remote'],
        ],
      },
      {
        isText: true,
        question: 'What is a pull request?',
        answers: [
          [0, 'A command to pull changes'],
          [1, 'A proposal to merge changes for review'],
          [2, 'A way to delete a branch'],
          [3, 'A type of commit'],
        ],
      },
      {
        isText: true,
        question: 'What does "git stash" do?',
        answers: [
          [0, 'Deletes uncommitted changes'],
          [1, 'Commits all changes'],
          [2, 'Temporarily saves uncommitted changes'],
          [3, 'Pushes to remote'],
        ],
      },
      {
        isText: true,
        question: 'What does "git rebase" do?',
        answers: [
          [0, 'Merges branches with a merge commit'],
          [1, 'Reapplies commits on top of a new base'],
          [2, 'Reverts the last commit'],
          [3, 'Creates a new branch'],
        ],
      },
      {
        isText: true,
        question: 'What does "git cherry-pick" do?',
        answers: [
          [0, 'Picks a random commit'],
          [1, 'Applies a specific commit to the current branch'],
          [2, 'Deletes a commit'],
          [3, 'Resets the branch'],
        ],
      },
    ],
    rightAnswers: [1, 1, 2, 1, 1],
  },
};

export const quizWidgetMocks: Record<string, WidgetView<QuizConfig>> = {
  widget_quiz_html: htmlQuizWidget,
  widget_quiz_css: cssQuizWidget,
  widget_quiz_js: jsQuizWidget,
  widget_quiz_ts: tsQuizWidget,
  widget_quiz_github: githubQuizWidget,
};
