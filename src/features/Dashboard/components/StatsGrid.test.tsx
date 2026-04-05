import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import StatsGrid from './StatsGrid';
import { mockUserDashboard } from '@/mocks/user.mock';

describe('StatsGrid', () => {
  test('renders Learning Today title', () => {
    render(<StatsGrid data={mockUserDashboard} />);
    expect(screen.getByText('Learning Today')).toBeInTheDocument();
  });

  test('renders minutes value', () => {
    render(<StatsGrid data={mockUserDashboard} />);
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  test('renders activities value', () => {
    render(<StatsGrid data={mockUserDashboard} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('renders streak value', () => {
    render(<StatsGrid data={mockUserDashboard} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('renders all three stat cards', () => {
    render(<StatsGrid data={mockUserDashboard} />);
    expect(screen.getByText('⏱ Minutes')).toBeInTheDocument();
    expect(screen.getByText('✔ Activities')).toBeInTheDocument();
    expect(screen.getByText('🔥 Streak')).toBeInTheDocument();
  });
});
