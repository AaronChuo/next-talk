import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '@/components/ThemeToggle';

describe('ThemeToggle component', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => null);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.documentElement.classList.remove('dark');
  });

  it('renders the button with initial theme', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveTextContent('🌙 Dark Mode');
  });

  it('toggles theme when button clicked', async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Click to switch to light mode
    await userEvent.click(button);
    expect(button).toHaveTextContent('☀️ Light Mode');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();

    // Click again to switch back to dark mode
    await userEvent.click(button);
    expect(button).toHaveTextContent('🌙 Dark Mode');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
  });

  it('loads theme from localStorage', () => {
    Storage.prototype.getItem = jest.fn((key) => (
      key === 'theme' ? 'light' : null
    ));

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('☀️ Light Mode');
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });
});
