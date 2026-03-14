import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import AuthForm from './AuthForm';

const renderWithRouter = (component: ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AuthForm', () => {
  it('renders title', () => {
    renderWithRouter(<AuthForm mode="LOGIN" />);
    const text = screen.getByText('WELCOME');
    expect(text).toBeInTheDocument();
  });

  it('renders inputs - text, password if mode LOGIN', () => {
    renderWithRouter(<AuthForm mode="LOGIN" />);
    const nicknameInput = screen.getByPlaceholderText('Nickname');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(nicknameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders input - repeat password if mode SIGN UP', () => {
    renderWithRouter(<AuthForm mode="SIGN UP" />);
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    expect(repeatPasswordInput).toBeInTheDocument();
  });
});
