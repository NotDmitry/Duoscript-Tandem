import type { WidgetView, MeaningMatcherConfig } from '@models/widgetModel';

const htmlMatcherWidget: WidgetView<MeaningMatcherConfig> = {
  widgetId: 'widget_matcher_html',
  type: 'meaningMatcher',
  topic: 'html',
  config: {
    easy: {
      title: 'Common Tags',
      pairs: [
        { id: 1, left: '<a>', right: 'Creates a hyperlink' },
        { id: 2, left: '<img>', right: 'Embeds an image' },
        { id: 3, left: '<div>', right: 'Generic container' },
        { id: 4, left: '<button>', right: 'Clickable button' },
      ],
    },
    medium: {
      title: 'Forms & Lists',
      pairs: [
        { id: 1, left: '<form>', right: 'Collects user input' },
        { id: 2, left: '<input>', right: 'Input field for data' },
        { id: 3, left: '<label>', right: 'Label for an input' },
        { id: 4, left: '<select>', right: 'Dropdown list' },
        { id: 5, left: '<ul>', right: 'Unordered list' },
        { id: 6, left: '<ol>', right: 'Ordered list' },
      ],
    },
    hard: {
      title: 'Semantic Tags',
      pairs: [
        { id: 1, left: '<header>', right: 'Page or section header' },
        { id: 2, left: '<nav>', right: 'Navigation links' },
        { id: 3, left: '<main>', right: 'Main content area' },
        { id: 4, left: '<section>', right: 'Thematic grouping' },
        { id: 5, left: '<article>', right: 'Self-contained content' },
        { id: 6, left: '<footer>', right: 'Page or section footer' },
        { id: 7, left: '<aside>', right: 'Side content' },
        { id: 8, left: '<figure>', right: 'Self-contained media' },
      ],
    },
  },
};

const cssMatcherWidget: WidgetView<MeaningMatcherConfig> = {
  widgetId: 'widget_matcher_css',
  type: 'meaningMatcher',
  topic: 'css',
  config: {
    easy: {
      title: 'Core Properties',
      pairs: [
        { id: 1, left: 'color', right: 'Sets text color' },
        { id: 2, left: 'margin', right: 'Outer spacing' },
        { id: 3, left: 'padding', right: 'Inner spacing' },
        { id: 4, left: 'display', right: 'Defines layout behavior' },
      ],
    },
    medium: {
      title: 'Sizing & Position',
      pairs: [
        { id: 1, left: 'position', right: 'Controls positioning' },
        { id: 2, left: 'display: flex', right: 'Flexible layout system' },
        { id: 3, left: 'width', right: 'Sets element width' },
        { id: 4, left: 'height', right: 'Sets element height' },
        { id: 5, left: 'border', right: 'Adds border around element' },
        { id: 6, left: 'font-size', right: 'Sets text size' },
      ],
    },
    hard: {
      title: 'Layout & Effects',
      pairs: [
        { id: 1, left: 'display: grid', right: 'Two-dimensional layout' },
        { id: 2, left: 'overflow', right: 'Handles overflow content' },
        { id: 3, left: 'z-index', right: 'Controls stacking order' },
        { id: 4, left: 'opacity', right: 'Sets element transparency' },
        { id: 5, left: 'transition', right: 'Animates property changes' },
        { id: 6, left: 'box-shadow', right: 'Adds shadow to element' },
        { id: 7, left: 'border-radius', right: 'Rounds element corners' },
        { id: 8, left: 'cursor', right: 'Changes cursor appearance' },
      ],
    },
  },
};

const jsMatcherWidget: WidgetView<MeaningMatcherConfig> = {
  widgetId: 'widget_matcher_js',
  type: 'meaningMatcher',
  topic: 'js',
  config: {
    easy: {
      title: 'Array Methods',
      pairs: [
        { id: 1, left: '.map()', right: 'Transforms each element' },
        { id: 2, left: '.filter()', right: 'Filters by condition' },
        { id: 3, left: '.find()', right: 'Finds first match' },
        { id: 4, left: '.includes()', right: 'Checks if value exists' },
      ],
    },
    medium: {
      title: 'More Array Methods',
      pairs: [
        { id: 1, left: '.reduce()', right: 'Reduces to one value' },
        { id: 2, left: '.some()', right: 'True if any match' },
        { id: 3, left: '.every()', right: 'True if all match' },
        { id: 4, left: '.forEach()', right: 'Runs function for each' },
        { id: 5, left: '.findIndex()', right: 'Finds index of first match' },
        { id: 6, left: '.flat()', right: 'Flattens nested arrays' },
      ],
    },
    hard: {
      title: 'Objects & Strings',
      pairs: [
        { id: 1, left: 'Object.keys()', right: 'Returns array of keys' },
        { id: 2, left: 'Object.values()', right: 'Returns array of values' },
        { id: 3, left: 'Object.entries()', right: 'Returns key-value pairs' },
        { id: 4, left: 'JSON.parse()', right: 'Converts string to object' },
        { id: 5, left: '.split()', right: 'Splits string into array' },
        { id: 6, left: '.trim()', right: 'Removes whitespace' },
        { id: 7, left: '.replace()', right: 'Replaces part of string' },
        { id: 8, left: 'Array.from()', right: 'Creates array from iterable' },
      ],
    },
  },
};

