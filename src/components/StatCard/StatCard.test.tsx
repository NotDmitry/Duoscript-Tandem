import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import StatCard from './StatCard';

describe('StatCard', () => {
  test('renders title correctly', () => {
    render(<StatCard title="⏱ Minutes" value={45} />);
    expect(screen.getByText('⏱ Minutes')).toBeInTheDocument();
  });

  test('renders numeric value correctly', () => {
    render(<StatCard title="🔥 Streak" value={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('renders string value correctly', () => {
    render(<StatCard title="✔ Activities" value="completed" />);
    expect(screen.getByText('completed')).toBeInTheDocument();
  });

  test('renders both title and value together', () => {
    render(<StatCard title="⏱ Minutes" value={45} />);
    expect(screen.getByText('⏱ Minutes')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });
});
