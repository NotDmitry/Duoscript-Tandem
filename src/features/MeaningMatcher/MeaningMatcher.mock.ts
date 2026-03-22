import type {
  MeaningMatcherProps,
  Difficulty,
  MeaningMatcherType,
} from './MeaningMatcher.types';

export type MatchingLevels = Record<Difficulty, MeaningMatcherProps>;

// HTML
export const HTMLMatching: MatchingLevels = {
  easy: {
    title: 'HTML Basics (Easy)',
    pairs: [
      { id: 1, left: '<a>', right: 'Creates a hyperlink' },
      { id: 2, left: '<img>', right: 'Embeds an image' },
      { id: 3, left: '<div>', right: 'Generic container' },
      { id: 4, left: '<button>', right: 'Clickable button' },
    ],
  },
  medium: {
    title: 'HTML Intermediate (Medium)',
    pairs: [
      { id: 1, left: '<a>', right: 'Creates a hyperlink' },
      { id: 2, left: '<img>', right: 'Embeds an image' },
      { id: 3, left: '<form>', right: 'Collects user input' },
      { id: 4, left: '<input>', right: 'Input field for data' },
      { id: 5, left: '<ul>', right: 'Unordered list' },
      { id: 6, left: '<ol>', right: 'Ordered list' },
    ],
  },
  hard: {
    title: 'HTML Advanced (Hard)',
    pairs: [
      { id: 1, left: '<a>', right: 'Creates a hyperlink' },
      { id: 2, left: '<img>', right: 'Embeds an image' },
      { id: 3, left: '<form>', right: 'Collects user input' },
      { id: 4, left: '<input>', right: 'Input field for data' },
      { id: 5, left: '<button>', right: 'Clickable button' },
      { id: 6, left: '<ul>', right: 'Unordered list' },
      { id: 7, left: '<ol>', right: 'Ordered list' },
      { id: 8, left: '<div>', right: 'Generic container' },
    ],
  },
};

// CSS
export const CSSMatching: MatchingLevels = {
  easy: {
    title: 'CSS Basics (Easy)',
    pairs: [
      { id: 1, left: 'display', right: 'Defines layout behavior' },
      { id: 2, left: 'margin', right: 'Outer spacing' },
      { id: 3, left: 'padding', right: 'Inner spacing' },
      { id: 4, left: 'color', right: 'Sets text color' },
    ],
  },
  medium: {
    title: 'CSS Intermediate (Medium)',
    pairs: [
      { id: 1, left: 'display', right: 'Defines layout behavior' },
      { id: 2, left: 'margin', right: 'Outer spacing' },
      { id: 3, left: 'padding', right: 'Inner spacing' },
      { id: 4, left: 'position', right: 'Controls positioning' },
      { id: 5, left: 'flex', right: 'Flexible layout system' },
      { id: 6, left: 'grid', right: 'Two-dimensional layout' },
    ],
  },
  hard: {
    title: 'CSS Advanced (Hard)',
    pairs: [
      { id: 1, left: 'display', right: 'Defines layout behavior' },
      { id: 2, left: 'margin', right: 'Outer spacing' },
      { id: 3, left: 'padding', right: 'Inner spacing' },
      { id: 4, left: 'position', right: 'Controls positioning' },
      { id: 5, left: 'flex', right: 'Flexible layout system' },
      { id: 6, left: 'grid', right: 'Two-dimensional layout' },
      { id: 7, left: 'overflow', right: 'Handles overflow' },
      { id: 8, left: 'z-index', right: 'Controls stacking order' },
    ],
  },
};

