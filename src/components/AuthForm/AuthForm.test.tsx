import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import AuthForm from './AuthForm';
import { AuthProvider } from '@/shared/context/authContext';
import { vi } from 'vitest';
import * as Hook from '@/shared/hooks/useAuthSubmit';
import userEvent from '@testing-library/user-event';

const renderWithProviders = (component: ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};
const mockHandleSubmit = vi.fn();

describe('AuthForm', () => {
  it('renders title', () => {
    renderWithProviders(<AuthForm mode="LOGIN" />);
    const text = screen.getByText('WELCOME');
    expect(text).toBeInTheDocument();
  });

  it('renders inputs - text, password if mode LOGIN', () => {
    renderWithProviders(<AuthForm mode="LOGIN" />);
    const nicknameInput = screen.getByPlaceholderText('Nickname');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(nicknameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders input - repeat password if mode SIGN UP', () => {
    renderWithProviders(<AuthForm mode="SIGN UP" />);
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    expect(repeatPasswordInput).toBeInTheDocument();
  });
  it('submits form correctly', async () => {
    vi.spyOn(Hook, 'useAuthSubmit').mockReturnValue({
      handleAuthSubmit: mockHandleSubmit,
      isLoading: false,
      isSuccess: '',
      setIsSuccess: vi.fn(),
    });
    renderWithProviders(<AuthForm mode="LOGIN" />);

    const nicknameInput = screen.getByPlaceholderText('Nickname');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(nicknameInput, 'User');
    await userEvent.type(passwordInput, 'User123!');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockHandleSubmit).toHaveBeenCalledWith({
      nickname: 'User',
      password: 'User123!',
    });
  });
});
