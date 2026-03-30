import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import { Header } from './Header';
import { AuthProvider } from '@/shared/context/authContext';

const renderWithProvidersAuthorized = (component: ReactElement) => {
  localStorage.setItem('auth_uid', 'user_1');
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

const renderWithProvidersGuest = (component: ReactElement) => {
  localStorage.removeItem('auth_uid');
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('renders header', () => {
    renderWithProvidersAuthorized(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should render logOut if User is Authorized', async () => {
    renderWithProvidersAuthorized(<Header />);
    const logOutLink = await screen.findByRole('link', { name: /logout/i });
    expect(logOutLink).toBeInTheDocument();
  });

  it('should render login if guest', () => {
    renderWithProvidersGuest(<Header />);
    const loginLink = screen.getByText('Login');
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('logs out and shows Login link', async () => {
    renderWithProvidersAuthorized(<Header />);
    const user = userEvent.setup();

    const logOutLink = await screen.findByRole('link', { name: /logout/i });
    await user.click(logOutLink);

    const loginLink = await screen.findByText('Login');
    expect(loginLink).toBeInTheDocument();
  });
});