// JS
export const JSMatching: MatchingLevels = {
  easy: {
    title: 'JavaScript Basics (Easy)',
    pairs: [
      { id: 1, left: '.map()', right: 'Transforms elements' },
      { id: 2, left: '.filter()', right: 'Filters elements' },
      { id: 3, left: '.find()', right: 'Finds first match' },
      { id: 4, left: '.includes()', right: 'Checks if value exists' },
    ],
  },
  medium: {
    title: 'JavaScript Intermediate (Medium)',
    pairs: [
      { id: 1, left: '.map()', right: 'Transforms elements' },
      { id: 2, left: '.filter()', right: 'Filters elements' },
      { id: 3, left: '.reduce()', right: 'Reduces to one value' },
      { id: 4, left: '.find()', right: 'Finds first match' },
      { id: 5, left: '.some()', right: 'Checks if any match' },
      { id: 6, left: '.every()', right: 'Checks if all match' },
    ],
  },
  hard: {
    title: 'JavaScript Advanced (Hard)',
    pairs: [
      { id: 1, left: '.map()', right: 'Transforms elements' },
      { id: 2, left: '.filter()', right: 'Filters elements' },
      { id: 3, left: '.reduce()', right: 'Reduces to one value' },
      { id: 4, left: '.find()', right: 'Finds first match' },
      { id: 5, left: '.some()', right: 'Checks if any match' },
      { id: 6, left: '.every()', right: 'Checks if all match' },
      { id: 7, left: '.includes()', right: 'Checks if value exists' },
      { id: 8, left: '.forEach()', right: 'Runs function for each' },
    ],
  },
};

// TS
export const TSMatching: MatchingLevels = {
  easy: {
    title: 'TypeScript Basics (Easy)',
    pairs: [
      { id: 1, left: 'interface', right: 'Defines object shape' },
      { id: 2, left: 'type', right: 'Type alias' },
      { id: 3, left: 'enum', right: 'Named constants' },
      { id: 4, left: 'any', right: 'Disables type checking' },
    ],
  },
  medium: {
    title: 'TypeScript Intermediate (Medium)',
    pairs: [
      { id: 1, left: 'interface', right: 'Defines object shape' },
      { id: 2, left: 'type', right: 'Type alias' },
      { id: 3, left: 'enum', right: 'Named constants' },
      { id: 4, left: 'unknown', right: 'Safer than any' },
      { id: 5, left: 'union', right: 'Multiple possible types' },
      { id: 6, left: 'intersection', right: 'Combines types' },
    ],
  },
  hard: {
    title: 'TypeScript Advanced (Hard)',
    pairs: [
      { id: 1, left: 'interface', right: 'Defines object shape' },
      { id: 2, left: 'type', right: 'Type alias' },
      { id: 3, left: 'enum', right: 'Named constants' },
      { id: 4, left: 'unknown', right: 'Safer than any' },
      { id: 5, left: 'never', right: 'Impossible value' },
      { id: 6, left: 'union', right: 'Multiple possible types' },
      { id: 7, left: 'intersection', right: 'Combines types' },
      { id: 8, left: 'generics', right: 'Reusable types' },
    ],
  },
};

// GitHub
export const GitHubMatching: MatchingLevels = {
  easy: {
    title: 'GitHub Basics (Easy)',
    pairs: [
      { id: 1, left: 'repository', right: 'Project storage' },
      { id: 2, left: 'commit', right: 'Saved change' },
      { id: 3, left: 'push', right: 'Upload changes' },
      { id: 4, left: 'clone', right: 'Download repo' },
    ],
  },
  medium: {
    title: 'GitHub Intermediate (Medium)',
    pairs: [
      { id: 1, left: 'repository', right: 'Project storage' },
      { id: 2, left: 'commit', right: 'Saved change' },
      { id: 3, left: 'branch', right: 'Separate development line' },
      { id: 4, left: 'merge', right: 'Combine branches' },
      { id: 5, left: 'pull request', right: 'Propose changes' },
      { id: 6, left: 'fork', right: 'Copy repository' },
    ],
  },
  hard: {
    title: 'GitHub Advanced (Hard)',
    pairs: [
      { id: 1, left: 'repository', right: 'Project storage' },
      { id: 2, left: 'commit', right: 'Saved change' },
      { id: 3, left: 'branch', right: 'Separate development line' },
      { id: 4, left: 'merge', right: 'Combine branches' },
      { id: 5, left: 'pull request', right: 'Propose changes' },
      { id: 6, left: 'fork', right: 'Copy repository' },
      { id: 7, left: 'clone', right: 'Download repo' },
      { id: 8, left: 'push', right: 'Upload changes' },
    ],
  },
};

export const topicsMap: Record<MeaningMatcherType, MatchingLevels> = {
  html: HTMLMatching,
  css: CSSMatching,
  javascript: JSMatching,
  typescript: TSMatching,
  github: GitHubMatching,
};
