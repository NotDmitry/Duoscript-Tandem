import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import { Nav } from './Nav';

const renderWithRouter = (component: ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Nav', () => {
  it('renders nav', () => {
    renderWithRouter(<Nav isAuthorized={true} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should render About, Login links if isAuthorized is false ', () => {
    renderWithRouter(<Nav isAuthorized={false} />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
    const aboutLink = screen.getByText('About');
    const loginLink = screen.getByText('Login');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('should render About, Dashboard, Library, Profile links if isAuthorized is true ', () => {
    renderWithRouter(<Nav isAuthorized={true} />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
    const aboutLink = screen.getByText('About');
    const dashboardLink = screen.getByText('Dashboard');
    const libraryLink = screen.getByText('Library');
    const profileLink = screen.getByText('Profile');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(libraryLink).toHaveAttribute('href', '/library');
    expect(profileLink).toHaveAttribute('href', '/profile');
  });
});
