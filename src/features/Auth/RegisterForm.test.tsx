import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import { RegisterForm } from '@/features/Auth/RegisterForm.tsx';
import { AuthProvider } from '@/shared/context/authContext.tsx';
import { UIProvider } from '@/shared/context/UIContext.tsx';

const renderWithProviders = (component: ReactElement) => {
  return render(
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>{component}</AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
};

describe('RegisterForm', () => {
  it('renders repeatPassword field', () => {
    renderWithProviders(<RegisterForm />);
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    expect(repeatPasswordInput).toBeInTheDocument();
  });
});
