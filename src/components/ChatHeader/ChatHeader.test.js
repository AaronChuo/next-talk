import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ChatHeader from '@/components/ChatHeader';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ChatHeader Component', () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = { back: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
  });

  it('renders ChatHeader correctly', () => {
    render(<ChatHeader title="Karaoke" />);

    expect(screen.getByRole('heading', { level: 1, name: 'Karaoke' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '⬅ Back' })).toBeInTheDocument();
  });

  it('calls router.back() when back button clicked', async () => {
    render(<ChatHeader title="Mur mur" />);

    const backButton = screen.getByRole('button', { name: '⬅ Back' });
    await userEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
