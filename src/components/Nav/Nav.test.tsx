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
    expect(nav).not.toBeNull();
  });
  it('should render About, Login links if isAuthorized is false ', () => {
    const { container } = renderWithRouter(<Nav isAuthorized={false} />);
    const navElement = container.querySelector('nav');
    const links = Array.from(navElement?.querySelectorAll('a') ?? []);
    expect(links).toHaveLength(2);
    const aboutLink = links.find((item) => item.textContent === 'About');
    const loginLink = links.find((item) => item.textContent === 'Login');
    expect(aboutLink?.getAttribute('href')).toContain('/about');
    expect(loginLink?.getAttribute('href')).toContain('/login');
  });
  it('should render About, Dashboard, Library, Profile links if isAuthorized is true ', () => {
    const { container } = renderWithRouter(<Nav isAuthorized={true} />);
    const navElement = container.querySelector('nav');
    const links = Array.from(navElement?.querySelectorAll('a') ?? []);
    expect(links).toHaveLength(4);
    const aboutLink = links.find((item) => item.textContent === 'About');
    const dashboardLink = links.find(
      (item) => item.textContent === 'Dashboard'
    );
    const libraryLink = links.find((item) => item.textContent === 'Library');
    const profileLink = links.find((item) => item.textContent === 'Profile');
    expect(aboutLink?.getAttribute('href')).toContain('/about');
    expect(dashboardLink?.getAttribute('href')).toContain('/dashboard');
    expect(libraryLink?.getAttribute('href')).toContain('/library');
    expect(profileLink?.getAttribute('href')).toContain('/profile');
  });
});
