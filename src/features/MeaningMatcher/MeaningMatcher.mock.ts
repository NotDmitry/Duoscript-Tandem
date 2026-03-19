import type { MeaningMatcherProps } from './MeaningMatcher.types';

export const HTMLMatchingParams: MeaningMatcherProps = {
  title: 'Match HTML tags with their meanings',
  pairs: [
    { id: 1, left: '<a>', right: 'Creates a hyperlink' },
    { id: 2, left: '<img>', right: 'Displays an image' },
    { id: 3, left: '<form>', right: 'Creates a form for user input' },
  ],
};

export const CSSMatchingParams: MeaningMatcherProps = {
  title: 'Match CSS properties with their meanings',
  pairs: [
    { id: 1, left: 'display', right: 'Defines how an element is displayed' },
    { id: 2, left: 'margin', right: 'Controls outer spacing' },
    { id: 3, left: 'padding', right: 'Controls inner spacing' },
  ],
};

export const JSMatchingParams: MeaningMatcherProps = {
  title: 'Match array methods with their meanings',
  pairs: [
    {
      id: 1,
      left: '.map()',
      right: 'Creates a new array by transforming each element',
    },
    {
      id: 2,
      left: '.filter()',
      right: 'Returns elements that pass a condition',
    },
    {
      id: 3,
      left: '.reduce()',
      right: 'Reduces array to a single value',
    },
  ],
};

export const TSMatchingParams: MeaningMatcherProps = {
  title: 'Match TypeScript concepts with their meanings',
  pairs: [
    { id: 1, left: 'interface', right: 'Defines the shape of an object' },
    { id: 2, left: 'type', right: 'Creates a custom type alias' },
    { id: 3, left: 'enum', right: 'Defines a set of named constants' },
  ],
};

export const GitHubMatchingParams: MeaningMatcherProps = {
  title: 'Match GitHub terms with their meanings',
  pairs: [
    { id: 1, left: 'repository', right: 'Project storage location' },
    { id: 2, left: 'commit', right: 'A saved change in the project' },
    { id: 3, left: 'pull request', right: 'Propose changes to a repository' },
  ],
};
