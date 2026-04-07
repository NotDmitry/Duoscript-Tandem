import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import { RegisterForm } from '@features/Auth/RegisterForm';
import { AuthProvider } from '@context/authContext';
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

describe('RegisterForm', () => {
  it('renders repeatPassword field', () => {
    renderWithProviders(<RegisterForm />);
    const repeatPasswordInput = screen.getByPlaceholderText('Repeat Password');
    expect(repeatPasswordInput).toBeInTheDocument();
  });
});
