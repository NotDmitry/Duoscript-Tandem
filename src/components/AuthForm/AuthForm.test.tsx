import { render, screen, within } from '@testing-library/react';
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
    expect(text).not.toBeNull();
  });
  it('renders inputs - text, password if mode LOGIN', () => {
    renderWithRouter(<AuthForm mode="LOGIN" />);
    const form = screen.getAllByRole('form');

    const nicknameInput = within(form[0]).getByPlaceholderText('Nickname');
    const passwordInput = within(form[0]).getByPlaceholderText('Password');
    expect(nicknameInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
  });
  it('renders input - repeat password if mode SIGN UP', () => {
    renderWithRouter(<AuthForm mode="SIGN UP" />);
    const form = screen.getAllByRole('form');

    const repeatPasswordInput = within(form[0]).getByPlaceholderText(
      'Repeat Password'
    );
    expect(repeatPasswordInput).not.toBeNull();
  });
});
