import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import { LoginForm } from '@features/Auth/LoginForm';
import { AuthProvider } from '@context/authContext';
import { vi } from 'vitest';
import * as Hook from '@hooks/useSubmit';
import userEvent from '@testing-library/user-event';
import { UIProvider } from '@context/UIContext';

const renderWithProviders = (component: ReactElement) => {
  return render(
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>{component}</AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
};

const mockHandleSubmit = vi.fn();

describe('LoginForm', () => {
  it('renders title', () => {
    renderWithProviders(<LoginForm />);
    const text = screen.getByText('WELCOME');
    expect(text).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('submits form correctly', async () => {
    vi.spyOn(Hook, 'useSubmit').mockReturnValue({
      handleSubmit: mockHandleSubmit,
      isLoading: false,
      isSuccess: false,
      setIsSuccess: vi.fn(),
    });
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(emailInput, 'anelka@example.com');
    await userEvent.type(passwordInput, 'User123!');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