const tsMatcherWidget: WidgetView<MeaningMatcherConfig> = {
  widgetId: 'widget_matcher_ts',
  type: 'meaningMatcher',
  topic: 'ts',
  config: {
    easy: {
      title: 'Core Keywords',
      pairs: [
        { id: 1, left: 'interface', right: 'Defines object shape' },
        { id: 2, left: 'type', right: 'Type alias' },
        { id: 3, left: 'enum', right: 'Named constants' },
        { id: 4, left: 'any', right: 'Disables type checking' },
      ],
    },
    medium: {
      title: 'Type System',
      pairs: [
        { id: 1, left: 'unknown', right: 'Safer alternative to any' },
        { id: 2, left: 'never', right: 'Represents impossible value' },
        { id: 3, left: 'A | B', right: 'Multiple possible types' },
        { id: 4, left: 'A & B', right: 'Combines multiple types' },
        { id: 5, left: 'readonly', right: 'Prevents property mutation' },
        { id: 6, left: 'prop?', right: 'Marks property as optional' },
      ],
    },
    hard: {
      title: 'Utility Types',
      pairs: [
        { id: 1, left: 'T<Generic>', right: 'Reusable type parameter' },
        { id: 2, left: 'keyof T', right: 'Union of object keys' },
        { id: 3, left: 'typeof x', right: 'Infers type of a value' },
        { id: 4, left: 'Partial<T>', right: 'Makes all props optional' },
        { id: 5, left: 'Required<T>', right: 'Makes all props required' },
        { id: 6, left: 'Pick<T, K>', right: 'Picks subset of props' },
        { id: 7, left: 'Omit<T, K>', right: 'Removes subset of props' },
        { id: 8, left: 'ReturnType<T>', right: 'Infers function return type' },
      ],
    },
  },
};

const githubMatcherWidget: WidgetView<MeaningMatcherConfig> = {
  widgetId: 'widget_matcher_github',
  type: 'meaningMatcher',
  topic: 'github',
  config: {
    easy: {
      title: 'Core Commands',
      pairs: [
        { id: 1, left: 'repository', right: 'Project storage' },
        { id: 2, left: 'commit', right: 'Saved snapshot of changes' },
        { id: 3, left: 'push', right: 'Upload commits to remote' },
        { id: 4, left: 'clone', right: 'Download repo locally' },
      ],
    },
    medium: {
      title: 'Branching',
      pairs: [
        { id: 1, left: 'branch', right: 'Separate development line' },
        { id: 2, left: 'merge', right: 'Combine branches together' },
        { id: 3, left: 'pull', right: 'Fetch and merge from remote' },
        { id: 4, left: 'fetch', right: 'Download without merging' },
        { id: 5, left: 'checkout', right: 'Switch to another branch' },
        { id: 6, left: 'stash', right: 'Temporarily saves changes' },
      ],
    },
    hard: {
      title: 'Collaboration',
      pairs: [
        { id: 1, left: 'pull request', right: 'Propose changes for review' },
        { id: 2, left: 'fork', right: 'Personal copy of a repository' },
        { id: 3, left: 'rebase', right: 'Reapply commits on new base' },
        { id: 4, left: 'cherry-pick', right: 'Apply a specific commit' },
        { id: 5, left: 'tag', right: 'Marks a specific commit' },
        { id: 6, left: 'git log', right: 'Shows commit history' },
        { id: 7, left: 'reset', right: 'Undoes commits locally' },
        { id: 8, left: 'revert', right: 'Undoes commit safely' },
      ],
    },
  },
};

export const meaningMatcherWidgetMocks: Record<
  string,
  WidgetView<MeaningMatcherConfig>
> = {
  widget_matcher_html: htmlMatcherWidget,
  widget_matcher_css: cssMatcherWidget,
  widget_matcher_js: jsMatcherWidget,
  widget_matcher_ts: tsMatcherWidget,
  widget_matcher_github: githubMatcherWidget,
};
