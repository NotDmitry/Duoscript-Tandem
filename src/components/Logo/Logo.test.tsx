import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Logo } from './Logo';
import { beforeEach } from 'vitest';

const renderLogoWithRouter = () => {
  render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
};

describe('Logo', () => {
  beforeEach(() => {
    renderLogoWithRouter();
  });

  it('renders label', () => {
    const text = screen.getByText('Duoscript-Tandem');
    expect(text).toBeInTheDocument();
  });

  it('should render LogoIcon component', () => {
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render NavLink with correct "to"', () => {
    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
