import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import { Nav } from './Nav';
import { AuthProvider } from '@/shared/context/authContext';

const renderWithProviders = (component: ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe('Nav', () => {
  it('renders nav', () => {
    renderWithProviders(<Nav isAuthorized={true} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should render About, Login links if isAuthorized is false ', () => {
    renderWithProviders(<Nav isAuthorized={false} />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
    const aboutLink = screen.getByText('About');
    const loginLink = screen.getByText('Login');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('should render About, Dashboard, Library, Profile links if isAuthorized is true ', () => {
    renderWithProviders(<Nav isAuthorized={true} />);
    expect(screen.getAllByRole('link')).toHaveLength(5);
    const aboutLink = screen.getByText('About');
    const dashboardLink = screen.getByText('Dashboard');
    const libraryLink = screen.getByText('Library');
    const profileLink = screen.getByText('Profile');
    const logOutButton = screen.getByText('logOut');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(libraryLink).toHaveAttribute('href', '/library');
    expect(profileLink).toHaveAttribute('href', '/profile');
    expect(logOutButton).toHaveAttribute('href', '/login');
  });
});
