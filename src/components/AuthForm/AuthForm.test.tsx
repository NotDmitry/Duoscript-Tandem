import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import AuthForm from './AuthForm';
import { AuthProvider } from '@/shared/context/authContext';

const renderWithProviders = (component: ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

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
  });

  it('renders input - repeat password if mode SIGN UP', () => {
    renderWithProviders(<AuthForm mode="SIGN UP" />);
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    expect(repeatPasswordInput).toBeInTheDocument();
  });
});
