import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageReactions from '@/components/MessageReactions';
import { updateReactions } from '@/lib/useChatApi';

jest.mock('@/lib/useChatApi', () => ({
  useMessages: jest.fn(() => ({ mutate: jest.fn() })),
  updateReactions: jest.fn(),
}));

describe('MessageReactions Component', () => {
  it('renders reactions correctly', () => {
    const mockMessage = {
      id: 1,
      conversationId: 3,
      reactions: { like: 2, love: 3, laugh: 1 },
    };
    render(<MessageReactions message={mockMessage} isHover={false} />);

    const [likeButton, loveButton, laughButton] = screen.getAllByRole('button');
    expect(likeButton).toBeInTheDocument();
    expect(loveButton).toBeInTheDocument();
    expect(laughButton).toBeInTheDocument();
  });

  it('renders reactions when hovered even if count is 0', () => {
    const mockMessage = {
      id: 1,
      conversationId: 3,
      reactions: { like: 3, love: 0, laugh: 0 },
    };
    render(<MessageReactions message={mockMessage} isHover={true} />);

    const [likeButton, loveButton, laughButton] = screen.getAllByRole('button');
    expect(likeButton).toBeInTheDocument();
    expect(loveButton).toHaveClass('opacity-80');
    expect(laughButton).toBeInTheDocument('opacity-80');
  });

  it('calls updateReactions when reaction clicked', async () => {
    const mockMessage = {
      id: 1,
      conversationId: 3,
      reactions: { like: 0, love: 1, laugh: 0 },
    };
    render(<MessageReactions message={mockMessage} isHover={true} />);

    const likeButton = screen.getByRole('button', { name: '👍 0' });
    await userEvent.click(likeButton);

    expect(updateReactions).toHaveBeenCalledWith(
      mockMessage.id,
      { reaction: 'like' },
      expect.any(Function),
    );
  });

  it('hides reactions when not hovered and count is 0', () => {
    const mockMessage = {
      id: 1,
      conversationId: 3,
      reactions: { like: 0, love: 1, laugh: 0 },
    };
    render(<MessageReactions message={mockMessage} isHover={false} />);

    const [likeButton, loveButton, laughButton] = screen.getAllByRole('button');
    expect(likeButton).toHaveClass('opacity-0');
    expect(loveButton).toBeInTheDocument();
    expect(laughButton).toHaveClass('opacity-0');
  });
});
