import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import type { ReactElement } from 'react';
import { Logo } from './Logo';

const renderWithRouter = (component: ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Logo', () => {
  it('renders label', () => {
    renderWithRouter(<Logo />);
    const text = screen.getByText('Duoscript-Tandem');
    expect(text).not.toBeNull();
  });
  it('should render LogoIcon component', () => {
    const { container } = renderWithRouter(<Logo />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).not.toBeNull();
  });
  it('should render NavLink with correct "to"', () => {
    const links = screen.getAllByRole('link');
    const logoLink = links.find((link) => link.getAttribute('href') === '/');
    expect(logoLink).not.toBeUndefined();
  });
});
