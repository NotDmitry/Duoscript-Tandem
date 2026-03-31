import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import { Header } from './Header';
import { AuthProvider } from '@context/authContext';
import { UIProvider } from '@context/UIContext';
import { vi } from 'vitest';
import * as authApi from '@api/auth.api';

const mockUser = {
  uid: 'test_uid',
  displayName: 'Test User',
  email: 'test@example.com',
};

const renderWithProvidersAuthorized = (component: ReactElement) => {
  vi.spyOn(authApi, 'getCurrentUser').mockReturnValue(mockUser);
  return render(
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>{component}</AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
};

const renderWithProvidersGuest = (component: ReactElement) => {
  vi.spyOn(authApi, 'getCurrentUser').mockReturnValue(null);
  return render(
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>{component}</AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  afterEach(() => {
    vi.restoreAllMocks();
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
