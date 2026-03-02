import type {
  QuizProps,
  QuizQuestion,
} from '@/features/WidgetQuiz/WidgetQuiz.types.ts';

const htmlMockQuestions: QuizQuestion[] = [
  {
    isText: false,
    question: 'Find the error in this HTML code',
    code: '<div>\n' + '    <p>Hello World</p\n' + '</div>',
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
    code:
      '<ul>\n' + '    <li>Item 1</li>\n' + '    <li>Item 2</li>\n' + '</ul>',
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
    isText: false,
    question: 'Find the problem',
    code: '<a href="page.html" target="_blank">Link</a>',
    answers: [
      [0, 'Missing title attribute'],
      [1, 'Target attribute is wrong'],
      [2, 'No error, code is correct'],
      [3, 'Href syntax is invalid'],
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
  {
    isText: false,
    question: 'What does this form input create?',
    code: '<input type="checkbox" name="agree">',
    answers: [
      [0, 'Radio button'],
      [1, 'Checkbox'],
      [2, 'Text field'],
      [3, 'Submit button'],
    ],
  },
  {
    isText: true,
    question: 'Does HTML support comments?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code: '<img src="photo.jpg" alt="Photo"',
    answers: [
      [0, 'Alt attribute is wrong'],
      [1, 'Src is invalid'],
      [2, 'Missing closing bracket'],
      [3, 'Img tag needs closing tag'],
    ],
  },
  {
    isText: true,
    question: 'What is the correct HTML for creating a hyperlink?',
    answers: [
      [0, '<link>url</link>'],
      [1, '<a>url</a>'],
      [2, '<hyperlink>url</hyperlink>'],
      [3, '<a href="url">text</a>'],
    ],
  },
  {
    isText: false,
    question: 'What does this table structure create?',
    code:
      '<table>\n' +
      '    <tr>\n' +
      '        <th>Name</th>\n' +
      '        <th>Age</th>\n' +
      '    </tr>\n' +
      '</table>',
    answers: [
      [0, 'Table with header row'],
      [1, 'Table with data row'],
      [2, 'Table with two columns'],
      [3, 'Ordered list'],
    ],
  },
  {
    isText: true,
    question: 'Is <div> an inline element?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code: '<button type="submit>Click Me</button>',
    answers: [
      [0, 'Button text is wrong'],
      [1, 'Missing closing quote in type'],
      [2, 'Type submit is invalid'],
      [3, 'Button needs id attribute'],
    ],
  },
  {
    isText: true,
    question: 'Which attribute specifies alternative text for an image?',
    answers: [
      [0, 'title'],
      [1, 'alt'],
      [2, 'src'],
      [3, 'href'],
      [4, 'text'],
    ],
  },
  {
    isText: false,
    question: 'What does this meta tag do?',
    code: '<meta charset="UTF-8">',
    answers: [
      [0, 'Sets page title'],
      [1, 'Sets character encoding'],
      [2, 'Links stylesheet'],
      [3, 'Sets viewport'],
    ],
  },
  {
    isText: true,
    question: 'Which tag is used for emphasizing text (usually italic)?',
    answers: [
      [0, 'strong'],
      [1, 'em'],
      [2, 'i'],
      [3, 'bold'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      '<select>\n' +
      '    <option value="1">One\n' +
      '    <option value="2">Two</option>\n' +
      '</select>',
    answers: [
      [0, 'Missing closing tag for first option'],
      [1, 'Value attribute is wrong'],
      [2, 'Select tag needs name'],
      [3, 'Option text is invalid'],
    ],
  },
  {
    isText: true,
    question: 'What does <strong> tag do?',
    answers: [
      [0, 'Creates italic text'],
      [1, 'Creates bold/strong text'],
      [2, 'Creates underlined text'],
      [3, 'Creates strikethrough text'],
    ],
  },
  {
    isText: false,
    question: 'What does this video tag do?',
    code: '<video controls src="movie.mp4"></video>',
    answers: [
      [0, 'Embeds video with controls'],
      [1, 'Embeds audio file'],
      [2, 'Creates video link'],
      [3, 'Downloads video'],
    ],
  },
  {
    isText: true,
    question: 'Can you have multiple <h1> tags on one page?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      '<form action="/submit">\n' +
      '    <input type="text" name="username"\n' +
      '</form>',
    answers: [
      [0, 'Form action is wrong'],
      [1, 'Missing closing bracket in input'],
      [2, 'Input needs id attribute'],
      [3, 'Name attribute is invalid'],
    ],
  },
  {
    isText: true,
    question: 'Which HTML tag defines a navigation section?',
    answers: [
      [0, 'navigation'],
      [1, 'nav'],
      [2, 'navigate'],
      [3, 'menu'],
    ],
  },
  {
    isText: false,
    question: 'What does this input type create?',
    code: '<input type="email" placeholder="Enter email">',
    answers: [
      [0, 'Text input with email validation'],
      [1, 'Regular text input'],
      [2, 'Password field'],
      [3, 'Textarea'],
    ],
  },
  {
    isText: true,
    question: 'Is the <title> tag required in HTML documents?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      '<label for="email">Email:</label>\n' + '<input type="email" id="mail">',
    answers: [
      [0, 'For and id do not match'],
      [1, 'Label tag is wrong'],
      [2, 'Input type is invalid'],
      [3, 'Missing name attribute'],
    ],
  },
  {
    isText: true,
    question: 'What does the placeholder attribute do?',
    answers: [
      [0, 'Sets default value'],
      [1, 'Shows hint text in input'],
      [2, 'Sets input label'],
      [3, 'Sets input name'],
    ],
  },
  {
    isText: false,
    question: 'What semantic element is this?',
    code: '<article><h2>Title</h2><p>Content</p></article>',
    answers: [
      [0, 'Navigation section'],
      [1, 'Self-contained content'],
      [2, 'Header section'],
      [3, 'Footer section'],
    ],
  },
  {
    isText: true,
    question: 'Does <span> create a new line?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: '<ol>\n' + '    <li>First</li>\n' + '    <li>Second\n' + '</ol>',
    answers: [
      [0, 'Ol tag needs type attribute'],
      [1, 'Missing closing tag for second li'],
      [2, 'Li items need id'],
      [3, 'Ol should be ul'],
    ],
  },
  {
    isText: true,
    question: 'Which tag creates a clickable button?',
    answers: [
      [0, 'click'],
      [1, 'input'],
      [2, 'btn'],
      [3, 'button'],
    ],
  },
  {
    isText: false,
    question: 'What does this iframe do?',
    code: '<iframe src="page.html" width="500"></iframe>',
    answers: [
      [0, 'Embeds another page'],
      [1, 'Creates a frame border'],
      [2, 'Links to another page'],
      [3, 'Downloads the page'],
    ],
  },
  {
    isText: true,
    question: 'Is <header> the same as <head>?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code: '<textarea rows="5" cols="30">\n' + 'Default text\n' + '<textarea>',
    answers: [
      [0, 'Missing forward slash in closing tag'],
      [1, 'Rows attribute is wrong'],
      [2, 'Cols should be columns'],
      [3, 'Default text is invalid'],
    ],
  },
  {
    isText: true,
    question: 'What does the required attribute do in forms?',
    answers: [
      [0, 'Hides the field'],
      [1, 'Makes field mandatory'],
      [2, 'Validates email'],
      [3, 'Disables the field'],
    ],
  },
  {
    isText: false,
    question: 'What structure does this create?',
    code:
      '<dl>\n' + '    <dt>Term</dt>\n' + '    <dd>Definition</dd>\n' + '</dl>',
    answers: [
      [0, 'Ordered list'],
      [1, 'Definition list'],
      [2, 'Data table'],
      [3, 'Unordered list'],
    ],
  },
  {
    isText: true,
    question: 'Can <script> tags be placed in <body>?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      '<audio controls>\n' +
      '    <source src="audio.mp3" type="audio/mp3">\n' +
      '</audio>',
    answers: [
      [0, 'Audio tag needs src attribute'],
      [1, 'Type should be audio/mpeg, not audio/mp3'],
      [2, 'Controls is not valid'],
      [3, 'Source tag is wrong'],
    ],
  },
  {
    isText: true,
    question: 'Which attribute makes an input field read-only?',
    answers: [
      [0, 'disabled'],
      [1, 'locked'],
      [2, 'readonly'],
      [3, 'read-only'],
    ],
  },
  {
    isText: false,
    question: 'What does this link tag do?',
    code: '<link rel="stylesheet" href="styles.css">',
    answers: [
      [0, 'Links to another page'],
      [1, 'Links external stylesheet'],
      [2, 'Creates hyperlink'],
      [3, 'Imports JavaScript'],
    ],
  },
  {
    isText: true,
    question: 'Is the closing tag for <br> required?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code: '<footer>\n' + '    <p>© 2024 Company</p\n' + '</footer>',
    answers: [
      [0, 'Footer tag is wrong'],
      [1, 'Missing closing bracket in p tag'],
      [2, 'Copyright symbol is invalid'],
      [3, 'Year format is wrong'],
    ],
  },
  {
    isText: true,
    question: 'What does the action attribute specify in a form?',
    answers: [
      [0, 'Form validation'],
      [1, 'Form styling'],
      [2, 'Where to send form data'],
      [3, 'Form method type'],
    ],
  },
  {
    isText: false,
    question: 'What does this input create?',
    code: '<input type="range" min="0" max="100">',
    answers: [
      [0, 'Text field'],
      [1, 'Number input'],
      [2, 'Dropdown menu'],
      [3, 'Slider control'],
    ],
  },
  {
    isText: true,
    question: 'Does HTML5 support the <canvas> element?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      '<section id="main">\n' +
      '    <h2>Title</h2>\n' +
      '    <p>Content</p>\n' +
      '<section>',
    answers: [
      [0, 'Id attribute is invalid'],
      [1, 'H2 should be h1'],
      [2, 'Missing forward slash in closing section'],
      [3, 'P tag should be div'],
    ],
  },
];

const cssMockQuestions: QuizQuestion[] = [
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
    question: 'What property will change an element color',
    answers: [
      [0, 'color: red'],
      [1, 'element-color: red'],
      [2, 'bg-color: red'],
      [3, 'paint-element-to: red'],
      [4, 'background-color: red'],
    ],
  },
  {
    isText: false,
    question: 'What does this code do?',
    code:
      '.grid {\n' +
      '    display: grid;\n' +
      '    grid-template-columns: repeat(3, 1fr);\n' +
      '    gap: 20px;\n' +
      '}',
    answers: [
      [0, 'Creates 1 column repeated 3 times'],
      [1, 'Creates 3 rows with 20px gap'],
      [2, 'Creates 3 equal columns with 20px gap'],
      [3, 'Creates flexbox layout'],
    ],
  },
  {
    isText: false,
    question: 'Find the error in this code',
    code:
      '.box {\n' +
      '    width: 200px;\n' +
      '    height: 200px;\n' +
      '    margin 10px auto;\n' +
      '}',
    answers: [
      [0, 'Auto is not valid'],
      [1, 'Width is wrong'],
      [2, 'Missing colon after margin'],
      [3, 'Height should be in percentages'],
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
    isText: false,
    question: 'What will this selector target?',
    code: 'div > p { color: blue; }',
    answers: [
      [0, 'All paragraphs inside div'],
      [1, 'Direct child paragraphs of div'],
      [2, 'Paragraphs after div'],
      [3, 'All divs and paragraphs'],
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
    isText: false,
    question: 'Find the problem',
    code:
      '.button {\n' +
      '    background-color: blue\n' +
      '    color: white;\n' +
      '    padding: 10px;\n' +
      '}',
    answers: [
      [0, 'Wrong color value'],
      [1, 'Color property is wrong'],
      [2, 'Missing semicolon after background-color'],
      [3, 'Padding syntax is incorrect'],
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
  {
    isText: false,
    question: 'What does this flexbox code do?',
    code:
      '.container {\n' +
      '    display: flex;\n' +
      '    flex-direction: column;\n' +
      '    align-items: center;\n' +
      '}',
    answers: [
      [0, 'Grid layout'],
      [1, 'Creates columns'],
      [2, 'Vertical layout with centered items'],
      [3, 'Horizontal layout with centered items'],
    ],
  },
  {
    isText: true,
    question: 'Does CSS support variables?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      '.text {\n' +
      '    font-size: 16px;\n' +
      '    font-weight bold;\n' +
      '    text-align: center;\n' +
      '}',
    answers: [
      [0, 'Text-align is invalid'],
      [1, 'Missing colon after font-weight'],
      [2, 'Font-size is wrong'],
      [3, 'Bold is not a valid value'],
    ],
  },
  {
    isText: true,
    question: 'What property controls the space between lines of text?',
    answers: [
      [0, 'word-spacing'],
      [1, 'letter-spacing'],
      [2, 'line-spacing'],
      [3, 'line-height'],
      [4, 'text-spacing'],
    ],
  },
  {
    isText: false,
    question: 'What does this code do?',
    code:
      '.element {\n' +
      '    position: absolute;\n' +
      '    top: 50%;\n' +
      '    left: 50%;\n' +
      '    transform: translate(-50%, -50%);\n' +
      '}',
    answers: [
      [0, 'Centers element absolutely'],
      [1, 'Rotates element'],
      [2, 'Moves element to bottom right'],
      [3, 'Scales element to 50%'],
    ],
  },
  {
    isText: true,
    question: 'What is z-index used for?',
    answers: [
      [0, 'Controls element color'],
      [1, 'Controls stacking order of elements'],
      [2, 'Controls element size'],
      [3, 'Controls element position'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      '.card {\n' +
      '    border-radius: 10px\n' +
      '    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n' +
      '}',
    answers: [
      [0, 'Missing semicolon after border-radius'],
      [1, 'Rgba is not valid'],
      [2, 'Border-radius value is wrong'],
      [3, 'Box-shadow syntax is incorrect'],
    ],
  },
  {
    isText: true,
    question: 'Which property hides an element but keeps its space?',
    answers: [
      [0, 'display: none'],
      [1, 'visibility: hidden'],
      [2, 'hidden: true'],
      [3, 'opacity: 0'],
    ],
  },
  {
    isText: false,
    question: 'What does this selector do?',
    code: 'a:hover { color: red; }',
    answers: [
      [0, 'Changes all links to red'],
      [1, 'Changes link color on click'],
      [2, 'Creates hover animation'],
      [3, 'Changes link color on mouse hover'],
    ],
  },
  {
    isText: true,
    question: 'Is "display: flex" the same as "display: grid"?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      '.image {\n' +
      '    width: 100%;\n' +
      '    max-width 500px;\n' +
      '    height: auto;\n' +
      '}',
    answers: [
      [0, 'Height auto is wrong'],
      [1, 'Missing colon after max-width'],
      [2, 'Max-width unit is wrong'],
      [3, 'Width should not be 100%'],
    ],
  },
  {
    isText: true,
    question: 'What does "box-sizing: border-box" do?',
    answers: [
      [0, 'Includes padding and border in width'],
      [1, 'Creates a box shadow'],
      [2, 'Removes borders'],
      [3, 'Excludes padding from width'],
    ],
  },
  {
    isText: false,
    question: 'What does this animation do?',
    code:
      '@keyframes fade {\n' +
      '    from { opacity: 0; }\n' +
      '    to { opacity: 1; }\n' +
      '}',
    answers: [
      [0, 'Moves element'],
      [1, 'Fades element from invisible to visible'],
      [2, 'Rotates element'],
      [3, 'Fades element from visible to invisible'],
    ],
  },
  {
    isText: true,
    question: 'Which property is used to change text case to uppercase?',
    answers: [
      [0, 'uppercase: true'],
      [1, 'text-case: uppercase'],
      [2, 'text-transform: uppercase'],
      [3, 'font-case: upper'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      '.btn {\n' +
      '    transition: all 0.3s ease;\n' +
      '    background: #333\n' +
      '    color: white;\n' +
      '}',
    answers: [
      [0, 'Background value is invalid'],
      [1, 'Missing semicolon after background'],
      [2, 'Transition syntax is wrong'],
      [3, 'Color should be hex'],
    ],
  },
  {
    isText: true,
    question: 'What is the difference between "em" and "rem"?',
    answers: [
      [0, 'They are the same'],
      [1, 'em is absolute, rem is relative'],
      [2, 'em is relative to parent, rem to root'],
      [3, 'rem is older than em'],
    ],
  },
  {
    isText: false,
    question: 'What does this grid code do?',
    code:
      '.grid {\n' +
      '    display: grid;\n' +
      '    grid-template-columns: 1fr 2fr;\n' +
      '}',
    answers: [
      [0, 'Creates 2 rows'],
      [1, 'Creates 2 columns, second is twice as wide'],
      [2, 'Creates 3 columns'],
      [3, 'Creates 2 equal columns'],
    ],
  },
  {
    isText: true,
    question: 'Can you use multiple classes on one element?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      '.container {\n' +
      '    display: flex;\n' +
      '    justify-content space-between;\n' +
      '}',
    answers: [
      [0, 'Display flex is wrong'],
      [1, 'Missing semicolon at end'],
      [2, 'Missing colon after justify-content'],
      [3, 'Space-between is invalid'],
    ],
  },
  {
    isText: true,
    question: 'Which property creates rounded corners?',
    answers: [
      [0, 'border-radius'],
      [1, 'round-corners'],
      [2, 'corner-radius'],
      [3, 'border-round'],
    ],
  },
  {
    isText: false,
    question: 'What does this pseudo-element do?',
    code: '.item::before { content: "★"; }',
    answers: [
      [0, 'Replaces content with star'],
      [1, 'Adds star after each element'],
      [2, 'Changes background to star'],
      [3, 'Adds star before each .item element'],
    ],
  },
  {
    isText: true,
    question: 'Is "overflow: hidden" used to hide overflowing content?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      '.nav {\n' +
      '    list-style: none;\n' +
      '    padding: 0\n' +
      '    margin: 0;\n' +
      '}',
    answers: [
      [0, 'Padding 0 is invalid'],
      [1, 'Missing semicolon after padding'],
      [2, 'List-style is wrong'],
      [3, 'Margin should have unit'],
    ],
  },
  {
    isText: true,
    question: 'What does "cursor: pointer" do?',
    answers: [
      [0, 'Adds pointer to element'],
      [1, 'Makes element clickable'],
      [2, 'Changes cursor to hand on hover'],
      [3, 'Creates cursor animation'],
    ],
  },
  {
    isText: false,
    question: 'What does this media query do?',
    code: '@media (max-width: 768px) { }',
    answers: [
      [0, 'Applies styles only at 768px'],
      [1, 'Applies styles for screens 768px or smaller'],
      [2, 'Applies styles for screens larger than 768px'],
      [3, 'Sets max width to 768px'],
    ],
  },
  {
    isText: true,
    question: 'Which value makes an element take full width?',
    answers: [
      [0, 'width: all'],
      [1, 'width: 100%'],
      [2, 'width: full'],
      [3, 'width: max'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      '.overlay {\n' +
      '    position: fixed;\n' +
      '    top: 0;\n' +
      '    left 0;\n' +
      '    width: 100%;\n' +
      '}',
    answers: [
      [0, 'Width should not be 100%'],
      [1, 'Top 0 is invalid'],
      [2, 'Missing colon after left'],
      [3, 'Position fixed is wrong'],
    ],
  },
  {
    isText: true,
    question: 'What property controls element transparency?',
    answers: [
      [0, 'visibility'],
      [1, 'opacity'],
      [2, 'transparent'],
      [3, 'alpha'],
      [4, 'transparency'],
    ],
  },
  {
    isText: false,
    question: 'What does this flexbox code do?',
    code:
      '.flex {\n' +
      '    display: flex;\n' +
      '    justify-content: space-around;\n' +
      '}',
    answers: [
      [0, 'Creates grid layout'],
      [1, 'Distributes items with space around them'],
      [2, 'Puts space between items only'],
      [3, 'Centers all items'],
    ],
  },
  {
    isText: true,
    question: 'Does "inherit" keyword inherit parent styles?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      '.header {\n' +
      '    background-image: url("bg.jpg");\n' +
      '    background-size cover;\n' +
      '}',
    answers: [
      [0, 'Background-image is incorrect'],
      [1, 'URL syntax is wrong'],
      [2, 'Cover is not valid'],
      [3, 'Missing colon after background-size'],
    ],
  },
  {
    isText: true,
    question: 'Which property adds space inside an element?',
    answers: [
      [0, 'inner-space'],
      [1, 'margin'],
      [2, 'padding'],
      [3, 'spacing'],
    ],
  },
  {
    isText: false,
    question: 'What does this transform do?',
    code: '.box { transform: rotate(45deg); }',
    answers: [
      [0, 'Scales element to 45%'],
      [1, 'Changes opacity to 45%'],
      [2, 'Rotates element 45 degrees'],
      [3, 'Moves element 45 pixels'],
    ],
  },
  {
    isText: true,
    question: 'Can negative values be used for padding?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      '.card {\n' +
      '    display: flex;\n' +
      '    flex-direction: row\n' +
      '    gap: 10px;\n' +
      '}',
    answers: [
      [0, 'Gap is not valid in flexbox'],
      [1, 'Display flex is incorrect'],
      [2, 'Flex-direction row is wrong'],
      [3, 'Missing semicolon after flex-direction'],
    ],
  },
  {
    isText: true,
    question: 'What does "text-decoration: none" remove?',
    answers: [
      [0, 'Text color'],
      [1, 'Underline from links'],
      [2, 'Font style'],
      [3, 'Text content'],
    ],
  },
  {
    isText: false,
    question: 'What does this selector target?',
    code: 'input:focus { border: 2px solid blue; }',
    answers: [
      [0, 'Input on hover'],
      [1, 'All inputs'],
      [2, 'Input when clicked'],
      [3, 'Input when focused'],
    ],
  },
];

const jsMockQuestions: QuizQuestion[] = [
  {
    isText: false,
    question: 'Find the error in this code',
    code:
      'let x = 10;\n' + 'if (x = 5) {\n' + '    console.log("Equal");\n' + '}',
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
    isText: false,
    question: 'What does this code return?',
    code:
      'function sum(a, b) {\n' + '    return a + b;\n' + '}\n' + 'sum(5, 3);',
    answers: [
      [0, 'undefined'],
      [1, '8'],
      [2, '53'],
      [3, 'Error'],
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
    isText: false,
    question: 'Find the problem',
    code:
      'const arr = [1, 2, 3];\n' +
      'arr.forEach(item => {\n' +
      '    console.log(item)\n' +
      '}',
    answers: [
      [0, 'ForEach is not a valid method'],
      [1, 'Arrow function syntax is wrong'],
      [2, 'Missing closing parenthesis'],
      [3, 'Const array cannot use forEach'],
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
    isText: false,
    question: 'What is the output?',
    code: 'console.log([1, 2, 3].length);',
    answers: [
      [0, 'undefined'],
      [1, '2'],
      [2, '3'],
      [3, '4'],
    ],
  },
  {
    isText: true,
    question: 'Is JavaScript a statically typed language?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'function greet(name) {\n' +
      '    return "Hello " + name\n' +
      '}\n' +
      'greet("John")',
    answers: [
      [0, 'Function keyword is wrong'],
      [1, 'Missing semicolon after return'],
      [2, 'String concatenation is invalid'],
      [3, 'Greet call needs semicolon'],
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
  {
    isText: false,
    question: 'What does this arrow function return?',
    code: 'const double = x => x * 2;',
    answers: [
      [0, 'x multiplied by 2'],
      [1, 'Syntax error'],
      [2, 'undefined'],
      [3, 'String "x * 2"'],
    ],
  },
  {
    isText: true,
    question: 'Does let have block scope?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: 'const obj = {\n' + '    name: "John"\n' + '    age: 30\n' + '};',
    answers: [
      [0, 'Missing comma after name property'],
      [1, 'Const cannot be used for objects'],
      [2, 'Property names need quotes'],
      [3, 'Age value is wrong'],
    ],
  },
  {
    isText: true,
    question: 'What is the result of: 5 + "5"?',
    answers: [
      [0, '10'],
      [1, 'Error'],
      [2, '"55"'],
      [3, 'undefined'],
    ],
  },
  {
    isText: false,
    question: 'What does this code do?',
    code:
      'const numbers = [1, 2, 3, 4];\n' +
      'const doubled = numbers.map(n => n * 2);',
    answers: [
      [0, 'Multiplies all numbers by 2'],
      [1, 'Creates new array with doubled values'],
      [2, 'Filters even numbers'],
      [3, 'Sums all numbers'],
    ],
  },
  {
    isText: true,
    question: 'Which keyword declares a function?',
    answers: [
      [0, 'func'],
      [1, 'function'],
      [2, 'def'],
      [3, 'fn'],
      [4, 'method'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'let count = 0;\n' +
      'for (let i = 0; i < 5; i++) {\n' +
      '    count++\n' +
      '}',
    answers: [
      [0, 'No error, code is correct'],
      [1, 'For loop syntax is wrong'],
      [2, 'Let cannot be used in loops'],
      [3, 'Count++ needs semicolon'],
    ],
  },
  {
    isText: true,
    question: 'What does JSON.parse() do?',
    answers: [
      [0, 'Converts object to string'],
      [1, 'Parses JSON string to object'],
      [2, 'Validates JSON'],
      [3, 'Creates JSON file'],
    ],
  },
  {
    isText: false,
    question: 'What is the output?',
    code: 'console.log(typeof [1, 2, 3]);',
    answers: [
      [0, 'array'],
      [1, 'object'],
      [2, 'list'],
      [3, 'Array'],
    ],
  },
  {
    isText: true,
    question: 'Is undefined the same as null?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: 'const user = { name: "Alice" };\n' + 'console.log(user[name]);',
    answers: [
      [0, 'Console.log is wrong'],
      [1, 'Name should be in quotes'],
      [2, 'User is not defined'],
      [3, 'Bracket notation is invalid'],
    ],
  },
  {
    isText: true,
    question: 'Which loop iterates over object properties?',
    answers: [
      [0, 'for...of'],
      [1, 'forEach'],
      [2, 'for...in'],
      [3, 'while'],
    ],
  },
  {
    isText: false,
    question: 'What does this ternary operator return?',
    code: 'const result = 10 > 5 ? "Yes" : "No";',
    answers: [
      [0, '"No"'],
      [1, 'true'],
      [2, '"Yes"'],
      [3, 'undefined'],
    ],
  },
  {
    isText: true,
    question: 'Can arrow functions be used as constructors?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'function multiply(a, b) {\n' +
      '    return a * b\n' +
      '}\n' +
      'const result = multiply(5);',
    answers: [
      [0, 'Missing second argument, result is NaN'],
      [1, 'Function syntax is wrong'],
      [2, 'Return needs semicolon'],
      [3, 'Const cannot store function result'],
    ],
  },
  {
    isText: true,
    question: 'What does Array.isArray() do?',
    answers: [
      [0, 'Creates an array'],
      [1, 'Checks if value is an array'],
      [2, 'Converts to array'],
      [3, 'Gets array length'],
    ],
  },
  {
    isText: false,
    question: 'What does this code output?',
    code: 'let x = 5;\n' + 'x += 3;\n' + 'console.log(x);',
    answers: [
      [0, '53'],
      [1, '8'],
      [2, '5'],
      [3, 'Error'],
    ],
  },
  {
    isText: true,
    question: 'Does JavaScript support default parameters?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: 'const colors = ["red", "blue"];\n' + 'console.log(colors.lenght);',
    answers: [
      [0, 'Array syntax is wrong'],
      [1, 'Typo: lenght should be length'],
      [2, 'Console.log cannot access length'],
      [3, 'Colors needs to be var'],
    ],
  },
  {
    isText: true,
    question: 'What does the spread operator (...) do with arrays?',
    answers: [
      [0, 'Deletes array'],
      [1, 'Copies array'],
      [2, 'Expands array elements'],
      [3, 'Sorts array'],
    ],
  },
  {
    isText: false,
    question: 'What is the output?',
    code: 'console.log(Boolean("false"));',
    answers: [
      [0, 'false'],
      [1, 'true'],
      [2, '"false"'],
      [3, 'undefined'],
    ],
  },
  {
    isText: true,
    question: 'Is NaN equal to NaN (NaN === NaN)?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'const numbers = [1, 2, 3];\n' +
      'const sum = numbers.reduce((acc, curr) => acc + curr 0);',
    answers: [
      [0, 'Missing comma before initial value'],
      [1, 'Reduce syntax is wrong'],
      [2, 'Arrow function is invalid'],
      [3, 'Const cannot use reduce'],
    ],
  },
  {
    isText: true,
    question: 'What does Promise.resolve() return?',
    answers: [
      [0, 'Rejected promise'],
      [1, 'Resolved promise'],
      [2, 'Pending promise'],
      [3, 'undefined'],
    ],
  },
  {
    isText: false,
    question: 'What does this filter do?',
    code: 'const nums = [1, 2, 3, 4, 5].filter(n => n > 3);',
    answers: [
      [0, 'Returns [4, 5]'],
      [1, 'Returns [1, 2, 3]'],
      [2, 'Returns true/false'],
      [3, 'Returns 4'],
    ],
  },
  {
    isText: true,
    question: 'Can you declare variables without var, let, or const?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      'function sayHello() {\n' +
      '    console.log("Hello")\n' +
      '}\n' +
      'sayHello);',
    answers: [
      [0, 'Missing opening parenthesis in call'],
      [1, 'Function syntax is wrong'],
      [2, 'Console.log needs semicolon'],
      [3, 'SayHello is not defined'],
    ],
  },
  {
    isText: true,
    question: 'What does parseInt() do?',
    answers: [
      [0, 'Converts string to boolean'],
      [1, 'Parses string to integer'],
      [2, 'Creates integer'],
      [3, 'Validates integer'],
    ],
  },
  {
    isText: false,
    question: 'What does this destructuring do?',
    code: 'const { name, age } = { name: "Tom", age: 25 };',
    answers: [
      [0, 'Syntax error'],
      [1, 'Creates object'],
      [2, 'Extracts name and age variables'],
      [3, 'Merges objects'],
    ],
  },
  {
    isText: true,
    question: 'Does setTimeout execute code synchronously?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'const person = {\n' +
      '    name: "Bob",\n' +
      '    greet: function() {\n' +
      '        return "Hi, " + this.name;\n' +
      '    }\n' +
      '}',
    answers: [
      [0, 'No error, code is correct'],
      [1, 'This keyword is invalid'],
      [2, 'Function syntax in object is wrong'],
      [3, 'Missing semicolon after greet'],
    ],
  },
  {
    isText: true,
    question: 'What does Array.prototype.includes() check?',
    answers: [
      [0, 'Array length'],
      [1, 'If array contains a value'],
      [2, 'Array type'],
      [3, 'Array index'],
    ],
  },
  {
    isText: false,
    question: 'What is the output?',
    code: 'console.log("5" - 2);',
    answers: [
      [0, '"52"'],
      [1, '3'],
      [2, 'NaN'],
      [3, 'Error'],
    ],
  },
  {
    isText: true,
    question: 'Can functions return functions in JavaScript?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      'const data = [10, 20, 30];\n' +
      'const first = data.shift(;\n' +
      'console.log(first);',
    answers: [
      [0, 'Missing closing parenthesis in shift'],
      [1, 'Shift is not a valid method'],
      [2, 'Const cannot use shift'],
      [3, 'Data is not defined'],
    ],
  },
];

const tsMockQuestions: QuizQuestion[] = [
  {
    isText: false,
    question: 'Find the error in this TypeScript code',
    code: 'let age: number = "25";',
    answers: [
      [0, 'Number type is wrong'],
      [1, 'String assigned to number type'],
      [2, 'Let is not valid in TypeScript'],
      [3, 'Missing semicolon'],
    ],
  },
  {
    isText: true,
    question: 'What does the any type mean?',
    answers: [
      [0, 'Only numbers'],
      [1, 'Disables type checking'],
      [2, 'Only strings'],
      [3, 'Only objects'],
    ],
  },
  {
    isText: false,
    question: 'What does this interface define?',
    code:
      'interface User {\n' + '    name: string;\n' + '    age: number;\n' + '}',
    answers: [
      [0, 'A class'],
      [1, 'Object structure with name and age'],
      [2, 'A function'],
      [3, 'An array'],
    ],
  },
  {
    isText: true,
    question: 'Can TypeScript infer types automatically?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: 'function greet(name: string): string {\n' + '    return 42;\n' + '}',
    answers: [
      [0, 'Returning number instead of string'],
      [1, 'Function syntax is wrong'],
      [2, 'String type is invalid'],
      [3, 'Name parameter is wrong'],
    ],
  },
  {
    isText: true,
    question: 'What is a tuple in TypeScript?',
    answers: [
      [0, 'Array with fixed types and length'],
      [1, 'Any array'],
      [2, 'Object type'],
      [3, 'String type'],
    ],
  },
  {
    isText: false,
    question: 'What does this type union mean?',
    code: 'let id: string | number;',
    answers: [
      [0, 'Only string'],
      [1, 'String or number'],
      [2, 'Only number'],
      [3, 'String and number combined'],
    ],
  },
  {
    isText: true,
    question: 'Does TypeScript support enums?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code: 'const numbers: number[] = [1, 2, "3"];',
    answers: [
      [0, 'Array syntax is wrong'],
      [1, 'String in number array'],
      [2, 'Const cannot be used'],
      [3, 'Number type is invalid'],
    ],
  },
  {
    isText: true,
    question: 'What does the readonly modifier do?',
    answers: [
      [0, 'Makes property mutable'],
      [1, 'Deletes property'],
      [2, 'Makes property immutable'],
      [3, 'Hides property'],
    ],
  },
  {
    isText: false,
    question: 'What does this generic function do?',
    code: 'function identity<T>(arg: T): T { return arg; }',
    answers: [
      [0, 'Returns argument with same type'],
      [1, 'Converts to string'],
      [2, 'Creates array'],
      [3, 'Returns undefined'],
    ],
  },
  {
    isText: true,
    question: 'Is void a valid return type?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      'interface Person {\n' +
      '    name: string\n' +
      '    age: number;\n' +
      '}',
    answers: [
      [0, 'Interface keyword is wrong'],
      [1, 'Missing semicolon after name'],
      [2, 'String type is invalid'],
      [3, 'Age should be string'],
    ],
  },
  {
    isText: true,
    question: 'What does the ? operator mean in properties?',
    answers: [
      [0, 'Required property'],
      [1, 'Optional property'],
      [2, 'Readonly property'],
      [3, 'Private property'],
    ],
  },
  {
    isText: false,
    question: 'What type is this?',
    code: 'type Status = "pending" | "approved" | "rejected";',
    answers: [
      [0, 'String literal union type'],
      [1, 'Array type'],
      [2, 'Object type'],
      [3, 'Enum type'],
    ],
  },
  {
    isText: true,
    question: 'Can interfaces extend other interfaces?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'class Animal {\n' +
      '    name: string;\n' +
      '    constructor(name string) {\n' +
      '        this.name = name;\n' +
      '    }\n' +
      '}',
    answers: [
      [0, 'Missing colon before string in parameter'],
      [1, 'Class syntax is wrong'],
      [2, 'Constructor is invalid'],
      [3, 'This keyword is wrong'],
    ],
  },
  {
    isText: true,
    question: 'What is the never type used for?',
    answers: [
      [0, 'Functions that always return'],
      [1, 'Functions that never return'],
      [2, 'Optional values'],
      [3, 'Any values'],
    ],
  },
  {
    isText: false,
    question: 'What does this type assertion do?',
    code: 'const input = document.getElementById("input") as HTMLInputElement;',
    answers: [
      [0, 'Converts to string'],
      [1, 'Tells TS the specific type'],
      [2, 'Creates new element'],
      [3, 'Removes type'],
    ],
  },
  {
    isText: true,
    question: 'Does TypeScript support private class members?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      'function add(a: number, b: number): void {\n' +
      '    return a + b;\n' +
      '}',
    answers: [
      [0, 'Returning value from void function'],
      [1, 'Number type is wrong'],
      [2, 'Function syntax is invalid'],
      [3, 'Parameters are wrong'],
    ],
  },
  {
    isText: true,
    question: 'What is the purpose of type aliases?',
    answers: [
      [0, 'Delete types'],
      [1, 'Create custom type names'],
      [2, 'Convert types'],
      [3, 'Validate types'],
    ],
  },
  {
    isText: false,
    question: 'What does this do?',
    code: 'const arr: Array<string> = ["a", "b", "c"];',
    answers: [
      [0, 'Creates string array using generic'],
      [1, 'Creates object'],
      [2, 'Creates tuple'],
      [3, 'Syntax error'],
    ],
  },
  {
    isText: true,
    question: 'Can you use & to combine types?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'enum Color {\n' +
      '    Red = 1\n' +
      '    Green = 2,\n' +
      '    Blue = 3\n' +
      '}',
    answers: [
      [0, 'Missing comma after Red'],
      [1, 'Enum syntax is wrong'],
      [2, 'Values should be strings'],
      [3, 'Color name is invalid'],
    ],
  },
  {
    isText: true,
    question: 'What does keyof operator do?',
    answers: [
      [0, 'Deletes keys'],
      [1, 'Creates union of object keys'],
      [2, 'Counts keys'],
      [3, 'Validates keys'],
    ],
  },
  {
    isText: false,
    question: 'What is this utility type?',
    code: 'type PartialUser = Partial<User>;',
    answers: [
      [0, 'Makes all properties required'],
      [1, 'Makes all properties optional'],
      [2, 'Removes all properties'],
      [3, 'Copies type exactly'],
    ],
  },
  {
    isText: true,
    question: 'Does TypeScript compile to JavaScript?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      'interface Point {\n' +
      '    x: number;\n' +
      '    y: number;\n' +
      '}\n' +
      'const p: Point = { x: 10 };',
    answers: [
      [0, 'Point interface is wrong'],
      [1, 'Missing y property'],
      [2, 'X should be string'],
      [3, 'Const cannot use interface'],
    ],
  },
  {
    isText: true,
    question: 'What is the unknown type?',
    answers: [
      [0, 'Same as any'],
      [1, 'Type-safe any alternative'],
      [2, 'Invalid type'],
      [3, 'Number type'],
    ],
  },
  {
    isText: false,
    question: 'What does this type guard do?',
    code: 'if (typeof x === "string") { }',
    answers: [
      [0, 'Narrows type to string in block'],
      [1, 'Converts to string'],
      [2, 'Creates string'],
      [3, 'Deletes variable'],
    ],
  },
  {
    isText: true,
    question: 'Can abstract classes be instantiated?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'type User = {\n' + '    name: string;\n' + '    age number;\n' + '};',
    answers: [
      [0, 'Missing colon before number'],
      [1, 'Type syntax is wrong'],
      [2, 'Name should be number'],
      [3, 'Semicolons are invalid'],
    ],
  },
  {
    isText: true,
    question: 'What does the Pick utility type do?',
    answers: [
      [0, 'Removes properties'],
      [1, 'Selects specific properties'],
      [2, 'Adds properties'],
      [3, 'Validates properties'],
    ],
  },
  {
    isText: false,
    question: 'What does this readonly array mean?',
    code: 'const nums: readonly number[] = [1, 2, 3];',
    answers: [
      [0, 'Array cannot be modified'],
      [1, 'Array is empty'],
      [2, 'Array is optional'],
      [3, 'Syntax error'],
    ],
  },
  {
    isText: true,
    question: 'Does TypeScript support method overloading?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      'function getLength(s: string): number {\n' +
      '    return s.length\n' +
      '}',
    answers: [
      [0, 'No error, code is correct'],
      [1, 'String type is wrong'],
      [2, 'Length is not valid'],
      [3, 'Return type should be string'],
    ],
  },
  {
    isText: true,
    question: 'What does the as const assertion do?',
    answers: [
      [0, 'Makes value readonly and literal'],
      [1, 'Converts to constant'],
      [2, 'Removes type'],
      [3, 'Creates variable'],
    ],
  },
  {
    isText: false,
    question: 'What is this mapped type?',
    code: 'type ReadonlyUser = { readonly [K in keyof User]: User[K] };',
    answers: [
      [0, 'Makes all User properties readonly'],
      [1, 'Deletes all properties'],
      [2, 'Copies User exactly'],
      [3, 'Syntax error'],
    ],
  },
  {
    isText: true,
    question: 'Is strictNullChecks a compiler option?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code:
      'interface Animal {\n' +
      '    name: string;\n' +
      '}\n' +
      'interface Dog extends Animal {\n' +
      '    breed string;\n' +
      '}',
    answers: [
      [0, 'Extends is invalid'],
      [1, 'Missing colon before string'],
      [2, 'Animal interface is wrong'],
      [3, 'Dog should use class'],
    ],
  },
  {
    isText: true,
    question: 'What does the Omit utility type do?',
    answers: [
      [0, 'Adds properties'],
      [1, 'Excludes specific properties'],
      [2, 'Includes properties'],
      [3, 'Validates properties'],
    ],
  },
  {
    isText: false,
    question: 'What type does this infer?',
    code: 'let value = 42;',
    answers: [
      [0, 'any'],
      [1, 'string'],
      [2, 'number'],
      [3, 'unknown'],
    ],
  },
  {
    isText: true,
    question: 'Can namespaces be used in TypeScript?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code:
      'const user: { name: string; age: number } = {\n' +
      '    name: "Alice",\n' +
      '    age: "30"\n' +
      '};',
    answers: [
      [0, 'String assigned to age instead of number'],
      [1, 'Object syntax is wrong'],
      [2, 'Name should be number'],
      [3, 'Const is invalid'],
    ],
  },
];

const githubMockQuestions: QuizQuestion[] = [
  {
    isText: false,
    question: 'What does this command do?',
    code: 'git clone https://github.com/user/repo.git',
    answers: [
      [0, 'Deletes repository'],
      [1, 'Copies remote repository to local'],
      [2, 'Creates new repository'],
      [3, 'Pushes changes'],
    ],
  },
  {
    isText: true,
    question: 'What is a GitHub repository?',
    answers: [
      [0, 'Storage for project code and history'],
      [1, 'User profile'],
      [2, 'Issue tracker only'],
      [3, 'Documentation page'],
    ],
  },
  {
    isText: false,
    question: 'What does this sequence do?',
    code: 'git add .\n' + 'git commit -m "Update files"\n' + 'git push',
    answers: [
      [0, 'Pulls changes from remote'],
      [1, 'Stages, commits, and pushes changes'],
      [2, 'Creates new branch'],
      [3, 'Deletes files'],
    ],
  },
  {
    isText: true,
    question: 'Can you create branches in Git?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: 'git commit "Fixed bug"',
    answers: [
      [0, 'Missing -m flag before message'],
      [1, 'Commit is not a valid command'],
      [2, 'Message is too short'],
      [3, 'Missing git add first'],
    ],
  },
  {
    isText: true,
    question: 'What is a pull request?',
    answers: [
      [0, 'Request to merge changes'],
      [1, 'Request to delete branch'],
      [2, 'Request to clone repo'],
      [3, 'Request to create issue'],
    ],
  },
  {
    isText: false,
    question: 'What command creates a new branch?',
    code: 'git branch feature-login',
    answers: [
      [0, 'Deletes branch'],
      [1, 'Creates new branch named feature-login'],
      [2, 'Switches to branch'],
      [3, 'Merges branch'],
    ],
  },
  {
    isText: true,
    question: 'Is git the same as GitHub?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'What does this command do?',
    code: 'git pull origin main',
    answers: [
      [0, 'Pushes to main'],
      [1, 'Fetches and merges changes from main'],
      [2, 'Creates main branch'],
      [3, 'Deletes main branch'],
    ],
  },
  {
    isText: true,
    question: 'What file specifies files to ignore in Git?',
    answers: [
      [0, 'ignore.txt'],
      [1, '.gitignore'],
      [2, 'config.git'],
      [3, 'exclude.txt'],
    ],
  },
  {
    isText: false,
    question: 'What does this do?',
    code: 'git checkout -b new-feature',
    answers: [
      [0, 'Creates and switches to new branch'],
      [1, 'Deletes branch'],
      [2, 'Only creates branch'],
      [3, 'Commits changes'],
    ],
  },
  {
    isText: true,
    question: 'Can you fork a repository on GitHub?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code: 'git push origin master',
    answers: [
      [0, 'No error if master is default branch'],
      [1, 'Push is not valid'],
      [2, 'Origin is wrong'],
      [3, 'Master should be main'],
    ],
  },
  {
    isText: true,
    question: 'What is the main branch typically called now?',
    answers: [
      [0, 'master'],
      [1, 'main'],
      [2, 'trunk'],
      [3, 'primary'],
    ],
  },
  {
    isText: false,
    question: 'What does this command show?',
    code: 'git status',
    answers: [
      [0, 'Current branch and changes status'],
      [1, 'All branches'],
      [2, 'Commit history'],
      [3, 'Remote repositories'],
    ],
  },
  {
    isText: true,
    question: 'What are GitHub Issues used for?',
    answers: [
      [0, 'Storing code'],
      [1, 'Tracking bugs and tasks'],
      [2, 'Creating branches'],
      [3, 'Pushing commits'],
    ],
  },
  {
    isText: false,
    question: 'What does this do?',
    code: 'git merge feature-branch',
    answers: [
      [0, 'Merges feature-branch into current branch'],
      [1, 'Deletes feature-branch'],
      [2, 'Creates new branch'],
      [3, 'Pushes to remote'],
    ],
  },
  {
    isText: true,
    question: 'Does git store the entire project history?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: 'git add file.txt\ngit push',
    answers: [
      [0, 'Missing git commit between add and push'],
      [1, 'Add syntax is wrong'],
      [2, 'File.txt is invalid'],
      [3, 'Push needs branch name'],
    ],
  },
  {
    isText: true,
    question: 'What does README.md file typically contain?',
    answers: [
      [0, 'Source code'],
      [1, 'Project description and instructions'],
      [2, 'Git configuration'],
      [3, 'Commit history'],
    ],
  },
  {
    isText: false,
    question: 'What does this show?',
    code: 'git log',
    answers: [
      [0, 'Current status'],
      [1, 'Commit history'],
      [2, 'File list'],
      [3, 'Branch list'],
    ],
  },
  {
    isText: true,
    question: 'Can you collaborate with others on GitHub?',
    answers: [
      [0, 'Yes'],
      [1, 'No'],
    ],
  },
  {
    isText: false,
    question: 'What does this do?',
    code: 'git init',
    answers: [
      [0, 'Initializes new Git repository'],
      [1, 'Deletes repository'],
      [2, 'Clones repository'],
      [3, 'Pushes changes'],
    ],
  },
  {
    isText: true,
    question: 'What is a merge conflict?',
    answers: [
      [0, 'Deleted file'],
      [1, 'When same code changed differently'],
      [2, 'Empty commit'],
      [3, 'Missing branch'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code: 'git checkout main\ngit merge feature',
    answers: [
      [0, 'No error, merges feature into main'],
      [1, 'Checkout syntax is wrong'],
      [2, 'Merge needs -m flag'],
      [3, 'Main should be master'],
    ],
  },
  {
    isText: true,
    question: 'What does git fetch do?',
    answers: [
      [0, 'Deletes remote changes'],
      [1, 'Downloads remote changes without merging'],
      [2, 'Pushes local changes'],
      [3, 'Creates new branch'],
    ],
  },
  {
    isText: false,
    question: 'What does this command do?',
    code: 'git remote add origin https://github.com/user/repo.git',
    answers: [
      [0, 'Adds remote repository reference'],
      [1, 'Clones repository'],
      [2, 'Pushes changes'],
      [3, 'Creates branch'],
    ],
  },
  {
    isText: true,
    question: 'Is GitHub free for public repositories?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: 'git branch delete-me\ngit branch -d delete-me',
    answers: [
      [0, 'No error, creates then deletes branch'],
      [1, 'Branch command is invalid'],
      [2, '-d flag is wrong'],
      [3, 'Cannot delete same branch'],
    ],
  },
  {
    isText: true,
    question: 'What are GitHub Actions used for?',
    answers: [
      [0, 'Writing code'],
      [1, 'Creating issues'],
      [2, 'Automation and CI/CD'],
      [3, 'Merging branches'],
    ],
  },
  {
    isText: false,
    question: 'What does this show?',
    code: 'git diff',
    answers: [
      [0, 'Branch list'],
      [1, 'Changes not yet staged'],
      [2, 'Commit history'],
      [3, 'Remote repositories'],
    ],
  },
  {
    isText: true,
    question: 'Can you star repositories on GitHub?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'What does this do?',
    code: 'git reset HEAD~1',
    answers: [
      [0, 'Creates new commit'],
      [1, 'Undoes last commit (keeps changes)'],
      [2, 'Pushes to remote'],
      [3, 'Switches branch'],
    ],
  },
  {
    isText: true,
    question: 'What is a commit?',
    answers: [
      [0, 'Snapshot of changes at a point in time'],
      [1, 'Branch name'],
      [2, 'Remote repository'],
      [3, 'Merge conflict'],
    ],
  },
  {
    isText: false,
    question: 'Find the error',
    code: 'git push',
    answers: [
      [0, 'No error if upstream is set'],
      [1, 'Push is not valid command'],
      [2, 'Missing commit message'],
      [3, 'Needs -m flag'],
    ],
  },
  {
    isText: true,
    question: 'What does the .git folder contain?',
    answers: [
      [0, 'Project files'],
      [1, 'Repository metadata and history'],
      [2, 'README file'],
      [3, 'Ignored files'],
    ],
  },
  {
    isText: false,
    question: 'What does this create?',
    code: 'echo "node_modules/" >> .gitignore',
    answers: [
      [0, 'Adds node_modules to ignore list'],
      [1, 'Deletes node_modules'],
      [2, 'Creates node_modules folder'],
      [3, 'Commits node_modules'],
    ],
  },
  {
    isText: true,
    question: 'Can you revert a commit after pushing?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'What does this do?',
    code: 'git stash',
    answers: [
      [0, 'Temporarily saves uncommitted changes'],
      [1, 'Commits changes'],
      [2, 'Pushes to remote'],
      [3, 'Creates branch'],
    ],
  },
  {
    isText: true,
    question: 'What is origin in Git?',
    answers: [
      [0, 'Default name for remote repository'],
      [1, 'Main branch name'],
      [2, 'Commit message'],
      [3, 'Local folder name'],
    ],
  },
  {
    isText: false,
    question: 'Find the problem',
    code: 'git comit -m "Fix typo"',
    answers: [
      [0, 'Typo: comit should be commit'],
      [1, '-m flag is wrong'],
      [2, 'Message is invalid'],
      [3, 'Git command is wrong'],
    ],
  },
  {
    isText: true,
    question: 'What is GitHub Pages used for?',
    answers: [
      [0, 'Storing code'],
      [1, 'Hosting static websites'],
      [2, 'Creating issues'],
      [3, 'Managing branches'],
    ],
  },
  {
    isText: false,
    question: 'What does this command do?',
    code: 'git tag v1.0.0',
    answers: [
      [0, 'Creates a tag for version 1.0.0'],
      [1, 'Creates branch'],
      [2, 'Commits changes'],
      [3, 'Pushes to remote'],
    ],
  },
  {
    isText: true,
    question: 'Does GitHub support private repositories?',
    answers: [
      [0, 'No'],
      [1, 'Yes'],
    ],
  },
  {
    isText: false,
    question: 'What does this show?',
    code: 'git branch',
    answers: [
      [0, 'Commit history'],
      [1, 'List of all branches'],
      [2, 'Current status'],
      [3, 'Remote repositories'],
    ],
  },
];

export const HTMLQuizParams: QuizProps = {
  quizName: 'HTML quiz',
  questions: htmlMockQuestions,
  rightAnswers: [
    1, 1, 2, 1, 2, 0, 1, 0, 2, 3, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0,
    1, 1, 1, 1, 3, 0, 1, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1, 2, 3, 1, 2,
  ],
};

export const CSSQuizParams: QuizProps = {
  quizName: 'CSS quiz',
  questions: cssMockQuestions,
  rightAnswers: [
    2, 1, 0, 2, 2, 2, 1, 1, 2, 1, 2, 0, 1, 3, 0, 1, 0, 1, 3, 1, 1, 0, 1, 0, 2,
    1, 2, 1, 0, 2, 0, 3, 1, 1, 2, 1, 1, 2, 1, 1, 3, 2, 2, 1, 3, 1, 3,
  ],
};

export const JSQuizParams: QuizProps = {
  quizName: 'JavaScript quiz',
  questions: jsMockQuestions,
  rightAnswers: [
    1, 2, 1, 1, 2, 0, 2, 1, 1, 3, 0, 1, 0, 2, 1, 1, 0, 1, 1, 1, 1, 2, 2, 1, 0,
    1, 1, 1, 1, 2, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 1, 0,
  ],
};

export const TSQuizParams: QuizProps = {
  quizName: 'TypeScript quiz',
  questions: tsMockQuestions,
  rightAnswers: [
    1, 1, 1, 1, 0, 0, 1, 0, 1, 2, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 2, 1, 0,
  ],
};

export const GitHubQuizParams: QuizProps = {
  quizName: 'GitHub quiz',
  questions: githubMockQuestions,
  rightAnswers: [
    1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0,
    1, 0, 1, 0, 2, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1,
  ],
};
